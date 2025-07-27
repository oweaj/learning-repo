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
