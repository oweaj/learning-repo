import { cfetch } from "@/lib/axios/cfetch";
import type { IBlogFormDataType } from "@/types/blog.type";

// 블로그 생성
export const blogCreateApi = async (formData: IBlogFormDataType) => {
  try {
    const { data } = await cfetch("api/blog/create", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// 블로그 목록
export const blogListApi = async (
  category: string | null,
  page: number,
  keyword?: string | null,
) => {
  try {
    let query = `page=${page}`;

    if (category) {
      query += `&category=${category}`;
    }

    if (keyword) {
      query += `&keyword=${encodeURIComponent(keyword)}`;
    }

    const { data } = await cfetch(`/api/blog/list?${query}`, {
      next: { revalidate: 60, tags: ["blog_list"] },
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// 블로그 상세
export const blogDetailApi = async (id: string) => {
  try {
    const { data } = await cfetch(`/api/blog/${id}`, {
      next: { revalidate: 60, tags: ["blogDetail"] },
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// 블로그 수정
export const blogUpdateApi = async ({
  id,
  formData,
}: { id: string; formData: IBlogFormDataType }) => {
  try {
    const { data } = await cfetch(`/api/blog/${id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
    });
    return { data, id };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("알 수 없는 오류 발생");
  }
};

// 블로그 이미지 업로드
export const blogImageUploadApi = async ({
  prefix,
  file,
}: { prefix: string; file: File }) => {
  try {
    if (!file) throw new Error("업로드할 이미지 파일이 없습니다.");

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await cfetch(`/api/blog/image/${prefix}`, {
      method: "POST",
      body: formData,
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// 블로그 공감
export const blogLikeApi = async (id: string) => {
  try {
    const { data } = await cfetch(`/api/blog/like/${id}`, { method: "PATCH" });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// 블로그 공감 랭킹
export const blogLikeRankApi = async () => {
  try {
    const { data } = await cfetch("/api/blog/like_rank", {
      next: { revalidate: 60, tags: ["blog_rank"] },
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// 블로그 삭제
export const blogDeleteApi = async (id: string) => {
  try {
    const { data } = await cfetch(`/api/blog/${id}`, { method: "DELETE" });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
