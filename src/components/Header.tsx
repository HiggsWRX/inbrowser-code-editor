import { Button } from "./elements";

import Settings from "../assets/svg/settings.svg?react";

const Header = ({ className }: { className?: string }) => {
  return (
    <header className={`flex justify-between items-start ${className}`}>
      <p className="text-xl font-semibold text-left">guidebin</p>
      <Button onClick={() => {}} unstylled className="">
        <Settings />
      </Button>
    </header>
  );
};

export default Header;
