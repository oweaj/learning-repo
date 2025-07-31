import type { Request, Response } from "express";
import type { IUserRequest } from "../middleware/user-middleware.js";
import { Blog } from "../schemas/blog-schema.js";

interface IBlogListFilter {
  deleted_at?: Date | null;
  category_id?: string;
}

// 블로그 생성
export const blogCreate = async (req: Request, res: Response) => {
  try {
    const { title, main_image, sub_image, category_id, content } = req.body;
    const user_id = (req as IUserRequest).user._id;

    if (!title || !main_image || !category_id || !content) {
      res.status(400).json({ message: "필수 항목을 모두 입력해주세요." });
      return;
    }

    if (!user_id) {
      res.status(401).json({ message: "로그인이 필요합니다." });
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
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filterData: IBlogListFilter = { deleted_at: null };

    if (category) {
      filterData.category_id = category;
    }

    const bloglist = await Blog.find(filterData)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user_id", "email name profile_image")
      .populate("category_id")
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

    const blogDetail = await Blog.findById(id)
      .populate("user_id", "email name")
      .populate("category_id");

    if (!blogDetail) {
      res.status(404).json({ message: "존재하지 않는 블로그입니다." });
      return;
    }

    res
      .status(200)
      .json({ message: "블로그 상세 조회 완료", data: blogDetail });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 블로그 수정
export const blogUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, main_image, sub_image, category_id, content } = req.body;
    const user_id = (req as IUserRequest).user._id;

    if (!user_id) {
      res.status(401).json({ message: "로그인이 필요합니다." });
      return;
    }

    const checkBlog = await Blog.findById(id);
    if (!checkBlog) {
      res.status(404).json({ message: "존재하지 않는 블로그입니다." });
      return;
    }

    if (checkBlog.user_id.toString() !== user_id.toString()) {
      res.status(403).json({ message: "해당 블로그 수정 권한이 없습니다." });
      return;
    }

    const updateBlogData = {
      title: title ?? checkBlog.title,
      main_image: main_image ?? checkBlog.main_image,
      sub_image: sub_image ?? checkBlog.sub_image,
      category_id: category_id ?? checkBlog.category_id,
      content: content ?? checkBlog.content,
    };

    await Blog.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { $set: updateBlogData },
      { new: true },
    );

    res.status(200).json({ message: "블로그가 수정되었습니다." });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 블로그 삭제
export const blogDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as IUserRequest).user;

    if (!user) {
      res.status(401).json({ message: "로그인이 필요합니다." });
      return;
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ message: "존재하지 않는 블로그입니다." });
      return;
    }

    if (blog.user_id.toString() !== user._id.toString()) {
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
    const user_id = (req as IUserRequest).user._id;

    if (!user_id) {
      res.status(401).json({ message: "로그인이 필요합니다." });
      return;
    }

    const checkBlog = await Blog.findById(id);
    if (!checkBlog) {
      res.status(404).json({ message: "존재하지 않는 블로그입니다." });
      return;
    }

    const checkUserLike = checkBlog.like_user.some(
      (user: string) => user === user_id.toString(),
    );

    const updateBlogData = checkUserLike
      ? { $pull: { like_user: user_id }, $inc: { like_count: -1 } }
      : { $addToSet: { like_user: user_id }, $inc: { like_count: 1 } };

    const result = await Blog.findOneAndUpdate(
      { _id: id, user_id: user_id },
      updateBlogData,
      { new: true },
    );

    res.status(200).json({
      message: checkUserLike
        ? "좋아요가 취소되었습니다."
        : "좋아요가 등록되었습니다.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};
