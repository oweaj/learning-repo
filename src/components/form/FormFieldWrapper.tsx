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
  label?: string;
  placeholder?: string;
  inputType?: string;
  inputStyle?: string;
  customContent?: (field: any) => React.ReactNode;
}

const FormFieldWrapper = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  inputType,
  inputStyle,
  customContent,
}: FormFieldWrapperProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={cn(
              label
                ? "flex items-start text-base font-bold text-gray-700 gap-1"
                : "mt-5",
            )}
          >
            {label}
            {label && (
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1" />
            )}
          </FormLabel>
          <FormControl>
            {customContent ? (
              customContent(field)
            ) : (
              <Input
                type={inputType}
                placeholder={placeholder}
                {...field}
                className={cn(inputStyle ?? "p-2 h-12 bg-gray-50")}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldWrapper;
