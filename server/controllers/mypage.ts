import type { Request, Response } from "express";
import type { IUserRequest } from "../middleware/user-middleware";
import { Blog } from "../schemas/blog-schema";
import { Notice } from "../schemas/notice-schema";

// 공지사항 등록
export const noticeCreate = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const userName = (req as IUserRequest).user.name;

    if (!title || !content) {
      res.status(400).json({ message: "필수 항목을 모두 입력해주세요." });
      return;
    }

    if (userName !== "관리자") {
      res.status(403).json({ message: "공지사항을 등록할 권한이 없습니다." });
      return;
    }

    const notice = new Notice({
      title,
      content,
    });

    await notice.save();
    res.status(200).json({ message: "공지사항이 등록되었습니다." });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 공지사항 목록
export const noticeList = async (_req: Request, res: Response) => {
  try {
    const noticelist = await Notice.find({ deleted_at: null })
      .sort({ createdAt: -1 })
      .lean();

    res
      .status(200)
      .json({ message: "공지사항 목록 조회 완료", data: noticelist });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 공지사항 수정
export const noticeUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userName = (req as IUserRequest).user.name;

    if (userName !== "관리자") {
      res.status(403).json({ message: "공지사항을 수정할 권한이 없습니다." });
      return;
    }

    const checkNotice = await Notice.findById(id);
    if (!checkNotice) {
      res.status(400).json({ message: "존재하지 않는 공지사항입니다." });
      return;
    }

    const updateNoticeData = {
      title: title ?? checkNotice.title,
      content: content ?? checkNotice.content,
    };

    await Notice.findByIdAndUpdate(
      id,
      { $set: updateNoticeData },
      { new: true },
    );

    res.status(200).json({ message: "공지사항이 수정되었습니다." });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 공지사항 상세
export const noticeDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const noticeDetail = await Notice.findById(id).select("title content");

    if (!noticeDetail) {
      res.status(404).json({ message: "존재하지 않는 블로그입니다." });
      return;
    }

    res
      .status(200)
      .json({ message: "블로그 상세 조회 완료", data: noticeDetail });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 공지사항 삭제
export const noticeDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userName = (req as IUserRequest).user.name;

    if (userName !== "관리자") {
      res
        .status(403)
        .json({ message: "해당 공지사항을 삭제할 권한이 없습니다." });
      return;
    }

    const notice = await Notice.findById(id);
    if (!notice) {
      res.status(404).json({ message: "존재하지 않는 공지사항입니다." });
      return;
    }

    notice.deleted_at = new Date();
    await notice.save();

    res.status(200).json({ message: "공지사항이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 등록한 블로그 및 최대 공감 수
export const myBlogs = async (req: Request, res: Response) => {
  try {
    const user_id = (req as IUserRequest).user._id;
    let maxLikeCount = 0;

    const result = await Blog.find({ user_id, deleted_at: null })
      .sort({ createdAt: -1 })
      .populate("user_id", "email name profile_image")
      .populate("category_id")
      .lean();

    result.forEach((blog) => {
      if (blog.like_count > maxLikeCount) {
        maxLikeCount = blog.like_count;
      }
    });

    res.status(200).json({
      message: "등록한 블로그 조회 완료되었습니다.",
      blogs: result,
      maxLikeCount,
    });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 공감한 블로그
export const myLikeBlogs = async (req: Request, res: Response) => {
  try {
    const user_id = (req as IUserRequest).user._id;

    const result = await Blog.find({ like_user: user_id, deleted_at: null })
      .sort({ createdAt: -1 })
      .populate("user_id", "email name profile_image")
      .populate("category_id")
      .lean();

    res.status(200).json({
      message: "공감한 블로그 조회 완료되었습니다.",
      likeBlogs: result,
    });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};
