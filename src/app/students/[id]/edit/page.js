"use client";

import FormComponent from "@/components/StudentComponent/FormComponent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { useFetchStudent } from "@/hooks/useFetchStudent";
import { useUpdateStudent } from "@/hooks/useUpdateStudent";
import { AlertTriangleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { fetchStudent, fetchStudentError, fetchStudentLoading, student } =
    useFetchStudent();
  const { updateData, updateDataError, updateDataLoading } = useUpdateStudent();

  useEffect(() => {
    if (!id) return;
    fetchStudent(id);
  }, [id, fetchStudent]);

  const handleUpdate = async (values) => {
    const success = await updateData(id, values);

    if (success) {
      router.push("/");
    }
  };

  return (
    <main className="py-10 px-13 space-y-7">
      {fetchStudentError && (
        <Alert>
          <AlertTriangleIcon />
          <AlertTitle>Terjadi kesalahan saat mengambil data</AlertTitle>
          <AlertDescription>{fetchStudentError}</AlertDescription>
        </Alert>
      )}
      {updateDataError && (
        <Alert>
          <AlertTriangleIcon />
          <AlertTitle>Terjadi kesalahan saat memperbarui data</AlertTitle>
          <AlertDescription>{updateDataError}</AlertDescription>
        </Alert>
      )}
      <header className="space-y-1.5">
        <h1 className="text-3xl text-zinc-900 font-bold">Edit data</h1>
        <p className="text-zinc-600">
          Edit data jika terdapat kesalahan pada data atau permbaruan pada data
        </p>
      </header>
      <section>
        {fetchStudentLoading && (
          <div className="flex justify-center items-center gap-2.5">
            <Spinner />
            <span>Memuat data</span>
          </div>
        )}
        <FormComponent
          onSubmit={handleUpdate}
          defaultValues={student}
          loading={updateDataLoading}
        />
      </section>
    </main>
  );
}
