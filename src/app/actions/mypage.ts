"use server";

import connectDB from "@/lib/database/db";
import { Blog } from "@/lib/schemas/blog-schema";
import { Notice } from "@/lib/schemas/notice-schema";
import type { INoticeFormDataType } from "@/types/mypage.type";
import { requireSession } from "./requireSession";

// 공지사항 리스트
export const noticeListAction = async () => {
  await connectDB();

  const data = await Notice.find({ deleted_at: null })
    .sort({ createdAt: -1 })
    .lean();
  const noticelist = JSON.parse(JSON.stringify(data));

  return noticelist;
};

// 공지사항 생성
export const noticeCreateAction = async (data: INoticeFormDataType) => {
  await connectDB();

  const user = await requireSession();
  const { title, content } = data;

  if (!title || !content) {
    throw new Error("필수 항목을 모두 입력해주세요.");
  }

  if (user.name !== "관리자") {
    throw new Error("공지사항을 등록할 권한이 없습니다.");
  }

  const notice = new Notice({ title, content });

  await notice.save();
  return { state: true, message: "공지사항이 등록되었습니다." };
};

// 공지사항 수정
export const noticeUpdateAction = async ({
  id,
  data,
}: { id: string; data: any }) => {
  await connectDB();

  const user = await requireSession();
  const { title, content } = data;

  if (user.name !== "관리자") {
    throw new Error("공지사항을 수정할 권한이 없습니다.");
  }

  const checkNotice = await Notice.findById(id);

  if (!checkNotice) {
    throw new Error("존재하지 않는 공지사항입니다.");
  }

  const updateNoticeData = {
    title: title ?? checkNotice.title,
    content: content ?? checkNotice.content,
  };

  await Notice.findByIdAndUpdate(id, { $set: updateNoticeData }, { new: true });
  return { state: true, message: "공지사항이 수정되었습니다." };
};

// 공지사항 상세 리스트
export const noticeDetailAction = async (id: string) => {
  await connectDB();

  const data = await Notice.findById(id).select("title content");

  if (!data) {
    throw new Error("존재하지 않는 블로그입니다.");
  }

  const noticeDetail = JSON.parse(JSON.stringify(data));
  return noticeDetail;
};

// 공지사항 삭제
export const noticeDeleteAction = async (id: string) => {
  await connectDB();

  const user = await requireSession();
  if (user.name !== "관리자") {
    throw new Error("해당 공지사항을 삭제할 권한이 없습니다.");
  }

  const notice = await Notice.findById(id);
  if (!notice) {
    throw new Error("존재하지 않는 공지사항입니다.");
  }

  notice.deleted_at = new Date();
  await notice.save();
  return { message: "공지사항이 삭제되었습니다." };
};

// 등록한 블로그 및 최대 공감 수
export const myBlogsAction = async () => {
  await connectDB();

  const user = await requireSession();
  let maxLikeCount = 0;

  const data = await Blog.find({ user_id: user._id, deleted_at: null })
    .sort({ createdAt: -1 })
    .populate("user_id", "email name profile_image")
    .lean();

  data.forEach((blog) => {
    if (blog.like_count > maxLikeCount) {
      maxLikeCount = blog.like_count;
    }
  });
  const blogs = JSON.parse(JSON.stringify(data));

  return { message: "등록한 블로그 조회 완료되었습니다.", blogs, maxLikeCount };
};

// 공감한 블로그 리스트
export const myLikeBlogsAction = async () => {
  await connectDB();

  const user = await requireSession();
  const data = await Blog.find({ like_user: user._id, deleted_at: null })
    .sort({ createdAt: -1 })
    .populate("user_id", "email name profile_image")
    .lean();

  const likeBlogs = JSON.parse(JSON.stringify(data));

  return { message: "공감한 블로그 조회 완료되었습니다.", likeBlogs };
};
