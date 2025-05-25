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
  data: { id: number; name: string; value: string }[];
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
          {data.map(({ id, name, value }) => (
            <SelectItem key={`${id}-${value}`} value={String(id)}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectWrapper>
  );
};

export default Select;
