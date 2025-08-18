import { NotebookPen } from "lucide-react";
import { Star } from "lucide-react";
import { Pencil } from "lucide-react";
import { Megaphone } from "lucide-react";

export const MYPAGE_USER_INFO = [
  {
    id: "blogCount",
    name: "내 블로그 수",
    path: "/my/blogs",
    Icon: NotebookPen,
  },
  { id: "likeCount", name: "최대 공감 수", path: null, Icon: Star },
  { id: "reviewCount", name: "최대 댓글 수", path: null, Icon: Pencil },
  { id: "notice", name: "공지사항", path: "/my/notice", Icon: Megaphone },
];

export const MYPAGE_SIDE_BAR = [
  {
    groupName: "블로그 정보",
    items: [
      { name: "작성한 블로그", path: "/my/blogs" },
      { name: "공감한 블로그", path: "/my/liked-blogs" },
    ],
  },
  {
    groupName: "계정",
    items: [
      { name: "프로필 수정", path: "/my/profile-edit" },
      { name: "회원 탈퇴", path: null },
    ],
  },
];
