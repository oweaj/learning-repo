import { format } from "date-fns/format";

export const dateFormat = (date: string, type = "yyyy.MM.dd") => {
  return date ? format(date, type) : "";
};
