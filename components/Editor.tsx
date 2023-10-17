"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }: { entry: { content: string; id: string } }) => {
  const [text, setText] = useState(() => entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  useAutosave({
    data: text,
    onSave: async (value: string) => {
      setIsLoading(true);
      const updated = await updateEntry(entry?.id, value);
      setIsLoading(false);
    },
  });
  return (
    <div className="w-full h-full">
      {isLoading && <div>saving...</div>}
      <textarea
        className="w-full h-full p-8 text-xl"
        value={text}
        name="text"
        onChange={handleChange}
      />
    </div>
  );
};

export default Editor;
