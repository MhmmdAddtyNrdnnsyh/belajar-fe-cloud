import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

export default function TableComponent({
  values,
  handleEdit,
  handleDelete,
  handleDetail,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>NIS</TableHead>
          <TableHead>NISN</TableHead>
          <TableHead>Nomor Telepon</TableHead>
          <TableHead>Foto</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {values.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center">
              Data Tidak Ditemukan
            </TableCell>
          </TableRow>
        )}
        {values.map((value, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{value.name}</TableCell>
            <TableCell>{value.email}</TableCell>
            <TableCell>{value.nis}</TableCell>
            <TableCell>{value.nisn}</TableCell>
            <TableCell>{value.phoneNumber}</TableCell>
            <TableCell>
              <Image src={value.foto} alt={value.name} width={50} height={50} />
            </TableCell>
            <TableCell className="flex gap-2">
              <Button onClick={() => handleEdit(value)} variant="outline">
                Edit
              </Button>
              <Button onClick={() => handleDetail(value)} variant="ghost">
                <EyeIcon className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleDelete(value.id)}
                variant="destructive"
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
