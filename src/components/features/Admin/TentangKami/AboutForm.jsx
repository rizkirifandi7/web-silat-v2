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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Save, Loader2, UploadCloud, Plus, Trash2 } from "lucide-react";

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

  // Fetch existing data
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

  // Reset form when data is loaded
  useEffect(() => {
    if (aboutData?.data?.data) {
      const { sejarah, visi, misi, filosofiLogo } = aboutData.data.data;

      // Handle misi array from backend or empty string fallback
      let missionArray = [{ value: "" }];
      let rawMisi = misi;

      // Handle stringified JSON if it arrives that way
      if (typeof rawMisi === "string" && rawMisi.startsWith("[")) {
        try {
          rawMisi = JSON.parse(rawMisi);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }

      if (Array.isArray(rawMisi)) {
        missionArray = rawMisi.map((m) =>
          typeof m === "string" ? { value: m } : m,
        );
      } else if (typeof rawMisi === "string" && rawMisi) {
        missionArray = [{ value: rawMisi }];
      }

      // Handle filosofi array
      let philosophyArray = [{ value: "" }];
      let rawFilosofi = filosofiLogo;

      if (typeof rawFilosofi === "string" && rawFilosofi.startsWith("[")) {
        try {
          rawFilosofi = JSON.parse(rawFilosofi);
        } catch (e) {
          // Keep as string
        }
      }

      if (Array.isArray(rawFilosofi)) {
        philosophyArray = rawFilosofi.map((p) =>
          typeof p === "string" ? { value: p } : p,
        );
      } else if (typeof rawFilosofi === "string" && rawFilosofi) {
        philosophyArray = [{ value: rawFilosofi }];
      }

      form.reset({
        sejarah: sejarah || "",
        visi: visi || "",
        misi: missionArray,
        filosofiLogo: philosophyArray,
      });
    }
  }, [aboutData, form]);

  const existingLogoUrl = aboutData?.data?.data?.logoUrl
    ? aboutData.data.data.logoUrl.startsWith("http")
      ? aboutData.data.data.logoUrl
      : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/${aboutData.data.data.logoUrl}`
    : null;

  const currentLogo = logoPreview || existingLogoUrl;
  const logoRef = form.register("logo");

  const updateMutation = useMutation({
    mutationFn: updateAboutInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      toast.success("Berhasil memperbarui informasi", {
        description: "Data tentang kami telah berhasil disimpan.",
      });
      setLogoPreview(null);
    },
    onError: (error) => {
      toast.error("Gagal memperbarui informasi", {
        description:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan data.",
      });
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("sejarah", values.sejarah || "");
    formData.append("visi", values.visi || "");

    // Extract strings from objects and stringify for backend
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
    const file = e.target.files[0];
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
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start border rounded-xl p-4">
            {/* Left Column: Identity Card */}
            <Card className="border shadow-sm bg-card overflow-hidden h-full gap-0">
              <CardHeader className="bg-muted/10 pb-4 border-b">
                <CardTitle className="text-lg font-semibold tracking-tight">
                  Identitas Organisasi
                </CardTitle>
                <CardDescription>
                  Narasi sejarah dan arah tujuan organisasi.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="sejarah"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sejarah Singkat</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ceritakan awal mula dan perkembangan organisasi..."
                          className="h-[250px] resize-none focus-visible:ring-primary/20 overflow-y-auto"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Cerita ini akan ditampilkan pada halaman &rdquo;Tentang
                        Kami&rdquo;.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="visi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visi</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tuliskan visi jangka panjang..."
                            className="h-[120px] resize-none focus-visible:ring-primary/20 overflow-y-auto"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Misi (Poin-poin)</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendMission({ value: "" })}
                        className="h-8 px-2 text-xs"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Tambah Poin
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {missionFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start">
                          <div className="shrink-0 mt-2.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                            {index + 1}
                          </div>
                          <FormField
                            control={form.control}
                            name={`misi.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="flex-1 space-y-0">
                                <FormControl>
                                  <Input
                                    placeholder={`Poin misi ke-${index + 1}...`}
                                    className="focus-visible:ring-primary/20"
                                    {...field}
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
                              className="shrink-0 text-muted-foreground hover:text-destructive h-10 w-10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column: Branding Card */}
            <Card className="border shadow-sm bg-card overflow-hidden h-full gap-0">
              <CardHeader className="bg-muted/10 pb-4 border-b">
                <CardTitle className="text-lg font-semibold tracking-tight">
                  Branding & Filosofi
                </CardTitle>
                <CardDescription>
                  Identitas visual dan nilai-nilai simbolis.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="flex flex-col gap-6">
                  {/* Logo Section */}
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col gap-2">
                        <FormLabel>Logo</FormLabel>
                        <div
                          className="relative group w-full h-100 border-2 border-dashed rounded-xl bg-muted/20 overflow-hidden flex flex-col items-center justify-center hover:bg-muted/30 transition-all cursor-pointer"
                          onClick={() =>
                            document.getElementById("logo-upload").click()
                          }
                        >
                          {currentLogo ? (
                            <>
                              <Image
                                src={currentLogo}
                                alt="Logo Preview"
                                fill
                                className="object-contain p-4 transition-transform group-hover:scale-105"
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full">
                                  Ganti Logo
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground/60 transition-colors group-hover:text-primary/80">
                              <UploadCloud className="h-10 w-10" />
                              <span className="text-xs font-medium">
                                Upload Logo
                              </span>
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

                  {/* Filosofi Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Filosofi Logo (Poin-poin)</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendPhilosophy({ value: "" })}
                        className="h-8 px-2 text-xs"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Tambah Poin
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {philosophyFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start">
                          <div className="shrink-0 mt-2.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                            {index + 1}
                          </div>
                          <FormField
                            control={form.control}
                            name={`filosofiLogo.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="flex-1 space-y-0">
                                <FormControl>
                                  <Input
                                    placeholder={`Poin filosofi ke-${index + 1}...`}
                                    className="focus-visible:ring-primary/20"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {philosophyFields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removePhilosophy(index)}
                              className="shrink-0 text-muted-foreground hover:text-destructive h-10 w-10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="min-w-[150px] shadow-md transition-all hover:shadow-lg"
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
        </form>
      </Form>
    </div>
  );
}
