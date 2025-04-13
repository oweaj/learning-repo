import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";

interface FormFieldWrapperProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  labelStyle?: string;
  inputType?: string;
  inputStyle?: string;
}

const FormFieldWrapper = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  labelStyle,
  inputType,
  inputStyle,
}: FormFieldWrapperProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={cn(labelStyle ?? "text-base font-bold text-gray-400")}
          >
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={inputType}
              placeholder={placeholder}
              {...field}
              className={cn(inputStyle ?? "p-2 h-12 bg-gray-50")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldWrapper;
