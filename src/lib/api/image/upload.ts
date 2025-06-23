import { clientAxios } from "@/lib/axios/clientAxios";

export const imageUploadApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  if (!file) throw new Error("이미지 파일이 없습니다.");

  const { data } = await clientAxios.post("/api/image/upload", formData);

  return data;
};
