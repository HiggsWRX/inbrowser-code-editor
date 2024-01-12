import { useEffect, useRef, useState } from "react";
import MenuSVG from "../assets/svg/menu.svg?react";
import { Button } from "../elements";
import useApplicationStore from "../state/application.state";

type SideBarProps = {
  className?: string;
};

const SideBar = ({ className }: SideBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const resetGuide = useApplicationStore((state) => state.resetGuide);
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen((previous) => !previous);
  };

  useEffect(() => {
    const listen = (ev: MouseEvent) => {
      if (
        ref.current &&
        ev.target &&
        !ref.current.contains(ev.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", listen, { capture: true });
    return () => {
      document.removeEventListener("click", listen, { capture: true });
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-2 items-end rounded-sm border-solid border-light-50 ${className}`}
    >
      <Button onClick={handleMenuClick} unstylled>
        <MenuSVG />
      </Button>

      <ul
        className={`
        flex flex-col gap-2 items-end transform-origin-top-right bg-gray-9 transition ml-8 mr-4 pb-4 children:(children:(underline))
        ${isOpen ? "scale-100" : "scale-0"}
      `}
      >
        <li>
          <Button onClick={resetGuide} unstylled>
            reset guide
          </Button>
        </li>
        <li>
          <Button onClick={() => {}} unstylled>
            toggle theme
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
