"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMaterial } from "@/lib/api/materi";
import { toast } from "sonner";

export const URUTAN_SABUK = [
  "Belum punya",           // Index 0 - Terendah (tidak bisa akses apapun)
  "LULUS Binfistal",       // Index 1
  "Sabuk Putih",           // Index 2
  "Sabuk Kuning",          // Index 3
  "Sabuk Hijau",           // Index 4
  "Sabuk Merah",           // Index 5
  "Sabuk Hitam Wiraga 1",  // Index 6
  "Sabuk Hitam Wiraga 2",  // Index 7
  "Sabuk Hitam Wiraga 3",  // Index 8 - Tertinggi
];

const formSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  description: z.string().optional(),
  type: z.enum(["video", "document", "pdf"], {
    required_error: "Tipe harus dipilih",
  }),
  category: z.enum(
    ["teknik_dasar", "jurus", "sejarah", "teori", "peraturan", "lainnya"],
    {
      required_error: "Kategori harus dipilih",
    },
  ),
  sabuk: z.enum(URUTAN_SABUK, {
    required_error: "Tingkatan sabuk harus dipilih",
  }),
  accessLevel: z.enum(["anggota_only", "admin_only"], {
    required_error: "Akses harus dipilih",
  }),
  isActive: z.boolean().default(true),
  file: z.any().optional(),
});

export function AddMateri() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "document",
      category: "lainnya",
      sabuk: URUTAN_SABUK[0],
      accessLevel: "anggota_only",
      isActive: true,
      file: null,
    },
  });

  const fileRef = form.register("file");

  const createMutation = useMutation({
    mutationFn: createMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      toast.success("Materi berhasil ditambahkan");
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan materi");
    },
  });

  const onSubmit = (values) => {
    if (!values.file?.[0]) {
      form.setError("file", { message: "File wajib diunggah" });
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append("type", values.type);
    formData.append("category", values.category);
    formData.append("sabuk", values.sabuk);
    formData.append("accessLevel", values.accessLevel);
    formData.append("isActive", values.isActive);
    formData.append("file", values.file[0]);

    createMutation.mutate(formData);
  };

  const isLoading = createMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="shadow-none">
          <Plus className="mr-2 h-4 w-4" /> Tambah Materi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Materi</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul materi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Materi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih tipe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectItem value="document">Dokumen (Umum)</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectItem value="teknik_dasar">
                          Teknik Dasar
                        </SelectItem>
                        <SelectItem value="jurus">Jurus</SelectItem>
                        <SelectItem value="sejarah">Sejarah</SelectItem>
                        <SelectItem value="teori">Teori</SelectItem>
                        <SelectItem value="peraturan">Peraturan</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sabuk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tingkatan Sabuk</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih tingkatan sabuk" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {URUTAN_SABUK.map((sabuk) => (
                          <SelectItem key={sabuk} value={sabuk}>{sabuk}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hak Akses</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih akses" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectItem value="anggota_only">
                          Hanya Anggota
                        </SelectItem>
                        <SelectItem value="admin_only">Hanya Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsi singkat materi"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Materi</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.avi,.jpg,.jpeg,.png"
                      {...fileRef}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Format yang didukung: PDF, Office, Video, Gambar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status Aktif</FormLabel>
                    <FormDescription>
                      Materi akan dapat diakses jika aktif.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
