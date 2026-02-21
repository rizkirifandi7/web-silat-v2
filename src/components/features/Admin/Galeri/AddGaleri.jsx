"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, ImagePlus, Loader2, UploadCloud } from "lucide-react";
import { useState, useRef } from "react";

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
import { createGallery } from "@/lib/api/gallery";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  description: z.string().optional(),
  category: z.enum(["event", "training", "competition", "ceremony", "other"], {
    required_error: "Kategori harus dipilih",
  }),
  photo: z.any().optional(),
});

// Konstanta kelas untuk input agar konsisten
const inputStyles =
  "bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 transition-all rounded-lg shadow-sm";

export function AddGaleri() {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null); // State untuk pratinjau gambar
  const fileInputRef = useRef(null); // Ref untuk memicu input file

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "other",
      photo: null,
    },
  });

  const createMutation = useMutation({
    mutationFn: createGallery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
      toast.success("Foto berhasil ditambahkan");
      closeDialog();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan foto");
    },
  });

  const onSubmit = (values) => {
    if (!values.photo?.[0]) {
      form.setError("photo", { message: "Foto wajib diunggah" });
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append("category", values.category);
    formData.append("photo", values.photo[0]);

    createMutation.mutate(formData);
  };

  const isLoading = createMutation.isPending;

  // Fungsi untuk membersihkan state ketika dialog ditutup
  const closeDialog = () => {
    setOpen(false);
    setTimeout(() => {
      form.reset();
      setPreviewUrl(null);
    }, 300); // Menunggu animasi dialog selesai
  };

  // Handler untuk pratinjau gambar saat file dipilih
  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(e.target.files);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => (!isOpen ? closeDialog() : setOpen(true))}
    >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 text-sm font-medium h-10 bg-neutral-900 text-white rounded-lg transition-all hover:bg-neutral-800 shadow-sm">
          <Plus size={18} /> Tambah Galeri
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white border-neutral-200 shadow-xl rounded-2xl p-0 flex flex-col gap-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg ring-1 ring-neutral-200 shadow-sm">
              <ImagePlus className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-neutral-900">
                Unggah Foto Baru
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 mt-0.5">
                Tambahkan momen terbaru ke dalam galeri.
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
              {/* FILE UPLOAD AREA */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${
                          form.formState.errors.photo
                            ? "border-red-400 bg-red-50"
                            : "border-neutral-300 bg-neutral-50 hover:bg-neutral-100"
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={(e) => handleFileChange(e, field)}
                        />

                        {previewUrl ? (
                          <div className="relative w-full h-full group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-white text-sm font-medium">
                                Ganti Foto
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-neutral-500 space-y-2">
                            <div className="p-3 bg-white rounded-full shadow-sm ring-1 ring-neutral-200">
                              <UploadCloud className="w-6 h-6 text-neutral-400" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium text-neutral-700">
                                Klik untuk mengunggah
                              </p>
                              <p className="text-xs mt-1">
                                PNG, JPG, atau JPEG (Maks. 5MB)
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs text-center" />
                  </FormItem>
                )}
              />

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
                        placeholder="e.g. Latihan Gabungan 2026"
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
              <Button
                type="button"
                variant="outline"
                onClick={closeDialog}
                disabled={isLoading}
                className="bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg transition-colors"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg shadow-sm font-medium px-6 transition-colors min-w-[120px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  "Unggah Foto"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
