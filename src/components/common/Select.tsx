import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as SelectWrapper,
} from "@/components/ui/select";
import clsx from "clsx";

interface SelectPropsType {
  data: { value: number; label: string }[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const Select = ({ data, value, placeholder, onChange }: SelectPropsType) => {
  return (
    <SelectWrapper value={value ? String(value) : ""} onValueChange={onChange}>
      <SelectTrigger className={clsx("w-full")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map(({ value, label }) => (
            <SelectItem key={value} value={String(value)}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectWrapper>
  );
};

export default Select;
