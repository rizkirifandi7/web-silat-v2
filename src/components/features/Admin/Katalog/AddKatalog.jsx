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
import { Plus, PackagePlus, Loader2, UploadCloud } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/lib/api/katalog";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  nama: z.string().min(1, "Nama produk harus diisi"),
  kategori: z.string().min(1, "Kategori harus dipilih"),
  harga: z.string().min(1, "Harga harus diisi"),
  deskripsi: z.string().optional(),
  isNew: z.boolean().default(false),
  image: z.any().optional(),
});

// Konstanta gaya input
const inputStyles =
  "bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 transition-all rounded-lg shadow-sm";

export function AddKatalog() {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null); // Pratinjau gambar
  const fileInputRef = useRef(null);

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      kategori: "",
      harga: "",
      deskripsi: "",
      isNew: false,
      image: null,
    },
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produk berhasil ditambahkan");
      closeDialog();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan produk");
    },
  });

  const onSubmit = (values) => {
    if (!values.image?.[0]) {
      form.setError("image", { message: "Gambar produk wajib diunggah" });
      return;
    }

    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("kategori", values.kategori);
    formData.append("harga", values.harga);
    formData.append("deskripsi", values.deskripsi || "");
    formData.append("isNew", values.isNew);
    formData.append("image", values.image[0]);

    createMutation.mutate(formData);
  };

  const isLoading = createMutation.isPending;

  // Handler untuk membersihkan state
  const closeDialog = () => {
    setOpen(false);
    setTimeout(() => {
      form.reset();
      setPreviewUrl(null);
    }, 300);
  };

  // Handler untuk pratinjau gambar
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
          <Plus size={18} /> Tambah Produk
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl bg-white border-neutral-200 shadow-xl rounded-2xl max-h-[90vh] p-0 flex flex-col gap-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg ring-1 ring-neutral-200 shadow-sm">
              <PackagePlus className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-neutral-900">
                Tambah Produk Katalog
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 mt-0.5">
                Masukkan detail produk baru ke dalam katalog.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <ScrollArea className="flex-1 px-6 py-6 custom-scrollbar">
              <div className="space-y-6 pb-2">
                {/* UPLOAD GAMBAR */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div
                          className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${
                            form.formState.errors.image
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
                                className="w-full h-full object-contain p-2"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                <p className="text-white text-sm font-medium">
                                  Ganti Foto Produk
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
                                  Pilih gambar produk
                                </p>
                                <p className="text-xs mt-1">
                                  Disarankan format kotak (1:1), PNG/JPG
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

                {/* NAMA PRODUK */}
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                        Nama Produk
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Kaos Latihan Premium"
                          {...field}
                          className={inputStyles}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {/* KATEGORI & HARGA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="kategori"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                          Kategori
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className={inputStyles}>
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-neutral-200 text-neutral-900 rounded-xl shadow-md">
                            <SelectItem value="Seragam">Seragam</SelectItem>
                            <SelectItem value="Kaos">Kaos</SelectItem>
                            <SelectItem value="Jaket">Jaket</SelectItem>
                            <SelectItem value="Aksesoris">Aksesoris</SelectItem>
                            <SelectItem value="Perlengkapan">
                              Perlengkapan
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="harga"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                          Harga (Rp)
                        </FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <span className="absolute left-3 text-neutral-500 font-medium text-sm">
                              Rp
                            </span>
                            <Input
                              type="number"
                              placeholder="150000"
                              {...field}
                              className={`${inputStyles} pl-10`}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* DESKRIPSI */}
                <FormField
                  control={form.control}
                  name="deskripsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                        Deskripsi Singkat
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Jelaskan detail produk ini..."
                          className={`${inputStyles} resize-none`}
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {/* SWITCH LABEL BARU */}
                <FormField
                  control={form.control}
                  name="isNew"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 shadow-sm">
                      <div className="space-y-1">
                        <FormLabel className="text-sm font-semibold text-neutral-900 cursor-pointer">
                          Tandai sebagai Produk Baru
                        </FormLabel>
                        <p className="text-xs text-neutral-500">
                          Produk akan mendapatkan label &quot;Baru&quot; pada katalog.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-neutral-900"
                        />
                      </FormControl>
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
                  "Simpan Produk"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
