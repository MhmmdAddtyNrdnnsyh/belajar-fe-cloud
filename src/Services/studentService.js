import { api } from "@/lib/axios";

export const studentService = {
  getAll: async () => {
    const { data } = await api.get("/api/students");
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/api/students/${id}`);
    return data;
  },

  create: async (values) => {
    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("email", values.email);
    fd.append("nis", values.nis);
    fd.append("nisn", values.nisn);
    fd.append("phoneNumber", values.phoneNumber);

    if (values.foto instanceof File) {
      fd.append("foto", values.foto);
    }

    const { data } = await api.post("/api/students", fd);
    return data;
  },

  update: async (id, values) => {
    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("email", values.email);
    fd.append("nis", values.nis);
    fd.append("nisn", values.nisn);
    fd.append("phoneNumber", values.phoneNumber);

    if (values.foto instanceof File) {
      fd.append("foto", values.foto);
    }

    const { data } = await api.patch(`/api/students/${id}`, fd);
    return data;
  },

  remove: async (id) => {
    await api.delete(`/api/students/${id}`);
    return { message: "Sukses menghapus data siswa" };
  },
};
