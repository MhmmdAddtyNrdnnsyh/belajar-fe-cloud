"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteStudent } from "@/hooks/useDelete";
import { useFetchStudent } from "@/hooks/useFetchStudent";
import { useFetchStudents } from "@/hooks/useFetchStudents";
import {
  AlertCircle,
  DatabaseIcon,
  OctagonX,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { fetchStudents, fetchStudentsError, fetchStudentsLoading, students } =
    useFetchStudents();
  const { deleteStudent, deleteStudentError, deleteStudentLoading } =
    useDeleteStudent();
  const router = useRouter()

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };
  return (
    <main className="py-10 px-13 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl text-zinc-900 font-bold">
          Daftar data siswa SMEKAR
        </h1>
        <p className="text-zinc-700">
          kumpulan data-data siswa siswi SMK Negeri 01 Dukuhturi semua jurusan
        </p>
      </header>
      <section className="space-y-5">
        <div className="flex justify-between items-center">
          <Input className={`w-75`} placeholder="cari disini" />
          <div className="flex items-center gap-2.5">
            <Button onClick={() => fetchStudents()} size="sm">
              Refresh
            </Button>
            <Button onClick={() => router.push('/students/create')} size="sm">Tambah</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>NISN</TableHead>
              <TableHead>Nomor Telepon</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchStudentsLoading && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex justify-center items-center gap-2 text-zinc-700">
                    <Spinner /> <span>Memuat data</span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!fetchStudentsLoading && fetchStudentsError && (
              <TableRow>
                <TableCell colSpan={6} className={`py-6`}>
                  <div className="flex justify-center items-center gap-2 text-red-500">
                    <OctagonX /> <span>{fetchStudentsError}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!fetchStudentsLoading &&
              !fetchStudentsError &&
              students.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className={`py-6`}>
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia>
                          <DatabaseIcon />
                        </EmptyMedia>
                        <EmptyTitle>Data belum ditambahkan!</EmptyTitle>
                        <EmptyDescription>
                          Belum ada data yang ditambahkan, mohon untuk
                          menambahkan data dengan menekan tombol tambah
                        </EmptyDescription>
                      </EmptyHeader>
                      <EmptyContent>
                        <Button>Tambah</Button>
                      </EmptyContent>
                    </Empty>
                  </TableCell>
                </TableRow>
              )}

            {!fetchStudentsLoading &&
              !fetchStudentsError &&
              students.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.nisn}</TableCell>
                  <TableCell>{student.phoneNumber}</TableCell>
                  <TableCell className={`flex items-center gap-2`}>
                    <Button onClick={() => router.push(`/students/${student.id}/edit`)} className="bg-chart-2 size-7">
                      <PencilIcon />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className={`size-7`} variant="destructive">
                          <Trash2Icon />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>
                          Anda yakin akan menghapus data ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Jika yaa, akan mengakibatkan data terhapus secara
                          permanen dan tidak dapat dipulihkan
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogAction
                            onClick={() => handleDelete(student.id)}
                          >
                            Ya, hapus!
                          </AlertDialogAction>
                          <AlertDialogCancel>Batalkan</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button className={`size-7`}>
                      <AlertCircle />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
