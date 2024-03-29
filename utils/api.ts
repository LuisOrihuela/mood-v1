import { json } from "stream/consumers";

const createUrl = (path: string) => {
  return window.location.origin + path;
};

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(
    new Request(createUrl(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    throw new Error("Something went wrong");
  }
};

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createUrl("/api/journal"), { method: "POST" })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
