import Bell from "@/assets/icons/icon_bell.svg";

const Header = () => {
  return (
    <header className="max-w-screen-xl flex items-center justify-between py-6 mx-auto px-4">
      <h1 className="text-3xl font-black text-orange-400">BLOG</h1>
      <Bell className="w-6 h-6" />
    </header>
  );
};

export default Header;
