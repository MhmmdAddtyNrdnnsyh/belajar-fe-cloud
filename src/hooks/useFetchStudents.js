import { studentService } from "@/Services/studentService";
import { useCallback, useState } from "react";

export const useFetchStudents = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAll();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "terjadi kesalahan saat mengambil data",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchStudents,
    fetchStudentsLoading: loading,
    fetchStudentsError: error,
    students,
  };
};
