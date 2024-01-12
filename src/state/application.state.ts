import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TSection } from "../components/Section";

  // | "text"
  // | "text-code"
  // | "text-preview"
  // | "code"
  // | "code-preview"
  // | "preview";

const TEXT_DEFAULT = `
# Welcome to guidebin! 👋
### A place you can write guides and easily share them with your friends, colleagues, or the internet!
### You can add various sections, reorder them and organize it easily exactly as you want. There are three main different types of sections: Text (with markdown support), Code, Preview of said Code. Sections can be defined to show up alone or side-by-side in any combination.

### To get started, click to modify this section as an introduction to your guide. Alternatively you can delete it and create another one!
`;

const defaultTextSection = {
  id: 0,
  type: "text",
  content: TEXT_DEFAULT,
} as TSection;

const defaultCodeSection = {
  id: 1,
  type: "code",
  content: "Hello",
} as TSection;

const defaultSections = [defaultTextSection]

interface TApplicationState {
  reactDefinitions: string;
  updateReactDefinitions: (newDefinitions: string) => void;
  sections: TSection[];
  getSection: (atIndex: number) => TSection;
  addSection: (atIndex?: number) => void;
  removeSection: (atIndex: number) => void;
  moveSection: (fromIndex: number, atIndex: number) => void;
  updateSectionContent: (atIndex: number, updatedContent: string) => void;
  resetGuide: () => void;
}

const useApplicationStore = create<TApplicationState>()(
  persist(
    (set, get) => ({
      reactDefinitions: "",
      updateReactDefinitions: (newDefinitions) => {
        set({ reactDefinitions: newDefinitions });
      },
      sections: defaultSections,
      getSection: (atIndex) => get().sections[atIndex],
      addSection: (atIndex = 0) => {
        console.log("add section at ", atIndex);
      },
      removeSection: (atIndex) => {
        console.log("remove section at ", atIndex);
      },
      moveSection: (fromIndex, atIndex) => {
        console.log("move section from ", fromIndex, " to ", atIndex);
      },
      updateSectionContent: (atIndex, updatedContent) => {
        const newSections = get().sections.map((section, index) => {
          if (index === atIndex) {
            return { ...section, content: updatedContent };
          }

          return section;
        });

        set({ sections: newSections });
      },
      resetGuide: () =>
        set({ sections: defaultSections }),
    }),
    {
      name: "guidebin-store",
      partialize: (state) => ({ sections: state.sections }),
    }
  )
);

export default useApplicationStore;
