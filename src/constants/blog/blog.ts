import { House } from "lucide-react";
import { Trophy } from "lucide-react";
import { UserRound } from "lucide-react";

export const BOTTOM_NAV_LIST = [
  { name: "home", path: "/", Icon: House },
  { name: "rank", path: "/blog_rank", Icon: Trophy },
  { name: "user", path: "/my", Icon: UserRound },
];

export const BLOG_CATEGORY = [
  { id: 0, name: "전체", value: "all" },
  { id: 1, name: "일상생활", value: "daily_life" },
  { id: 2, name: "맛집소개", value: "food_reviews" },
  { id: 3, name: "제품후기", value: "product_reviews" },
  { id: 4, name: "IT정보", value: "it_info" },
];
