import Tip from "@/assets/icons/icon_tip.svg";
import clsx from "clsx";

const NoticeBanner = ({
  subTitle,
  notice,
}: { subTitle?: string; notice: string }) => {
  return (
    <div className="relative bg-red-50 py-2 rounded-4xl">
      <div className="flex items-center text-sm font-semibold max-sm:text-xs">
        <div className="absolute flex items-center gap-1 text-orange-500 border border-orange-500 rounded-4xl p-2 bg-white">
          <Tip className="w-4 h-4" />
          {subTitle ? <span>{subTitle}</span> : null}
        </div>
        <div className={clsx(subTitle ? "ml-20" : "ml-12")}>{notice}</div>
      </div>
    </div>
  );
};

export default NoticeBanner;
