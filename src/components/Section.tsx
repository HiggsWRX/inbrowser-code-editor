import CodeEditor from "./CodeEditor";
import TextEditor from "./TextEditor";

export type TSectionType =
  | "text"
  | "text-code"
  | "text-preview"
  | "code"
  | "code-preview"
  | "preview";

export type TSection = {
  id: number;
  type: TSectionType;
  content: string;
};

export type TSectionProps = {
  index: number;
  data: TSection;
};

const Section = ({ index, data }: TSectionProps) => {
  switch (data.type) {
    case "text":
      return <TextEditor index={index} content={data.content} />;
    case "text-code":
      return <div>text-code</div>;
    case "text-preview":
      return <div>text-preview</div>;
    case "code":
      return <CodeEditor content={data.content} />;
    case "code-preview":
      return <div>code-preview</div>;
    case "preview":
      return <div>preview</div>;
    default:
      return <div>???</div>;
  }
};

export default Section;
