import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import FileExplorer from "../components/editor/file-explorer/FileExplorer";
import { useSelector } from "react-redux";
import { useEditor } from "../components/editor/hooks/useEditor";
import { extensionToLanguage } from "../utils/utils";
import { VscFiles, VscFolder, VscFolderOpened } from "react-icons/vsc";
import { HiChartBar, HiOutlineChartBar } from "react-icons/hi";

const Editor = () => {
  const {
    getFiles,
    currentFileId,
    getCurrentFileContent,
    fileContentLoading,
    setCurrentFileId,
    handleEditorChange,
    handleSave,
    createNewFile,
    createFileLoading,
    saving,
  } = useEditor();

  // states to manage sidebars in mobile view
  const [showLeftBar, setShowLeftBar] = useState(true);
  const [showRightBar, setShowRightBar] = useState(false);

  const files = useSelector((state) => state.files);
  const [currentFile, setCurrentFile] = useState(null);

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    if (files) {
      setCurrentFile(files && files.find((f) => f.id == currentFileId));
    }
  }, [files, currentFileId]);

  useEffect(() => {
    if (currentFileId) {
      getCurrentFileContent();
    }
  }, [currentFileId]);

  // runs when the editor is mounted
  const handleEditorMount = (editor) => {
    // Bind 'Ctrl + S' to custom save function
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave(); // Trigger your custom save logic
    });
  };

  return (
    <div className="grid grid-cols-5 text-white h-screen">
      <div
        className={`-translate-x-${
          showLeftBar ? "0" : "full"
        } fixed transition-transform duration-300 w-[100vw] left-0 z-10 md:-translate-x-0 md:static md:w-auto col-span-1 h-full bg-dark-secondary`}
      >
        <FileExplorer
          createFileLoading={createFileLoading}
          createNewFile={createNewFile}
          setCurrentFileId={setCurrentFileId}
          currentFileId={currentFileId}
        />
      </div>
      <div className="col-span-5 md:col-span-3 bg-dark-secondary py-5">
        {files && !fileContentLoading && currentFile ? (
          <MonacoEditor
            defaultLanguage={extensionToLanguage[currentFile.extension]}
            defaultValue={currentFile.content}
            language={extensionToLanguage[currentFile.extension]}
            value={currentFile.content}
            theme="vs-dark"
            onChange={handleEditorChange}
            onMount={handleEditorMount}
          />
        ) : (
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        )}
      </div>
      <div
        className={`translate-x-${
          showRightBar ? "0" : "full"
        } w-[100vw] transition-transform duration-300 fixed right-0 z-10 md:translate-x-0 md:static md:w-auto col-span-1 h-full bg-dark-secondary`}
      >
        <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
          {currentFile && !currentFile.saved && (
            <button
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
              onClick={() => {
                if (!saving) {
                  handleSave(currentFile.content);
                }
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* To show toggle buttons for sidebars in mobile view */}
      <div className="fixed bottom-0 left-0 z-10 w-full flex items-center justify-between p-4 md:hidden">
        <button
          className="p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => {
            setShowLeftBar((prev) => {
              if (!prev && showRightBar) {
                setShowRightBar(false);
              }
              return !prev;
            });
          }}
        >
          {showLeftBar ? (
            <VscFolderOpened size={20} />
          ) : (
            <VscFolder size={20} />
          )}
        </button>
        <button
          className="p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => {
            {
              setShowRightBar((prev) => {
                if (!prev && showLeftBar) {
                  setShowLeftBar(false);
                }
                return !prev;
              });
            }
          }}
        >
          {showRightBar ? (
            <HiChartBar size={20} />
          ) : (
            <HiOutlineChartBar size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Editor;
