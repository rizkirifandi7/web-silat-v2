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
  FormDescription,
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
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { updateUser } from "@/lib/api/users";
import { getUserById } from "@/lib/api/users";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Loader2, Pencil, Shield, User, Medal } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

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

// Skema disamakan persis dengan AddUser
const formSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  email: z.string().optional(),
  password: z.string().optional(),
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

// Konstanta kelas untuk input konsisten
const inputStyles =
  "bg-white w-full text-neutral-900 placeholder:text-neutral-400  transition-all ";

export function EditUser({ user }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const userId = user?.id;
  const { data: userDetail, isLoading } = useQuery({
    queryKey: ["user-detail-edit", userId],
    queryFn: () => getUserById(userId).then((res) => res.data),
    enabled: open && !!userId,
  });

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

  // Pantau role untuk UI kondisional
  const selectedRole = useWatch({ control: form.control, name: "role" });
  const isAnggota = selectedRole === "anggota";

  useEffect(() => {
    if (userDetail) {
      form.reset({
        nama: userDetail.nama || "",
        email: userDetail.email || "",
        password: "", // Dikosongkan agar tidak terkirim jika tidak diubah
        role: userDetail.role || "anggota",
        tempat_lahir:
          userDetail.tempat_lahir ||
          userDetail?.anggotaSilat?.tempat_lahir ||
          "",
        tanggal_lahir:
          userDetail.tanggal_lahir ||
          userDetail?.anggotaSilat?.tanggal_lahir ||
          "",
        jenis_kelamin:
          userDetail.jenis_kelamin ||
          userDetail?.anggotaSilat?.jenis_kelamin ||
          "Laki-laki",
        tingkatan_sabuk:
          userDetail.sabuk ||
          userDetail?.anggotaSilat?.tingkatan_sabuk ||
          URUTAN_SABUK[0],
        no_hp: userDetail.no_hp || "",
        alamat: userDetail.alamat || "",
        status_aktif:
          userDetail?.anggotaSilat?.status_aktif !== undefined
            ? userDetail.anggotaSilat.status_aktif
            : true,
        tanggal_bergabung: userDetail?.anggotaSilat?.tanggal_bergabung || "",
        status_perguruan: userDetail?.anggotaSilat?.status_perguruan || "",
      });
    }
  }, [userDetail, form]);

  const mutation = useMutation({
    mutationFn: (values) => {
      const userPayload = {
        nama: values.nama,
        email: values.email,
        role: values.role,
        no_hp: values.no_hp || null,
        alamat: values.alamat || null,
      };

      // Kirim password hanya jika diisi
      if (values.password) {
        userPayload.password = values.password;
      }

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
        return updateUser(userId, {
          user: userPayload,
          anggota: anggotaPayload,
        });
      } else {
        return updateUser(userId, userPayload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Berhasil memperbarui user", {
        description: "Data user telah berhasil diperbarui.",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Gagal memperbarui user", {
        description: error.response?.data?.message || "Terjadi kesalahan.",
      });
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-white border-neutral-200 shadow-xl rounded-2xl max-h-[90vh] p-0 flex flex-col gap-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-neutral-100 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-50 rounded-lg ring-1 ring-neutral-200">
              <Pencil className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold tracking-tight text-neutral-900">
                Edit Data User
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500 mt-1">
                Perbarui informasi pengguna di bawah ini.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 bg-neutral-50/50">
            <Spinner className="h-8 w-8 text-neutral-400 mb-4" />
            <p className="text-sm text-neutral-500 font-medium">
              Memuat data pengguna...
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <ScrollArea className="flex-1 bg-neutral-50/50 px-6 py-6 custom-scrollbar overflow-y-auto">
                <div className="space-y-10 pb-6">
                  {/* ACCOUNT INFORMATION SECTION */}
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
                              Email
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
                              Password Baru
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="******"
                                {...field}
                                className={inputStyles}
                              />
                            </FormControl>
                            <FormDescription className="text-[10px] text-neutral-400">
                              Kosongkan jika tidak ingin mengubah sandi.
                            </FormDescription>
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
                              value={field.value}
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

                  {/* ANGGOTA INFORMATION SECTION - Render Conditionally */}
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
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className={inputStyles}>
                                      <SelectValue placeholder="Pilih Jenis Kelamin" />
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
                                  value={field.value}
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
                  className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg shadow-sm font-medium px-6 transition-colors min-w-[150px]"
                >
                  {mutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                  ) : (
                    "Simpan Perubahan"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
