/* eslint-disable react-hooks/set-state-in-effect */
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
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { URUTAN_SABUK } from "@/constant/data";
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
import { updateMaterial } from "@/lib/api/materi";
import { toast } from "sonner";
import { Loader2, PencilLine, UploadCloud, FileText, Link as LinkIcon, BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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

// Konstanta style input
const inputStyles = "bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 transition-all rounded-lg shadow-sm";

export function EditMateri({ open, setOpen, material }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null); // State preview file baru

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

  useEffect(() => {
    if (material) {
      form.reset({
        title: material.title,
        description: material.description || "",
        type: material.type || "document",
        category: material.category || "lainnya",
        sabuk: material.sabuk || URUTAN_SABUK[0],
        accessLevel: material.accessLevel || "anggota_only",
        isActive: material.isActive !== undefined ? material.isActive : true,
        file: null,
      });
      setFileName(null);
    }
  }, [material, form]);

  const updateMutation = useMutation({
    mutationFn: (formData) => updateMaterial(material.id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      toast.success("Materi berhasil diperbarui");
      closeDialog();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui materi");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append("type", values.type);
    formData.append("category", values.category);
    formData.append("sabuk", values.sabuk);
    formData.append("accessLevel", values.accessLevel);
    formData.append("isActive", values.isActive);
    if (values.file && values.file[0]) {
      formData.append("file", values.file[0]);
    }
    updateMutation.mutate(formData);
  };

  const isLoading = updateMutation.isPending;

  // Handler Dialog
  const closeDialog = () => {
    setOpen(false);
    setTimeout(() => {
      form.reset();
      setFileName(null);
    }, 300);
  };

  // Handler Preview File
  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(e.target.files);
      setFileName(file.name);
    }
  };

  // Cek apakah file saat ini adalah URL (YouTube/Drive) atau File beneran
  const isUrl = material?.fileUrl?.startsWith("http");

  return (
    <Dialog open={open} onOpenChange={(isOpen) => (!isOpen ? closeDialog() : setOpen(true))}>
      <DialogContent className="sm:max-w-3xl bg-white border-neutral-200 shadow-xl rounded-2xl max-h-[90vh] p-0 flex flex-col gap-0 overflow-hidden">
        
        {/* HEADER */}
        <DialogHeader className="p-6 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg ring-1 ring-neutral-200 shadow-sm">
              <PencilLine className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-neutral-900">
                Edit Materi
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 mt-0.5">
                Perbarui informasi atau ganti file materi ini.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 px-6 py-6 custom-scrollbar bg-neutral-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
                
                {/* KOLOM KIRI */}
                <div className="space-y-6">
                  
                  {/* UPLOAD FILE BARU (REPLACE EXISTING) */}
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Ganti File Materi (Opsional)
                          </FormLabel>
                        </div>
                        <FormControl>
                          <div 
                            className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${
                              form.formState.errors.file ? "border-red-400 bg-red-50" : "border-neutral-300 bg-white hover:bg-neutral-50"
                            }`}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.avi,.jpg,.jpeg,.png"
                              className="hidden"
                              ref={fileInputRef}
                              onChange={(e) => handleFileChange(e, field)}
                            />
                            
                            {fileName ? (
                              <div className="flex flex-col items-center justify-center text-neutral-900 text-center p-4">
                                <div className="p-2 bg-neutral-900 text-white rounded-full mb-2 shadow-sm">
                                  <UploadCloud className="w-5 h-5" />
                                </div>
                                <p className="text-sm font-semibold truncate max-w-[200px]">{fileName}</p>
                                <p className="text-[11px] text-neutral-500 mt-1">Siap diunggah menggantikan file lama</p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center text-neutral-500 space-y-2">
                                <div className="p-2 bg-neutral-50 rounded-full shadow-sm ring-1 ring-neutral-200">
                                  <UploadCloud className="w-5 h-5 text-neutral-400" />
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-medium text-neutral-700">Klik untuk memilih file baru</p>
                                  <p className="text-[10px] mt-1 text-neutral-400">Akan menimpa file materi saat ini</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs text-center" />
                      </FormItem>
                    )}
                  />

                  {/* INFO FILE LAMA / URL LAMA */}
                  {!fileName && material?.fileUrl && (
                     <div className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-xl shadow-sm">
                       <div className="p-2 bg-neutral-100 rounded-lg text-neutral-500 shrink-0">
                         {isUrl ? <LinkIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                       </div>
                       <div className="flex-1 min-w-0">
                         <p className="text-xs text-neutral-500 font-medium mb-0.5">
                           {isUrl ? "Tautan URL Saat Ini" : "File Saat Ini"}
                         </p>
                         <a 
                           href={material.fileUrl} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-sm font-semibold text-neutral-900 hover:underline truncate block"
                         >
                           {isUrl ? material.fileUrl : material.fileUrl.split("/").pop()}
                         </a>
                       </div>
                     </div>
                  )}

                  {/* JUDUL MATERI */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">Judul Materi</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan judul..." {...field} className={inputStyles} />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* DESKRIPSI */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">Deskripsi</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Penjelasan singkat materi ini..."
                            className={`${inputStyles} resize-none`}
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* KOLOM KANAN: KATEGORI & AKSES */}
                <div className="space-y-6">
                  
                  {/* TIPE & KATEGORI */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">Format Materi</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={inputStyles}>
                                <SelectValue placeholder="Pilih tipe" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-neutral-200 text-neutral-900 rounded-xl shadow-md">
                              <SelectItem value="document">Dokumen</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">Kategori Topik</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={inputStyles}>
                                <SelectValue placeholder="Pilih kategori" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-neutral-200 text-neutral-900 rounded-xl shadow-md">
                              <SelectItem value="teknik_dasar">Teknik Dasar</SelectItem>
                              <SelectItem value="jurus">Jurus</SelectItem>
                              <SelectItem value="sejarah">Sejarah</SelectItem>
                              <SelectItem value="teori">Teori</SelectItem>
                              <SelectItem value="peraturan">Peraturan</SelectItem>
                              <SelectItem value="lainnya">Lainnya</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* SABUK & HAK AKSES */}
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="sabuk"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">Minimal Tingkat Sabuk</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={inputStyles}>
                                <SelectValue placeholder="Pilih tingkatan sabuk" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-neutral-200 text-neutral-900 rounded-xl shadow-md">
                              {URUTAN_SABUK.map((sabuk) => (
                                <SelectItem key={sabuk} value={sabuk}>
                                  {sabuk}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accessLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">Hak Akses</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={inputStyles}>
                                <SelectValue placeholder="Pilih akses" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-neutral-200 text-neutral-900 rounded-xl shadow-md">
                              <SelectItem value="anggota_only">Hanya Anggota</SelectItem>
                              <SelectItem value="admin_only">Hanya Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* SWITCH STATUS AKTIF */}
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-sm mt-2">
                        <div className="space-y-1">
                          <FormLabel className="text-sm font-semibold text-neutral-900 cursor-pointer">
                            Status Materi Aktif
                          </FormLabel>
                          <p className="text-xs text-neutral-500">
                            Materi yang tidak aktif akan disembunyikan.
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-green-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                </div>
              </div>
            </ScrollArea>

            {/* FOOTER */}
            <div className="p-5 border-t border-neutral-100 bg-white flex justify-end gap-3 shrink-0">
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