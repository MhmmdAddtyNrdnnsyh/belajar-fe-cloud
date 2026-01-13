import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormComponent from "./form";

export default function PopupData({
  open,
  onOpenChange,
  title,
  initialData,
  onSubmit,
  mode,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <FormComponent
          onSubmit={onSubmit}
          defaultValues={initialData}
          readOnly={mode === "detail"}
        />
      </DialogContent>
    </Dialog>
  );
}
