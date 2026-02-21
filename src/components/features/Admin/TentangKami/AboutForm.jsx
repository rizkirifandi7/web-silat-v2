"use client";

import { Button } from "@/components/ui/button";
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
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAboutInfo, updateAboutInfo } from "@/lib/api/about";
import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Save,
  Loader2,
  UploadCloud,
  Plus,
  Trash2,
  History,
  Target,
  Image as ImageIcon,
} from "lucide-react";

const formSchema = z.object({
  sejarah: z.string().optional(),
  visi: z.string().optional(),
  misi: z.array(z.object({ value: z.string() })).optional(),
  filosofiLogo: z.array(z.object({ value: z.string() })).optional(),
  logo: z.any().optional(),
});

// Helper style untuk input
const inputStyles =
  "bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 transition-all rounded-lg shadow-sm";

export function AboutForm() {
  const queryClient = useQueryClient();
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  // --- QUERY & MUTATION ---
  const { data: aboutData, isLoading: isFetching } = useQuery({
    queryKey: ["about"],
    queryFn: getAboutInfo,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sejarah: "",
      visi: "",
      misi: [{ value: "" }],
      filosofiLogo: [{ value: "" }],
      logo: null,
    },
  });

  const {
    fields: missionFields,
    append: appendMission,
    remove: removeMission,
  } = useFieldArray({
    control: form.control,
    name: "misi",
  });

  const {
    fields: philosophyFields,
    append: appendPhilosophy,
    remove: removePhilosophy,
  } = useFieldArray({
    control: form.control,
    name: "filosofiLogo",
  });

  // --- EFFECT: POPULATE DATA ---
  useEffect(() => {
    if (aboutData?.data) {
      const { sejarah, visi, misi, filosofiLogo } = aboutData.data;

      const parseArray = (data) => {
        let arr = [{ value: "" }];
        let raw = data;
        if (typeof raw === "string" && raw.startsWith("[")) {
          try {
            raw = JSON.parse(raw);
          } catch (e) {}
        }
        if (Array.isArray(raw)) {
          arr = raw.map((m) => (typeof m === "string" ? { value: m } : m));
        } else if (typeof raw === "string" && raw) {
          arr = [{ value: raw }];
        }
        return arr;
      };

      form.reset({
        sejarah: sejarah || "",
        visi: visi || "",
        misi: parseArray(misi),
        filosofiLogo: parseArray(filosofiLogo),
      });
    }
  }, [aboutData, form]);

  const existingLogoUrl = aboutData?.data?.logoUrl
    ? aboutData.data.logoUrl.startsWith("http")
      ? aboutData.data.logoUrl
      : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/${aboutData.data.logoUrl}`
    : null;

  const currentLogo = logoPreview || existingLogoUrl;

  const updateMutation = useMutation({
    mutationFn: updateAboutInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      toast.success("Berhasil disimpan", {
        description: "Informasi organisasi telah diperbarui.",
      });
      setLogoPreview(null);
    },
    onError: (error) => {
      toast.error("Gagal menyimpan", {
        description: error.response?.data?.message || "Terjadi kesalahan.",
      });
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("sejarah", values.sejarah || "");
    formData.append("visi", values.visi || "");

    const missionPoints =
      values.misi?.map((m) => m.value).filter((v) => v.trim() !== "") || [];
    formData.append("misi", JSON.stringify(missionPoints));

    const philosophyPoints =
      values.filosofiLogo?.map((p) => p.value).filter((v) => v.trim() !== "") ||
      [];
    formData.append("filosofiLogo", JSON.stringify(philosophyPoints));

    if (values.logo?.[0]) {
      formData.append("logo", values.logo[0]);
    }

    updateMutation.mutate(formData);
  };

  const handleLogoChange = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(e.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isLoading = updateMutation.isPending || isFetching;

  if (isFetching && !aboutData) {
    return (
      <div className="w-full py-32 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-neutral-400 animate-spin mb-4" />
        <p className="text-sm font-medium text-neutral-500">
          Memuat profil organisasi...
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pb-10">
        {/* HEADER HALAMAN */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Profil Organisasi
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Kelola sejarah, visi misi, dan identitas utama.
            </p>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg shadow-sm font-medium px-6 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Simpan Perubahan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* --- KOLOM KIRI: KONTEN TEKS (8 cols) --- */}
          <div className="lg:col-span-8 space-y-8 order-2 lg:order-1">
            {/* Kartu Sejarah */}
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg ring-1 ring-neutral-200 shadow-sm">
                  <History className="w-5 h-5 text-neutral-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
                    Sejarah Organisasi
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Perjalanan dan latar belakang pendirian.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <FormField
                  control={form.control}
                  name="sejarah"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Tuliskan sejarah lengkap di sini..."
                          className={`${inputStyles} min-h-[250px] resize-y text-sm leading-relaxed p-4`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Kartu Visi & Misi */}
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg ring-1 ring-neutral-200 shadow-sm">
                  <Target className="w-5 h-5 text-neutral-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
                    Visi & Misi
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Tujuan jangka panjang dan strategi.
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-8">
                {/* Visi */}
                <FormField
                  control={form.control}
                  name="visi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                        Visi
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Menjadi organisasi terdepan dalam..."
                          className={`${inputStyles} min-h-[100px] resize-none`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Misi Dinamis */}
                <div className="space-y-4">
                  <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold block">
                    Daftar Misi
                  </FormLabel>
                  <div className="space-y-3">
                    {missionFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="group relative flex gap-3 items-start animate-in fade-in slide-in-from-left-2 duration-300"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 text-neutral-500 text-xs font-bold shrink-0 mt-1 ring-1 ring-neutral-200">
                          {index + 1}
                        </div>
                        <FormField
                          control={form.control}
                          name={`misi.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={`Misi ke-${index + 1}...`}
                                  className={`${inputStyles} pr-10`}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                          )}
                        />
                        {/* Tombol Hapus - Muncul saat di hover (Desktop) atau selalu ada (Mobile) */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMission(index)}
                          className="absolute right-1 top-1 text-neutral-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendMission({ value: "" })}
                    className="w-full mt-2 border-dashed border-neutral-300 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Tambah Poin Misi
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* --- KOLOM KANAN: BRANDING (4 cols) --- */}
          <div className="lg:col-span-4 space-y-8 order-1 lg:order-2">
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden sticky top-6">
              <div className="p-5 border-b border-neutral-100 bg-neutral-50/50 flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4 text-neutral-600" />
                <h2 className="text-sm font-semibold tracking-tight text-neutral-900">
                  Identitas Visual
                </h2>
              </div>

              <div className="p-5 space-y-8">
                {/* Logo Upload (Square) */}
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold block mb-3">
                        Logo Organisasi
                      </FormLabel>
                      <FormControl>
                        <div
                          className={`relative group w-full aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all ${
                            currentLogo
                              ? "border-neutral-200 bg-white"
                              : "border-neutral-300 bg-neutral-50 hover:bg-neutral-100"
                          }`}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={(e) => handleLogoChange(e, field)}
                          />

                          {currentLogo ? (
                            <>
                              <Image
                                src={currentLogo}
                                alt="Logo Preview"
                                fill
                                className="object-contain p-6"
                                unoptimized={!!existingLogoUrl && !logoPreview}
                              />
                              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <UploadCloud className="w-8 h-8 text-white mb-2" />
                                <span className="text-white text-xs font-medium">
                                  Ganti Logo
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-neutral-400 p-4 text-center group-hover:text-neutral-600 transition-colors">
                              <UploadCloud className="h-8 w-8" />
                              <div className="space-y-1">
                                <p className="text-sm font-medium">
                                  Upload Logo
                                </p>
                                <p className="text-[10px] text-neutral-400">
                                  PNG transparan disarankan (1:1)
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

                {/* Filosofi Logo Dinamis */}
                <div className="space-y-4 pt-4 border-t border-neutral-100">
                  <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold block">
                    Filosofi / Arti Logo
                  </FormLabel>

                  <div className="space-y-3">
                    {philosophyFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="relative group flex items-start animate-in fade-in slide-in-from-right-2 duration-300"
                      >
                        <FormField
                          control={form.control}
                          name={`filosofiLogo.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1 w-full">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Makna warna/bentuk..."
                                  className={`${inputStyles} pr-9 text-sm`}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-[10px]" />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removePhilosophy(index)}
                          className="absolute right-1 top-1 h-8 w-8 text-neutral-400 hover:text-red-500 hover:bg-red-50 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}

                    {philosophyFields.length === 0 && (
                      <p className="text-xs text-neutral-400 italic text-center py-2">
                        Belum ada filosofi logo ditambahkan.
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendPhilosophy({ value: "" })}
                    className="w-full border-dashed border-neutral-300 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Tambah Makna
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
