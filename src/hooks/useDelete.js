import { studentService } from "@/Services/studentService";
import { useState } from "react";

export const useDeleteStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteStudent = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await studentService.remove(id);
      return true;
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat menghapus data"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteStudent,
    deleteStudentLoading: loading,
    deleteStudentError: error,
  };
};
