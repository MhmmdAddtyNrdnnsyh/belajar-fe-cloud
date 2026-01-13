import { nullable, z } from "zod";

export const studentValidator = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Nama wajib disii")
    .min(8, "Nama minimal 8 karakter")
    .max(30, "Nama minimal 30 karakter"),
  email: z
    .string()
    .nonempty("Email wajib diiis")
    .email("Format email tidak valid"),
  nis: z
    .string()
    .trim()
    .regex(/^\d+$/, "Hanya diperbolehkan mengisi angka")
    .nonempty("NIS wajib diisi")
    .length(5, "NIS hanya menerima 5 angka"),
  nisn: z
    .string()
    .trim()
    .regex(/^\d+$/, "Hanya diperbolehkan mengisi angka")
    .nonempty("NISN wajib diisi")
    .length(10, "NISN hanya menerima 10 angka"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, "Hanya diperbolehkan mengisi angka")
    .nonempty("Nomor Telepon wajib diisi")
    .length(13, "Nomor telepon hanya menerima 13 angka"),
  foto: z
    .instanceof(File, { message: "Foto wajib di unggah" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Foto maksimal 5MB",
    })
    .refine((file) => !file.type.startsWith("image/*"), {
      message: "File harus bertipe image",
    })
    .nullable(),
});
