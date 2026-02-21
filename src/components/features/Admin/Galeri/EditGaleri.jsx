"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGallery } from "@/lib/api/gallery";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2, PencilLine } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  description: z.string().optional(),
  category: z.enum(["event", "training", "competition", "ceremony", "other"], {
    required_error: "Kategori harus dipilih",
  }),
});

// Konstanta kelas untuk input konsisten
const inputStyles =
  "bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 transition-all rounded-lg shadow-sm";

export function EditGaleri({ open, setOpen, gallery }) {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "other",
    },
  });

  useEffect(() => {
    if (gallery) {
      form.reset({
        title: gallery.title,
        description: gallery.description || "",
        category: gallery.category,
      });
    }
  }, [gallery, form]);

  const updateMutation = useMutation({
    mutationFn: (data) => updateGallery(gallery.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
      toast.success("Foto berhasil diperbarui");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui foto");
    },
  });

  const onSubmit = (values) => {
    updateMutation.mutate(values);
  };

  const isLoading = updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white border-neutral-200 shadow-xl rounded-2xl p-0 flex flex-col gap-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg ring-1 ring-neutral-200 shadow-sm">
              <PencilLine className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-neutral-900">
                Edit Detail Galeri
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 mt-0.5">
                Perbarui informasi untuk foto ini.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <div className="p-6 space-y-5">
              {/* GAMBAR SAAT INI (PRATINJAU) */}
              {gallery?.photoUrl && (
                <div className="w-full">
                  <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold block mb-2">
                    Foto Saat Ini
                  </FormLabel>
                  <div className="relative w-full h-48 bg-neutral-100 rounded-xl overflow-hidden ring-1 ring-neutral-200">
                    <Image
                      src={gallery.photoUrl}
                      alt={gallery.title || "Current photo"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* INPUT FIELDS */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                      Judul Foto
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan judul foto"
                        {...field}
                        className={inputStyles}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                      Kategori
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={inputStyles}>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-neutral-200 text-neutral-900 rounded-xl shadow-md">
                        <SelectItem value="event">Event Khusus</SelectItem>
                        <SelectItem value="training">Latihan</SelectItem>
                        <SelectItem value="competition">Kejuaraan</SelectItem>
                        <SelectItem value="ceremony">
                          Upacara / Tradisi
                        </SelectItem>
                        <SelectItem value="other">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                      Deskripsi Singkat
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ceritakan momen ini..."
                        className={`${inputStyles} resize-none`}
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* FOOTER */}
            <div className="p-5 border-t border-neutral-100 bg-neutral-50/50 flex justify-end gap-3 mt-auto shrink-0">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
                  className="bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg transition-colors"
                >
                  Batal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg shadow-sm font-medium px-6 transition-colors min-w-[150px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  "Simpan Perubahan"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
