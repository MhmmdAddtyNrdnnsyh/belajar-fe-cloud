import { studentService } from "@/Services/studentService";
import { useCallback, useState } from "react";

export const useFetchStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);

  const fetchStudent = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getById(id);
      setStudent(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat mengambil data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchStudent,
    fetchStudentLoading: loading,
    fetchStudentError: error,
    student,
  };
};
