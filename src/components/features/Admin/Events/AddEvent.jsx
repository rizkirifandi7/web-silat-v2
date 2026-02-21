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
import { useState, useRef } from "react";

import { useForm, useWatch } from "react-hook-form";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Plus,
  CalendarPlus,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "@/lib/api/event";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

// Format helper
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

// Skema Validasi
const formSchema = z
  .object({
    title: z.string().min(1, "Judul harus diisi"),
    description: z.string().optional(),
    eventType: z.enum(["seminar", "workshop", "conference", "webinar"], {
      required_error: "Tipe event harus dipilih",
    }),
    eventDate: z.date({
      required_error: "Tanggal mulai harus diisi",
    }),
    endDate: z.date().optional(),
    location: z.string().optional(),
    capacity: z
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Kapasitas harus berupa angka",
      }),
    isFree: z.boolean().default(true),
    price: z.string().optional(),
    image: z.any().optional(),
  })
  .refine(
    (data) => {
      if (!data.isFree) {
        return !isNaN(Number(data.price)) && Number(data.price) > 0;
      }
      return true;
    },
    {
      message: "Harga harus diisi jika event berbayar",
      path: ["price"],
    },
  );

// Konstanta kelas untuk input konsisten
const inputStyles =
  "bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-900 focus-visible:border-neutral-900 transition-all rounded-lg shadow-sm";

export function AddEvent() {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      eventType: "seminar",
      capacity: "",
      location: "",
      isFree: true,
      price: "",
      image: null,
    },
  });

  const isFree = useWatch({ control: form.control, name: "isFree" });

  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event berhasil dibuat");
      closeDialog();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal membuat event");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append("eventType", values.eventType);
    formData.append("eventDate", values.eventDate.toISOString());
    formData.append("location", values.location || "");
    formData.append("capacity", values.capacity);
    formData.append("isFree", values.isFree);

    if (!values.isFree) {
      formData.append("price", values.price);
    }

    if (values.endDate) {
      formData.append("endDate", values.endDate.toISOString());
    }

    if (values.image?.[0]) {
      formData.append("image", values.image[0]);
    }

    createMutation.mutate(formData);
  };

  const isLoading = createMutation.isPending;

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

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => (!isOpen ? closeDialog() : setOpen(true))}
    >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 text-sm font-medium h-10 bg-neutral-900 text-white rounded-lg transition-all hover:bg-neutral-800 shadow-sm">
          <Plus size={18} /> Tambah Event
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl bg-white border-neutral-200 shadow-xl rounded-2xl max-h-[90vh] p-0 flex flex-col gap-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg ring-1 ring-neutral-200 shadow-sm">
              <CalendarPlus className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-neutral-900">
                Buat Event Baru
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 mt-0.5">
                Tambahkan agenda, seminar, atau kompetisi baru.
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
                          Banner Event (Opsional)
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

                            {previewUrl ? (
                              <div className="relative w-full h-full group bg-white">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={previewUrl}
                                  alt="Preview Banner"
                                  className="w-full h-full object-cover"
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
                                    Unggah Banner
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

                  {/* JUDUL EVENT */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                          Nama Event
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Kejuaraan Nasional 2026"
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
                            placeholder="Jelaskan detail event ini..."
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
                  {/* TIPE & KAPASITAS */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Tipe Event
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
                              <SelectItem value="seminar">Seminar</SelectItem>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="conference">
                                Conference
                              </SelectItem>
                              <SelectItem value="webinar">Webinar</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Kapasitas Peserta
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Contoh: 100"
                              {...field}
                              className={inputStyles}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* TANGGAL */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="eventDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold mb-1">
                            Tanggal Mulai
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
                                    <span>Pilih tanggal</span>
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
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold mb-1">
                            Tanggal Selesai (Ops)
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
                                    <span>Pilih tanggal</span>
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
                  </div>

                  {/* LOKASI */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                          Lokasi
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nama gedung/alamat (Kosongkan jika online)"
                            {...field}
                            className={inputStyles}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* SWITCH & HARGA TIKET */}
                  <div className="flex flex-col gap-4 p-4 bg-white border border-neutral-200 rounded-xl shadow-sm">
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-1">
                            <FormLabel className="text-sm font-semibold text-neutral-900 cursor-pointer">
                              Event Gratis?
                            </FormLabel>
                            <p className="text-xs text-neutral-500">
                              Matikan untuk mengatur harga tiket masuk.
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

                    {!isFree && (
                      <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                                Harga Tiket (Rp)
                              </FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <span className="absolute left-3 text-neutral-500 font-medium text-sm">
                                    Rp
                                  </span>
                                  <Input
                                    placeholder="150.000"
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
                    )}
                  </div>
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
                className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg shadow-sm font-medium px-6 transition-colors min-w-[130px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  "Buat Event"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
