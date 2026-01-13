import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentValidator } from "@/validator/studentValidator";
import { useEffect } from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function FormComponent({ onSubmit, defaultValues, loading }) {
  const forms = useForm({
    resolver: zodResolver(studentValidator),
    defaultValues: {
      name: "",
      email: "",
      nis: "",
      nisn: "",
      phoneNumber: "",
      foto: null,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      forms.reset({
        name: "",
        email: "",
        nis: "",
        nisn: "",
        phoneNumber: "",
        foto: null,
        ...defaultValues,
      });
    }
  }, [forms, defaultValues]);
  return (
    <form onSubmit={forms.handleSubmit(onSubmit)} className="space-y-5">
      <Controller
        name="name"
        control={forms.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className={`-space-y-2.5`}>
            <FieldLabel htmlFor="name">Nama</FieldLabel>
            <Input
              {...field}
              id="name"
              type={`text`}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="email"
        control={forms.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className={`-space-y-2.5`}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...field}
              id="email"
              type={`email`}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="nis"
        control={forms.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className={`-space-y-2.5`}>
            <FieldLabel htmlFor="nis">NIS</FieldLabel>
            <Input
              {...field}
              id="nis"
              type={`text`}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="nisn"
        control={forms.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className={`-space-y-2.5`}>
            <FieldLabel htmlFor="nisn">NISN</FieldLabel>
            <Input
              {...field}
              id="nisn"
              type={`text`}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="phoneNumber"
        control={forms.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className={`-space-y-2.5`}>
            <FieldLabel htmlFor="phoneNumber">Nomor Telepon</FieldLabel>
            <Input
              {...field}
              id="phoneNumber"
              type={`text`}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="foto"
        control={forms.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className={`-space-y-2.5`}>
            <FieldLabel htmlFor="foto">Foto</FieldLabel>
            <Input
              id="foto"
              type={`file`}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file);
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button disabled={loading} type="submit">Submit</Button>
    </form>
  );
}
