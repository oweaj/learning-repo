import axios from "axios";

export const imageUploadApi = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  if (!file) throw new Error("이미지 파일이 없습니다.");

  const { data } = await axios.post("/api/image", formData);

  return data;
};
