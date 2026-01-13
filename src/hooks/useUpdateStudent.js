import { studentService } from "@/Services/studentService";
import { useState } from "react";

export const useUpdateStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (id, values) => {
    setLoading(true);
    setError(null);
    try {
      await studentService.update(id, values);
      return true;
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "terjadi kesalahan saat mengirim data"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    updateData,
    updateDataLoading: loading,
    updateDataError: error,
  };
};
