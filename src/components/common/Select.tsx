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
  data: { name: string; value: string }[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const Select = ({ data, value, placeholder, onChange }: SelectPropsType) => {
  return (
    <SelectWrapper value={value} onValueChange={onChange}>
      <SelectTrigger className={clsx("w-full")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map(({ name, value }) => (
            <SelectItem key={value} value={value}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectWrapper>
  );
};

export default Select;
