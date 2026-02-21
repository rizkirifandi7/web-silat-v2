"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/lib/api/users";
import { toast } from "sonner";
import { useState } from "react";

import { Loader2, Plus, UserPlus, Shield, User, Medal } from "lucide-react";

export const URUTAN_SABUK = [
  "Belum punya",
  "LULUS Binfistal",
  "Sabuk Hitam Wiraga 1",
  "Sabuk Hitam Wiraga 2",
  "Sabuk Hitam Wiraga 3",
  "Sabuk Putih",
  "Sabuk Kuning",
  "Sabuk Hijau",
  "Sabuk Merah",
];

const formSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  email: z.string().optional(),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum(["admin", "user", "anggota"], {
    required_error: "Role wajib dipilih",
  }),
  tempat_lahir: z.string().optional(),
  tanggal_lahir: z.string().optional(),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"]).optional(),
  tingkatan_sabuk: z.enum(URUTAN_SABUK).optional(),
  no_hp: z.string().optional(),
  alamat: z.string().optional(),
  status_aktif: z.boolean().default(true),
  tanggal_bergabung: z.string().optional(),
  status_perguruan: z.string().optional(),
});

// Wrapper Section untuk struktur form yang rapi (Light Mode)
const FormSection = ({ icon: Icon, title, children }) => (
  <div className="flex flex-col gap-4 p-1">
    <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
      <div className="p-1.5 bg-neutral-50 rounded-md ring-1 ring-neutral-200">
        <Icon className="w-4 h-4 text-neutral-600" />
      </div>
      <h3 className="text-sm font-semibold text-neutral-900 tracking-wide">
        {title}
      </h3>
    </div>
    <div className="space-y-5">{children}</div>
  </div>
);

// Konstanta kelas untuk input agar konsisten (Light Mode)
const inputStyles =
  "bg-white text-neutral-900 placeholder:text-neutral-400 transition-all w-full";

export function AddUser() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      email: "",
      password: "",
      role: "anggota",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "Laki-laki",
      tingkatan_sabuk: URUTAN_SABUK[0],
      no_hp: "",
      alamat: "",
      status_aktif: true,
      tanggal_bergabung: "",
      status_perguruan: "",
    },
  });

  // Pantau perubahan role untuk menyembunyikan/menampilkan form anggota
  const selectedRole = useWatch({ control: form.control, name: "role" });
  const isAnggota = selectedRole === "anggota";

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Berhasil menambahkan user", {
        description: "User baru telah berhasil dibuat.",
      });
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error("Gagal menambahkan user", {
        description: error.response?.data?.message || "Terjadi kesalahan.",
      });
    },
  });

  const onSubmit = (values) => {
    const userPayload = {
      nama: values.nama,
      email: values.email,
      password: values.password,
      role: values.role,
      no_hp: values.no_hp || null,
      alamat: values.alamat || null,
    };

    if (values.role === "anggota") {
      const anggotaPayload = {
        tempat_lahir: values.tempat_lahir,
        tanggal_lahir: values.tanggal_lahir,
        jenis_kelamin: values.jenis_kelamin,
        tingkatan_sabuk: values.tingkatan_sabuk,
        status_aktif: values.status_aktif,
        tanggal_bergabung: values.tanggal_bergabung,
        status_perguruan: values.status_perguruan,
      };
      mutation.mutate({ user: userPayload, anggota: anggotaPayload });
    } else {
      mutation.mutate(userPayload);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 text-sm font-medium h-10 bg-neutral-900 text-white rounded-lg transition-all hover:bg-neutral-800 shadow-sm">
          <Plus size={18} />
          Tambah User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-white border-neutral-200 shadow-xl rounded-2xl max-h-[90vh] p-0 flex flex-col gap-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 border-b border-neutral-100 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-50 rounded-lg ring-1 ring-neutral-200">
              <UserPlus className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold tracking-tight text-neutral-900">
                Tambah User Baru
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 mt-1">
                Isi formulir berikut untuk mendaftarkan pengguna baru ke sistem.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <ScrollArea className="flex-1 bg-neutral-50/50 px-6 py-6 custom-scrollbar overflow-y-auto">
              <div className="space-y-10 pb-6">
                {/* ACCOUNT INFORMATION */}
                <FormSection icon={Shield} title="Informasi Akun">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nama"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Email (Opsional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="budi@example.com"
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Minimal 6 karakter"
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
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Peran (Role)
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className={inputStyles}>
                                <SelectValue placeholder="Pilih Role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-neutral-200 text-neutral-900 rounded-xl shadow-md">
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="anggota">Anggota</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="no_hp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            No HP (Opsional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="08..."
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
                      name="alamat"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                            Alamat (Opsional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Alamat lengkap..."
                              rows={2}
                              {...field}
                              className={`${inputStyles} resize-none`}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormSection>

                {/* ANGGOTA INFORMATION - Hanya muncul jika Role = Anggota */}
                {isAnggota && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-10">
                    <FormSection icon={User} title="Data Pribadi Anggota">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="tempat_lahir"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                                Tempat Lahir
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Bandung"
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
                          name="tanggal_lahir"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                                Tanggal Lahir
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  className={`${inputStyles} cursor-pointer`}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="jenis_kelamin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                                Jenis Kelamin
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className={inputStyles}>
                                    <SelectValue placeholder="Pilih" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white border-neutral-200 text-neutral-900 rounded-xl shadow-md">
                                  <SelectItem value="Laki-laki">
                                    Laki-laki
                                  </SelectItem>
                                  <SelectItem value="Perempuan">
                                    Perempuan
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </FormSection>

                    <FormSection icon={Medal} title="Profil Perguruan">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="tingkatan_sabuk"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                                Tingkatan Sabuk
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className={inputStyles}>
                                    <SelectValue placeholder="Pilih Sabuk" />
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
                          name="tanggal_bergabung"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                                Tgl Bergabung (Opsional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  className={`${inputStyles} cursor-pointer`}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="status_perguruan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-neutral-600 text-xs uppercase tracking-wider font-semibold">
                                Status Perguruan (Opsional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Aktif Latihan"
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
                          name="status_aktif"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2 flex flex-row items-center gap-3 space-y-0 rounded-xl border border-neutral-200 bg-white p-4 mt-2 shadow-sm">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="border-neutral-300 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="cursor-pointer text-sm font-semibold text-neutral-900">
                                  Status Anggota Aktif
                                </FormLabel>
                                <p className="text-xs text-neutral-500">
                                  Tandai jika anggota ini masih aktif dalam
                                  kegiatan.
                                </p>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </FormSection>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* FOOTER */}
            <div className="p-5 border-t border-neutral-100 bg-white flex justify-end gap-3 mt-auto shrink-0">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg transition-colors"
                >
                  Batal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg shadow-sm font-medium px-6 transition-colors min-w-[120px]"
              >
                {mutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  "Simpan User"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
