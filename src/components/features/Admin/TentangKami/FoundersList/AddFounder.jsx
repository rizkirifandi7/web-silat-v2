"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, UploadCloud, X } from "lucide-react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFounder } from "@/lib/api/about";
import { toast } from "sonner";
import Image from "next/image";

const formSchema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  title: z.string().min(1, "Jabatan harus diisi"),
  description: z.string().optional(),
  order: z.coerce.number().optional(),
  photo: z.any().optional(),
});

export function AddFounder() {
  const [open, setOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      title: "",
      description: "",
      order: 0,
      photo: null,
    },
  });

  const photoRef = form.register("photo");

  const createMutation = useMutation({
    mutationFn: createFounder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["founders"] });
      toast.success("Pendiri berhasil ditambahkan");
      setOpen(false);
      form.reset();
      setPhotoPreview(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan pendiri");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append("order", values.order || 0);

    if (values.photo?.[0]) {
      formData.append("photo", values.photo[0]);
    }

    createMutation.mutate(formData);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = () => {
    setPhotoPreview(null);
    form.setValue("photo", null);
    // Reset file input if possible or just rely on form state
    const fileInput = document.getElementById("photo-upload-add");
    if (fileInput) fileInput.value = "";
  };

  const isLoading = createMutation.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
          form.reset();
          setPhotoPreview(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="shadow-none">
          <Plus className="mr-2 h-4 w-4" /> Tambah Pendiri
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Pendiri Baru</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto Profil</FormLabel>
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24 border-2 border-dashed rounded-full overflow-hidden flex items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors">
                        {photoPreview ? (
                          <Image
                            src={photoPreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <UploadCloud className="h-8 w-8 text-muted-foreground/50" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="photo-upload-add"
                              {...photoRef}
                              onChange={(e) => {
                                handlePhotoChange(e);
                                field.onChange(e.target.files);
                              }}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              document
                                .getElementById("photo-upload-add")
                                .click()
                            }
                          >
                            Pilih Foto
                          </Button>
                          {photoPreview && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={clearPhoto}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Format: JPG, PNG, WEBP. Maks 2MB.
                        </p>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama pendiri" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jabatan</FormLabel>
                      <FormControl>
                        <Input placeholder="Misal: Ketua Umum" {...field} />
                      </FormControl>
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
                    <FormLabel>Deskripsi Singkat</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Deskripsi singkat mengenai pendiri..."
                        className="resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urutan Tampil</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="w-1/3"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
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
