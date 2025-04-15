import axios from "axios";
import clientAxios from "../clientAxios";

export const imageUploadApi = async (file: File) => {
  const file_name = file.name;
  const { data } = await clientAxios.post("/api/v1/aws/upload", { file_name });

  await axios.put(data.uploadURL, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  const formatUrl = data.imageURL.replace(/ /g, "%20");

  return formatUrl;
};
