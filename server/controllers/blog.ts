import type { Request, Response } from "express";
import type { Types } from "mongoose";
import type { IUserRequest } from "../middleware/user-middleware.js";
import { Blog } from "../schemas/blog-schema.js";

// 블로그 생성
export const blogCreate = async (req: Request, res: Response) => {
  try {
    const { title, main_image, sub_image, category_id, content } = req.body;
    const user_id = (req as IUserRequest).user?._id || null;

    if (!title || !main_image || !category_id || !content) {
      res.status(400).json({ message: "필수 항목을 모두 입력해주세요." });
      return;
    }

    const blog = new Blog({
      title,
      main_image,
      sub_image: sub_image || null,
      category_id,
      content,
      user_id,
    });

    await blog.save();
    res.status(200).json({ message: "블로그 등록이 되었습니다." });
  } catch (error) {
    res.status(500).json({ message: `서버 에러 : ${error}` });
  }
};

// 블로그 목록
export const blogList = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const category = (req.query.category as string) || null;
    const keyword = req.query.keyword || null;
    const limit = 10;
    const skip = (page - 1) * limit;

    const filterData: Record<string, any> = { deleted_at: null };

    if (category) {
      filterData.category_id = category;
    }

    if (keyword) {
      filterData.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ];
    }

    const bloglist = await Blog.find(filterData)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user_id", "email name profile_image")
      .lean();

    const totalCount = await Blog.countDocuments(filterData);

    res.status(200).json({
      message: "블로그 목록 조회 완료",
      data: {
        bloglist,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(totalCount / limit)),
        totalCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 블로그 상세
export const blogDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as IUserRequest).user || null;
    const user_id = user?._id || null;

    const blogDetail = await Blog.findById(id).populate(
      "user_id",
      "email name",
    );

    if (!blogDetail) {
      res
        .status(404)
        .json({ data: null, message: "존재하지 않는 블로그입니다." });
      return;
    }

    const isWriter =
      user_id === null
        ? null
        : blogDetail.user_id._id.toString() === user_id.toString();
    const isLiked = user_id
      ? blogDetail.like_user.some(
          (userId: string) => userId.toString() === user_id.toString(),
        )
      : false;

    res.status(200).json({
      message: "블로그 상세 조회 완료",
      data: { ...blogDetail.toObject(), isWriter, isLiked },
    });
  } catch (error) {
    res.status(500).json({ data: null, message: `서버 에러: ${error}` });
  }
};

// 블로그 수정
export const blogUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, main_image, sub_image, category_id, content } = req.body;
    const user_id = (req as IUserRequest).user?._id || null;

    const blogData = await Blog.findById(id);
    if (!blogData) {
      res.status(404).json({ message: "존재하지 않는 블로그입니다." });
      return;
    }

    if (!user_id || blogData.user_id.toString() !== user_id.toString()) {
      res.status(403).json({ message: "해당 블로그 수정 권한이 없습니다." });
      return;
    }

    const updateBlogData = {
      title: title ?? blogData.title,
      main_image: main_image ?? blogData.main_image,
      sub_image: sub_image ?? blogData.sub_image,
      category_id: category_id ?? blogData.category_id,
      content: content ?? blogData.content,
    };

    await Blog.findOneAndUpdate(
      { _id: id, user_id },
      { $set: updateBlogData },
      { new: true },
    );

    res.status(200).json({ message: "블로그가 수정되었습니다." });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 블로그 이미지 업로드
export const blogImageUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "현재 파일이 없습니다." });
      return;
    }

    const file = req.file as Express.MulterS3.File;

    res.status(200).json({ url: file.location });
  } catch (error) {
    console.error("블로그 이미지 업로드 실패", error);
  }
};

// 블로그 삭제
export const blogDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = (req as IUserRequest).user?._id || null;

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ message: "존재하지 않는 블로그입니다." });
      return;
    }

    if (!user_id || blog.user_id.toString() !== user_id.toString()) {
      res.status(403).json({ message: "블로그 삭제 권한이 없습니다." });
      return;
    }

    blog.deleted_at = new Date();
    await blog.save();

    res.status(200).json({ message: "블로그가 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 블로그 공감
export const blogLike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = (req as IUserRequest).user?._id || null;

    const checkBlog = await Blog.findById(id);
    if (!checkBlog) {
      res.status(404).json({ message: "존재하지 않는 블로그입니다." });
      return;
    }

    const checkUserLike = checkBlog.like_user.some((user: Types.ObjectId) =>
      user.equals(user_id),
    );

    const updateBlogData = checkUserLike
      ? { $pull: { like_user: user_id }, $inc: { like_count: -1 } }
      : { $addToSet: { like_user: user_id }, $inc: { like_count: 1 } };

    await Blog.findOneAndUpdate({ _id: id }, updateBlogData, { new: true });

    res.status(200).json({
      message: checkUserLike
        ? "좋아요가 취소되었습니다."
        : "좋아요가 등록되었습니다.",
    });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 블로그 공감 랭킹
export const blogLikeRank = async (_req: Request, res: Response) => {
  try {
    const blogRank = await Blog.find({
      deleted_at: null,
      like_count: { $gt: 0 },
    })
      .sort({ like_count: -1, createdAt: -1 })
      .populate("user_id", "email name profile_image")
      .limit(10)
      .lean();

    res.status(200).json({ message: "공감 랭킹 조회 완료", blogRank });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};
