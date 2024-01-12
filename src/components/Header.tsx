import SideBar from "./SideBar";

const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={`relative flex w-full justify-between items-start ${className}`}
    >
      <p className="select-none text-xl font-semibold text-left">guidebin</p>

      <SideBar className="absolute right-0 z-10" />
    </header>
  );
};

export default Header;
