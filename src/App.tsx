import AddCell from "./components/AddCell";
import CellList from "./components/CellList";
import CodeEditor from "./components/CodeEditor";
import Header from "./components/Header";
import TextEditor from "./components/TextEditor";

const App = () => {
  return (
    <div className="px-4 py-4 text-white">
      <Header className="mb-4" />
      <CellList>
        <TextEditor />
        <CodeEditor />
      </CellList>
    </div>
  );
};

export default App;
