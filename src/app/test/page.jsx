"use client";
import { Button } from "@/components/ui/button";
import Table from "./components/table";
import { useEffect, useState } from "react";
import PopupData from "./components/popup-data";
import { useFetchStudents } from "@/hooks/useFetchStudents";
import { useDeleteStudent } from "@/hooks/useDelete";
import { useCreateStudent } from "@/hooks/useCreateStudent";
import { useUpdateStudent } from "@/hooks/useUpdateStudent";

export default function TestPage() {
  const { fetchStudents, students } = useFetchStudents();
  const { deleteStudent } = useDeleteStudent();
  const { createData } = useCreateStudent();
  const { updateData } = useUpdateStudent();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("add"); // "add", "edit", "detail"
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  const handleOpenAdd = () => {
    setPopupMode("add");
    setSelectedStudent(null);
    setIsPopupOpen(true);
  };

  const handleOpenEdit = (student) => {
    setPopupMode("edit");
    setSelectedStudent(student);
    setIsPopupOpen(true);
  };

  const handleOpenDetail = (student) => {
    setPopupMode("detail");
    setSelectedStudent(student);
    setIsPopupOpen(true);
  };

  const handleSubmit = async (values) => {
    let success = false;
    if (popupMode === "add") {
      success = await createData(values);
    } else if (popupMode === "edit") {
      success = await updateData(selectedStudent.id, values);
    }

    if (success) {
      setIsPopupOpen(false);
      fetchStudents();
    }
  };

  return (
    <div className="p-10 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Siswa</h1>
        <Button onClick={handleOpenAdd}>Tambah</Button>
      </header>
      <Table
        values={students}
        handleEdit={handleOpenEdit}
        handleDelete={handleDelete}
        handleDetail={handleOpenDetail}
      />
      <PopupData
        open={isPopupOpen}
        onOpenChange={setIsPopupOpen}
        title={
          popupMode === "add"
            ? "Tambah Data"
            : popupMode === "edit"
            ? "Edit Data"
            : "Detail Data"
        }
        initialData={popupMode === "add" ? {} : selectedStudent}
        onSubmit={handleSubmit}
        mode={popupMode}
      />
    </div>
  );
}
