import { ReactNode } from "react";

const SectionList = ({ children }: { children?: ReactNode }) => {
  return <div className="flex flex-col gap-10">{children}</div>;
};

export default SectionList;
