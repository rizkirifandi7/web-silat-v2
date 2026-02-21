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
import { Plus, UploadCloud, UserPlus, Loader2 } from "lucide-react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFounder } from "@/lib/api/about";
import { toast } from "sonner";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  title: z.string().min(1, "Jabatan harus diisi"),
  description: z.string().optional(),
  order: z.coerce.number().optional(),
  photo: z.any().optional(),
});

// Konstanta kelas untuk input agar konsisten (Light Mode)
const inputStyles =
  "bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 transition-all rounded-lg shadow-sm";

export function AddFounder() {
  const [open, setOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
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

  const createMutation = useMutation({
    mutationFn: createFounder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["founders"] });
      toast.success("Pendiri berhasil ditambahkan");
      closeDialog();
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

  const handlePhotoChange = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(e.target.files);
      const fileUrl = URL.createObjectURL(file);
      setPhotoPreview(fileUrl);
    }
  };

  const closeDialog = () => {
    setOpen(false);
    setTimeout(() => {
      form.reset();
      setPhotoPreview(null);
    }, 300);
  };

  const isLoading = createMutation.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => (!isOpen ? closeDialog() : setOpen(true))}
    >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 text-sm font-medium h-10 bg-neutral-900 text-white rounded-lg transition-all hover:bg-neutral-800 shadow-sm">
          <Plus size={18} /> Tambah Pendiri
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl bg-white border-neutral-200 shadow-xl rounded-2xl p-0 flex flex-col gap-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg ring-1 ring-neutral-200 shadow-sm">
              <UserPlus className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-neutral-900">
                Tambah Profil Pendiri
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 mt-0.5">
                Masukkan informasi dan foto profil tokoh pendiri organisasi.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <ScrollArea className="flex-1 px-6 py-6 custom-scrollbar bg-white overflow-y-auto">
              <div className="space-y-6 pb-2">
                {/* UPLOAD FOTO PROFIL (AVATAR STYLE) */}
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-center">
                      <FormControl>
                        <div
                          className="relative w-28 h-28 border-2 border-dashed border-neutral-300 rounded-full overflow-hidden flex items-center justify-center bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer group shadow-sm ring-4 ring-white"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={(e) => handleFileChange(e, field)}
                          />

                          {photoPreview ? (
                            <>
                              <Image
                                src={photoPreview}
                                alt="Preview Profil"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                                <UploadCloud className="w-6 h-6 text-white mb-1" />
                                <span className="text-[10px] text-white font-medium">
                                  Ganti Foto
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-neutral-400 group-hover:text-neutral-600 transition-colors">
                              <UploadCloud className="h-8 w-8 mb-1" />
                              <span className="text-[10px] font-medium">
                                Unggah Foto
                              </span>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs text-center" />
                      <p className="text-xs text-neutral-500 mt-2 text-center">
                        Rekomendasi rasio 1:1 (Kotak). Maks 2MB.
                      </p>
                    </FormItem>
                  )}
                />

                {/* FORM INPUTS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                          Nama Lengkap
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Budi Santoso"
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
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                          Jabatan / Gelar
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Ketua Umum"
                            {...field}
                            className={inputStyles}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

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
                          placeholder="Tuliskan biografi singkat pendiri..."
                          className={`${inputStyles} resize-none min-h-[100px]`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                        Urutan Tampil
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          className={`${inputStyles} w-1/3`}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber || 0)
                          }
                        />
                      </FormControl>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Angka lebih kecil akan tampil lebih awal (e.g. 1 tampil
                        pertama).
                      </p>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            {/* FOOTER */}
            <div className="p-5 border-t border-neutral-100 bg-neutral-50/50 flex justify-end gap-3 shrink-0">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDialog}
                  disabled={isLoading}
                  className="bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg transition-colors"
                >
                  Batal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg shadow-sm font-medium px-6 transition-colors min-w-[130px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  "Simpan Profil"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
