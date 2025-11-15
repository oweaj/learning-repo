// 이미지 업로드
export const uploadImageApi = async ({
  file,
  prefix,
}: { file: File; prefix: string }) => {
  const MAX_SIZE = 5 * 1024 * 1024;

  if (file.size > MAX_SIZE) {
    throw new Error("파일 크기는 5MB를 초과할 수 없습니다.");
  }

  const res = await fetch(`/api/image/${prefix}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
    }),
  });

  if (!res.ok) throw new Error("Presigned URL 요청 실패");
  const { uploadUrl, fileUrl } = await res.json();

  const upload = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });

  if (!upload.ok) {
    throw new Error("이미지 업로드 실패");
  }

  return fileUrl;
};

// 이미지 삭제
export async function deleteImageApi({
  key,
  prefix,
}: { key: string; prefix: string }) {
  if (!key) throw new Error("삭제할 key가 필요합니다.");

  const res = await fetch(`/api/image/${prefix}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });

  if (!res.ok) throw new Error("이미지 삭제 실패");

  return res.json();
}
