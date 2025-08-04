import { clientAxios } from "@/lib/axios/clientAxios";

export const imageUploadApi = async (
  prefix: string,
  file: File,
  prevImage?: string,
) => {
  if (!file) throw new Error("이미지 파일이 없습니다.");

  const formData = new FormData();
  formData.append("file", file);

  if (prevImage) {
    formData.append("prevImage", prevImage);
  }

  const { data } = await clientAxios.post(
    `/api/image/upload/${prefix}`,
    formData,
  );

  return data;
};
