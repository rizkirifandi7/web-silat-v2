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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, PencilLine, Loader2, UploadCloud } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCampaign } from "@/lib/api/donasi";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

// Helper format angka dan mata uang
const formatNumber = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("id-ID").format(value);
};

const parseCurrencyInput = (input) => {
  let clean = input.replace(/[^0-9a-zA-Z]/g, "").toLowerCase();
  let multiplier = 1;

  if (clean.endsWith("rb") || clean.endsWith("ribu")) {
    multiplier = 1000;
    clean = clean.replace(/rb|ribu/g, "");
  } else if (clean.endsWith("jt") || clean.endsWith("juta")) {
    multiplier = 1000000;
    clean = clean.replace(/jt|juta/g, "");
  } else if (clean.endsWith("m") || clean.endsWith("milyar")) {
    multiplier = 1000000000;
    clean = clean.replace(/m|milyar/g, "");
  }

  const number = parseFloat(clean);
  return isNaN(number) ? "" : number * multiplier;
};

// Skema Form
const formSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  description: z.string().optional(),
  category: z.enum(
    ["pendidikan", "kesehatan", "bencana", "infrastruktur", "umum"],
    {
      required_error: "Kategori harus dipilih",
    },
  ),
  targetAmount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Target nominal harus berupa angka lebih dari 0",
    }),
  endDate: z.date().optional(),
  isUrgent: z.boolean().default(false),
  status: z
    .enum(["draft", "active", "completed", "cancelled"])
    .default("draft"),
  image: z.any().optional(),
});

// Konstanta style input
const inputStyles =
  "bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 transition-all rounded-lg shadow-sm";

export function EditDonasi({ open, setOpen, campaign }) {
  const queryClient = useQueryClient();
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "umum",
      targetAmount: "",
      isUrgent: false,
      status: "draft",
      image: null,
    },
  });

  useEffect(() => {
    if (campaign) {
      form.reset({
        title: campaign.title,
        description: campaign.description || "",
        category: campaign.category,
        targetAmount: campaign.targetAmount?.toString() || "",
        isUrgent: campaign.isUrgent || false,
        status: campaign.status || "draft",
        endDate: campaign.endDate ? new Date(campaign.endDate) : undefined,
        image: null,
      });
      setPreviewUrl(null); // Reset preview url
    }
  }, [campaign, form]);

  const updateMutation = useMutation({
    mutationFn: (data) => updateCampaign(campaign.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("Program donasi berhasil diperbarui");
      closeDialog();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui program");
    },
  });

  const onSubmit = (values) => {
    const payload = { ...values };

    // Konversi object ke form data jika image diisi
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      if (key === "endDate" && payload[key]) {
        formData.append("endDate", payload[key].toISOString());
      } else if (
        key !== "image" &&
        payload[key] !== undefined &&
        payload[key] !== null
      ) {
        formData.append(key, payload[key]);
      }
    });

    if (values.image?.[0]) {
      formData.append("image", values.image[0]);
    }

    updateMutation.mutate(formData);
  };

  const isLoading = updateMutation.isPending;

  // Handler Dialog
  const closeDialog = () => {
    setOpen(false);
    setTimeout(() => {
      form.reset();
      setPreviewUrl(null);
    }, 300);
  };

  // Handler Preview Gambar
  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(e.target.files);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const displayImage = previewUrl || campaign?.imageUrl;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => (!isOpen ? closeDialog() : setOpen(true))}
    >
      <DialogContent className="sm:max-w-3xl bg-white border-neutral-200 shadow-xl rounded-2xl max-h-[90vh] p-0 flex flex-col gap-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg ring-1 ring-neutral-200 shadow-sm">
              <PencilLine className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-neutral-900">
                Edit Program Donasi
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 mt-0.5">
                Perbarui detail informasi galang dana ini.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <ScrollArea className="flex-1 px-6 py-6 custom-scrollbar bg-neutral-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
                {/* KOLOM KIRI */}
                <div className="space-y-6">
                  {/* UPLOAD GAMBAR BANNER */}
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold mb-2 block">
                          Banner Kampanye (Opsional)
                        </FormLabel>
                        <FormControl>
                          <div
                            className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${
                              form.formState.errors.image
                                ? "border-red-400 bg-red-50"
                                : "border-neutral-300 bg-white hover:bg-neutral-50"
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

                            {displayImage ? (
                              <div className="relative w-full h-full group bg-white">
                                <Image
                                  src={displayImage}
                                  alt="Preview Banner"
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                                  <UploadCloud className="w-6 h-6 text-white mb-2" />
                                  <p className="text-white text-sm font-medium">
                                    Ganti Banner
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center text-neutral-500 space-y-2">
                                <div className="p-2 bg-neutral-50 rounded-full shadow-sm ring-1 ring-neutral-200">
                                  <UploadCloud className="w-5 h-5 text-neutral-400" />
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-medium text-neutral-700">
                                    Unggah Banner Baru
                                  </p>
                                  <p className="text-[11px] mt-1 text-neutral-400">
                                    Rasio 16:9 direkomendasikan
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

                  {/* JUDUL PROGRAM */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                          Judul Program
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Bantuan Bencana Alam"
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
                          Deskripsi Program
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jelaskan detail dan tujuan donasi..."
                            className={`${inputStyles} resize-none`}
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* KOLOM KANAN */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* KATEGORI */}
                    <FormField
                      control={form.control}
                      name="category"
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
                              <SelectItem value="umum">Umum</SelectItem>
                              <SelectItem value="pendidikan">
                                Pendidikan
                              </SelectItem>
                              <SelectItem value="kesehatan">
                                Kesehatan
                              </SelectItem>
                              <SelectItem value="bencana">
                                Bencana Alam
                              </SelectItem>
                              <SelectItem value="infrastruktur">
                                Infrastruktur
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* TARGET DONASI */}
                    <FormField
                      control={form.control}
                      name="targetAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Target (Rp)
                          </FormLabel>
                          <FormControl>
                            <div className="relative flex items-center">
                              <span className="absolute left-3 text-neutral-500 font-medium text-sm">
                                Rp
                              </span>
                              <Input
                                placeholder="0"
                                className={`${inputStyles} pl-10 font-medium`}
                                {...field}
                                value={formatNumber(field.value)}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const rawValue =
                                    parseCurrencyInput(inputValue);
                                  field.onChange(rawValue.toString());
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* BATAS WAKTU */}
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold mb-1">
                            Batas Waktu (Opsional)
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    inputStyles,
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-neutral-400",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pilih batas akhir</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0 bg-white border-neutral-200 rounded-xl shadow-md"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* STATUS PROGRAM */}
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Status Program
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className={inputStyles}>
                                <SelectValue placeholder="Pilih status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-neutral-200 text-neutral-900 rounded-xl shadow-md">
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="active">Aktif</SelectItem>
                              <SelectItem value="completed">Selesai</SelectItem>
                              <SelectItem value="cancelled">
                                Dibatalkan
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* SWITCH MENDESAK */}
                  <FormField
                    control={form.control}
                    name="isUrgent"
                    render={({ field }) => (
                      <FormItem
                        className={`flex flex-row items-center justify-between rounded-xl border p-4 shadow-sm transition-colors ${
                          field.value
                            ? "border-red-200 bg-red-50/50"
                            : "border-neutral-200 bg-white"
                        }`}
                      >
                        <div className="space-y-1">
                          <FormLabel
                            className={`text-sm font-bold cursor-pointer ${field.value ? "text-red-600" : "text-neutral-900"}`}
                          >
                            Desak / Urgent
                          </FormLabel>
                          <p
                            className={`text-xs ${field.value ? "text-red-500" : "text-neutral-500"}`}
                          >
                            Tandai program ini sebagai prioritas tinggi.
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-red-600"
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
