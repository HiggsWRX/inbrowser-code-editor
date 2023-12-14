import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";

const TextEditor = () => {
  const EDITOR_DEFAULT = `#### Here on the left you can write [markdown](https://www.markdownguide.org/basic-syntax/) and you will get the preview immediately on the right! eg:
# look at this big header!
  `;
  const VIEWER_DEFAULT = `
# Welcome to guidebin! 👋
### A place you can write simple (or not so simple) guides and easily share them with your friends, or the internet! It has support for various sections, with full support for markdown.
### You can also have sections with a simplified IDE where you can share javascript code snippets and see them compiled directly in your browser.

## So go ahead, click me and start writting your guide!
`;

  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | undefined>();
  const [editing, setEditing] = useState(false);

  const handleChange = (newValue: string | undefined) => {
    if (newValue === undefined) {
      return;
    }

    setValue(newValue);
  };

  const handleViewerClick = () => {
    if (!touched) setTouched(true);

    setEditing(true);
  };

  useEffect(() => {
    const listen = (ev: MouseEvent) => {
      if (
        ref.current &&
        ev.target &&
        !ref.current.contains(ev.target as Node)
      ) {
        setEditing(false);
      }
    };

    document.addEventListener("click", listen, { capture: true });
    return () => {
      document.removeEventListener("click", listen, { capture: true });
    };
  }, []);

  if (editing)
    return (
      <div ref={ref}>
        <MDEditor
          value={value ?? EDITOR_DEFAULT}
          onChange={handleChange}
          className="min-h-100"
        />
      </div>
    );

  return (
    <div
      className="rounded w-1/2 p-4 mx-a bg-gradient-to-r from-red to-sky"
      onClick={handleViewerClick}
    >
      <MDEditor.Markdown
        source={value ?? VIEWER_DEFAULT}
        className={`rounded px-8 py-4 bg-gray-9`}
      />
    </div>
  );
};

export default TextEditor;
