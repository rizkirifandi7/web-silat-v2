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
import {
  Plus,
  Upload,
  Link,
  BookOpen,
  Loader2,
  UploadCloud,
} from "lucide-react";
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
import { URUTAN_SABUK } from "@/constant/data";
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
  fileUrl: z.string().optional(),
});

// Konstanta style input
const inputStyles =
  "bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 transition-all rounded-lg shadow-sm";

export function AddMateri() {
  const [open, setOpen] = useState(false);
  const [sourceType, setSourceType] = useState("file"); // "file" or "url"
  const [fileName, setFileName] = useState(null); // Menyimpan nama file untuk preview
  const fileInputRef = useRef(null);
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
      fileUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      toast.success("Materi berhasil ditambahkan");
      closeDialog();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan materi");
    },
  });

  const onSubmit = (values) => {
    if (sourceType === "file") {
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
    } else {
      // URL mode
      if (!values.fileUrl || values.fileUrl.trim() === "") {
        form.setError("fileUrl", { message: "URL wajib diisi" });
        return;
      }

      // Kirim sebagai JSON, bukan FormData, agar backend tidak meminta file
      const payload = {
        title: values.title,
        description: values.description || "",
        type: values.type,
        category: values.category,
        sabuk: values.sabuk,
        accessLevel: values.accessLevel,
        isActive: values.isActive,
        fileUrl: values.fileUrl.trim(),
      };

      createMutation.mutate(payload);
    }
  };

  const handleSourceTypeChange = (type) => {
    setSourceType(type);
    form.clearErrors("file");
    form.clearErrors("fileUrl");
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(e.target.files);
      setFileName(file.name);
    }
  };

  const closeDialog = () => {
    setOpen(false);
    setTimeout(() => {
      form.reset();
      setFileName(null);
      setSourceType("file");
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
          <Plus size={18} /> Tambah Materi
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl bg-white border-neutral-200 shadow-xl rounded-2xl max-h-[90vh] p-0 flex flex-col gap-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg ring-1 ring-neutral-200 shadow-sm">
              <BookOpen className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-neutral-900">
                Tambah Materi Pelajaran
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 mt-0.5">
                Unggah dokumen, video, atau tautan materi baru.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <ScrollArea className="flex-1 px-6 py-6 custom-scrollbar bg-neutral-50/50 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
                {/* KOLOM KIRI: SUMBER MATERI & DESKRIPSI */}
                <div className="space-y-6">
                  {/* SOURCE TYPE TOGGLE */}
                  <div className="space-y-3">
                    <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                      Sumber Materi
                    </FormLabel>
                    <div className="flex p-1 bg-neutral-200/50 rounded-lg">
                      <button
                        type="button"
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
                          sourceType === "file"
                            ? "bg-white text-neutral-900 shadow-sm"
                            : "text-neutral-500 hover:text-neutral-700"
                        }`}
                        onClick={() => handleSourceTypeChange("file")}
                      >
                        <Upload className="w-4 h-4" /> Upload File
                      </button>
                      <button
                        type="button"
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
                          sourceType === "url"
                            ? "bg-white text-neutral-900 shadow-sm"
                            : "text-neutral-500 hover:text-neutral-700"
                        }`}
                        onClick={() => handleSourceTypeChange("url")}
                      >
                        <Link className="w-4 h-4" /> Tautan URL
                      </button>
                    </div>
                  </div>

                  {/* FILE UPLOAD OR URL INPUT */}
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    {sourceType === "file" ? (
                      <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div
                                className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${
                                  form.formState.errors.file
                                    ? "border-red-400 bg-red-50"
                                    : "border-neutral-300 bg-white hover:bg-neutral-50"
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
                                    <div className="p-2 bg-green-50 rounded-full mb-2 ring-1 ring-green-200">
                                      <BookOpen className="w-5 h-5 text-green-600" />
                                    </div>
                                    <p className="text-sm font-semibold truncate max-w-[200px]">
                                      {fileName}
                                    </p>
                                    <p className="text-[11px] text-neutral-500 mt-1">
                                      Klik untuk mengganti file
                                    </p>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center text-neutral-500 space-y-2">
                                    <div className="p-2 bg-neutral-50 rounded-full shadow-sm ring-1 ring-neutral-200">
                                      <UploadCloud className="w-5 h-5 text-neutral-400" />
                                    </div>
                                    <div className="text-center">
                                      <p className="text-sm font-medium text-neutral-700">
                                        Pilih File Materi
                                      </p>
                                      <p className="text-[10px] mt-1 text-neutral-400">
                                        PDF, Office, Video, atau Gambar
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
                    ) : (
                      <FormField
                        control={form.control}
                        name="fileUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://youtube.com/..."
                                className={inputStyles}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs text-neutral-500">
                              Masukkan link valid ke Google Drive, YouTube, dll.
                            </FormDescription>
                            <FormMessage className="text-red-500 text-xs" />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  {/* JUDUL MATERI */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                          Judul Materi
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan judul..."
                            {...field}
                            className={inputStyles}
                          />
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
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                          Deskripsi
                        </FormLabel>
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
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Format Materi
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
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
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Kategori Topik
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
                              <SelectItem value="teknik_dasar">
                                Teknik Dasar
                              </SelectItem>
                              <SelectItem value="jurus">Jurus</SelectItem>
                              <SelectItem value="sejarah">Sejarah</SelectItem>
                              <SelectItem value="teori">Teori</SelectItem>
                              <SelectItem value="peraturan">
                                Peraturan
                              </SelectItem>
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
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Minimal Tingkat Sabuk
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
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
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Hak Akses
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className={inputStyles}>
                                <SelectValue placeholder="Pilih akses" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-neutral-200 text-neutral-900 rounded-xl shadow-md">
                              <SelectItem value="anggota_only">
                                Hanya Anggota
                              </SelectItem>
                              <SelectItem value="admin_only">
                                Hanya Admin
                              </SelectItem>
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
                            Materi yang tidak aktif akan disembunyikan dari
                            daftar pengguna.
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
                className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg shadow-sm font-medium px-6 transition-colors min-w-[140px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  "Simpan Materi"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
