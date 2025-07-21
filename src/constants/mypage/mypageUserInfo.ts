import { NotebookPen } from "lucide-react";
import { MousePointerClick } from "lucide-react";
import { Star } from "lucide-react";
import { Pencil } from "lucide-react";
import { Megaphone } from "lucide-react";

export const MYPAGE_USER_INFO = [
  { name: "내 블로그 수", path: "/my/blogs", Icon: NotebookPen },
  { name: "최대 조회 수", path: null, Icon: MousePointerClick },
  { name: "최대 공감 수", path: null, Icon: Star },
  { name: "최대 댓글 수", path: null, Icon: Pencil },
  { name: "공지사항", path: "/my/notice", Icon: Megaphone },
];
