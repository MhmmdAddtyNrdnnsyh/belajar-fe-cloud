"use client";

import FormComponent from "@/components/StudentComponent/FormComponent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCreateStudent } from "@/hooks/useCreateStudent";
import { AlertTriangleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const { createData, createDataError, createDataLoading } = useCreateStudent();
  const router = useRouter();

  const handleCreate = async (data) => {
    const onSucces = await createData(data);
    if (onSucces) {
      router.push("/");
    }
  };

  return (
    <main className="py-10 px-13">
      {createDataError && (
        <Alert>
          <AlertTriangleIcon />
          <AlertTitle>Terjadi kesalahan saat mengirim data</AlertTitle>
          <AlertDescription>{createDataError}</AlertDescription>
        </Alert>
      )}
      <header className="space-y-1.5">
        <h1 className="text-3xl text-zinc-900 font-bold">Tambah data</h1>
        <p className="text-zinc-600">
          Tambahkan data jika terdapat data yang belum ditambahkan
        </p>
      </header>
      <section>
        <FormComponent onSubmit={handleCreate} loading={createDataLoading} />
      </section>
    </main>
  );
}
