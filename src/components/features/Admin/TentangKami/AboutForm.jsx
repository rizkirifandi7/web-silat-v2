"use client";

import { Button } from "@/components/ui/button";
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
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAboutInfo, updateAboutInfo } from "@/lib/api/about";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Save,
  Loader2,
  UploadCloud,
  Plus,
  Trash2,
  History,
  Target,
  Lightbulb,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  sejarah: z.string().optional(),
  visi: z.string().optional(),
  misi: z.array(z.object({ value: z.string() })).optional(),
  filosofiLogo: z.array(z.object({ value: z.string() })).optional(),
  logo: z.any().optional(),
});

export function AboutForm() {
  const queryClient = useQueryClient();
  const [logoPreview, setLogoPreview] = useState(null);

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
    if (aboutData?.data?.data) {
      const { sejarah, visi, misi, filosofiLogo } = aboutData.data.data;

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

  const existingLogoUrl = aboutData?.data?.data?.logoUrl
    ? aboutData.data.data.logoUrl.startsWith("http")
      ? aboutData.data.data.logoUrl
      : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/${
          aboutData.data.data.logoUrl
        }`
    : null;

  const currentLogo = logoPreview || existingLogoUrl;
  const logoRef = form.register("logo");

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

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isLoading = updateMutation.isPending || isFetching;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* --- KOLOM KIRI: KONTEN TEKS (8 cols) --- */}
          <div className="xl:col-span-8 space-y-8">
            {/* Kartu Sejarah */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <History className="w-5 h-5" />
                  </div>
                  <CardTitle>Sejarah Organisasi</CardTitle>
                </div>
                <CardDescription>
                  Ceritakan perjalanan, latar belakang, dan momen penting
                  pendirian organisasi.
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="p-6">
                <FormField
                  control={form.control}
                  name="sejarah"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Tuliskan sejarah lengkap di sini..."
                          className="max-h-[500px] resize-none text-base leading-relaxed border-muted-foreground/20 focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Kartu Visi & Misi */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                    <Target className="w-5 h-5" />
                  </div>
                  <CardTitle>Visi & Misi</CardTitle>
                </div>
                <CardDescription>
                  Tujuan jangka panjang dan langkah-langkah strategis
                  organisasi.
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="p-6 space-y-8">
                {/* Visi */}
                <FormField
                  control={form.control}
                  name="visi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Visi
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Contoh: Menjadi organisasi terdepan dalam..."
                          className="h-[100px] resize-none border-muted-foreground/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Misi */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-base font-semibold">
                      Misi
                    </FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => appendMission({ value: "" })}
                      className="text-primary hover:bg-primary/10 hover:text-primary h-8"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Tambah Poin
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {missionFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="group flex gap-3 items-center animate-in slide-in-from-left-2 duration-300"
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold shrink-0">
                          {index + 1}
                        </span>
                        <FormField
                          control={form.control}
                          name={`misi.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1 space-y-0">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Tulis poin misi..."
                                  className="bg-transparent border-0 border-b border-muted-foreground/20 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 shadow-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {missionFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMission(index)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* --- KOLOM KANAN: BRANDING (4 cols) --- */}
          <div className="xl:col-span-4 space-y-8">
            <Card className="border-border/60 shadow-sm sticky top-6">
              <CardHeader className="bg-muted/30">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-base">Identitas Visual</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Logo Upload */}
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo Organisasi</FormLabel>
                      <div
                        className={cn(
                          "relative group w-full aspect-square border-2 border-dashed border-muted-foreground/25 rounded-2xl bg-muted/5 overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary hover:bg-primary/5",
                          currentLogo ? "border-solid border-border" : "",
                        )}
                        onClick={() =>
                          document.getElementById("logo-upload")?.click()
                        }
                      >
                        {currentLogo ? (
                          <>
                            <div className="absolute inset-4">
                              <Image
                                src={currentLogo}
                                alt="Logo Preview"
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <UploadCloud className="w-8 h-8 text-white mb-2" />
                              <span className="text-white text-xs font-medium">
                                Ganti Gambar
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-3 text-muted-foreground p-4 text-center">
                            <div className="p-3 bg-background rounded-full shadow-sm">
                              <UploadCloud className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                Klik untuk upload
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PNG, JPG (Max 2MB)
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="logo-upload"
                          {...logoRef}
                          onChange={(e) => {
                            handleLogoChange(e);
                            field.onChange(e.target.files);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Filosofi Logo */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <FormLabel>Filosofi Logo</FormLabel>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => appendPhilosophy({ value: "" })}
                      className="h-6 w-6 rounded-full border border-dashed border-muted-foreground/50 hover:border-primary hover:text-primary"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {philosophyFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex gap-2 items-start group"
                      >
                        <FormField
                          control={form.control}
                          name={`filosofiLogo.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1 space-y-0">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Makna simbol..."
                                  className="h-9 text-sm bg-muted/30 focus:bg-background transition-colors"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removePhilosophy(index)}
                          className="h-9 w-9 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {philosophyFields.length === 0 && (
                      <p className="text-xs text-muted-foreground italic text-center py-4">
                        Belum ada filosofi ditambahkan.
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full font-semibold shadow-lg shadow-primary/20"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Perubahan
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
