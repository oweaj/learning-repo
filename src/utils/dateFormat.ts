import { format } from "date-fns/format";

export const dateFormat = (date: string, type = "yyyy.MM.dd HH:mm") => {
  return date ? format(date, type) : "";
};
