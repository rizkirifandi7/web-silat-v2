"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/lib/api/users";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Loader2, Pencil } from "lucide-react";

export const URUTAN_SABUK = [
  "Belum punya",
  "LULUS Binfistal",
  "Sabuk Putih",
  "Sabuk Kuning",
  "Sabuk Hijau",
  "Sabuk Merah",
  "Sabuk Hitam Wiraga 1",
  "Sabuk Hitam Wiraga 2",
  "Sabuk Hitam Wiraga 3",
];

const formSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().optional(),
  role: z.enum(["admin", "user", "anggota"], {
    required_error: "Role wajib dipilih",
  }),
  tempat_lahir: z.string().min(2, "Tempat lahir wajib diisi"),
  tanggal_lahir: z.string().min(4, "Tanggal lahir wajib diisi"),
  jenis_kelamin: z.enum(["laki-laki", "perempuan"], {
    required_error: "Jenis kelamin wajib dipilih",
  }),
  sabuk: z.enum(URUTAN_SABUK, {
    required_error: "Tingkatan sabuk wajib dipilih",
  }),
  no_hp: z.string().optional(),
  alamat: z.string().optional(),
});

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/api/getUserById";

export function EditUser({ user }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // Ambil data user detail dari API saat dialog dibuka
  const userId = user?.id;
  const { data: userDetail, isLoading } = useQuery({
    queryKey: ["user-detail-edit", userId],
    queryFn: () => getUserById(userId).then((res) => res.data.data),
    enabled: open && !!userId,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      email: "",
      role: "anggota",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "laki-laki",
      sabuk: URUTAN_SABUK[0],
      no_hp: "",
      alamat: "",
      password: "",
    },
  });

  // Reset form values ketika userDetail sudah didapat
  useEffect(() => {
    if (userDetail) {
      form.reset({
        nama: userDetail.nama || "",
        email: userDetail.email || "",
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
          "laki-laki",
        sabuk:
          userDetail.sabuk ||
          userDetail?.anggotaSilat?.tingkatan_sabuk ||
          URUTAN_SABUK[0],
        no_hp: userDetail.no_hp || "",
        alamat: userDetail.alamat || "",
        password: "",
      });
    }
  }, [userDetail, form]);

  const mutation = useMutation({
    mutationFn: (values) => {
      // Remove empty password so it doesn't try to update it
      const userPayload = { ...values };
      if (!userPayload.password) delete userPayload.password;
      // Jika role anggota, kirim detail anggota
      if (userPayload.role === "anggota") {
        const anggotaPayload = {
          tempat_lahir: values.tempat_lahir,
          tanggal_lahir: values.tanggal_lahir,
          jenis_kelamin: values.jenis_kelamin,
          tingkatan_sabuk: values.sabuk,
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
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Ubah informasi user di sini. Kosongkan password jika tidak ingin
              menggantinya.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div className="py-6 text-center text-muted-foreground">
              Memuat data...
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Anggota" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="tempat_lahir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempat Lahir</FormLabel>
                        <FormControl>
                          <Input placeholder="Tempat lahir" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tanggal_lahir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Lahir</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="jenis_kelamin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Kelamin</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={"w-full"}>
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="laki-laki">Laki-laki</SelectItem>
                          <SelectItem value="perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sabuk"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tingkatan Sabuk</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={"w-full"}>
                            <SelectValue placeholder="Pilih Sabuk" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {URUTAN_SABUK.map((sabuk) => (
                            <SelectItem key={sabuk} value={sabuk}>
                              {sabuk}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={"w-full"}>
                            <SelectValue placeholder="Pilih Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="anggota">Anggota</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="no_hp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No HP (Opsional)</FormLabel>
                      <FormControl>
                        <Input placeholder="08..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Baru (Opsional)</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Isi hanya jika ingin mengganti password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Simpan Perubahan
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
