import { studentService } from "@/Services/studentService";
import { useState } from "react";

export const useCreateStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createData = async (values) => {
    setLoading(true);
    setError(null);
    try {
      await studentService.create(values);
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
    createData,
    createDataLoading: loading,
    createDataError: error,
  };
};
