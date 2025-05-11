import React from "react";
import { FaPlus } from "react-icons/fa";
import FileItem from "./FileItem";
import { useSelector } from "react-redux";

const FileExplorer = ({
  setCurrentFileId,
  currentFileId,
  createNewFile,
  createFileLoading,
}) => {
  const files = useSelector((state) => state.files);
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Explorer</h3>
        <span
          onClick={() => {
            if (!createFileLoading) {
              createNewFile("testsd1.js");
            }
          }}
        >
          <FaPlus />
        </span>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search"
          className="primary-input-small"
        />
      </div>

      <div className="flex flex-col gap-2">
        {files
          ? files.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onClick={() => {
                  setCurrentFileId(file.id);
                }}
                isActive={file.id == currentFileId}
              />
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`flex items-center justify-between h-9 p-2 rounded-md cursor-pointer bg-dark-secondary duration-300 animate-pulse`}
              ></div>
            ))}
      </div>
    </div>
  );
};

export default FileExplorer;
