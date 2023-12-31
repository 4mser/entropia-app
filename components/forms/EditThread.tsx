"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { editThread } from "@/lib/actions/thread.actions";
import Loader from "../ui/loader";
import { Textarea } from "../ui/textarea";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
  initialText: string;
}

function EditThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
  initialText,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newText, setNewText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const pathname = usePathname();

  if (currentUserId !== authorId) return null;

  const handleEdit = async () => {
    try {
      setLoading(true);
      await editThread(JSON.parse(threadId), newText || "", pathname);
    } finally {
      if (!parentId || !isComment) {
        router.push("/");
      }
      setLoading(false);
      setIsEditing(false);
    }
  };

  const openModal = () => setIsEditing(true);
  const closeModal = () => setIsEditing(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isEditing ? (
            <div className="w-full h-screen bg-dark-1/90 fixed z-50 top-0 left-0 flex justify-center items-center">
              <div className="bg-dark-1 rounded-xl border border-white/10 overflow-hidden p-5 flex flex-col">
                <Textarea
                rows={5}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="bg-dark-2 rounded-md p-2 text-white h-auto w-auto"
                />
                <div className="flex flex-col gap-2 mt-3">
                <button onClick={handleEdit} className="text-white rounded-lg bg-gradient-to-tr from-blue to-green-700 py-1">
                  Guardar
                </button>
                <button onClick={closeModal} className="text-white rounded-lg border border-white/10 py-1">
                  Cancelar
                </button>
                </div>
              </div>
            </div>
          ) : (
            <img
              src="/assets/editarpost.svg"
              alt="edit"
              width={18}
              height={18}
              className="cursor-pointer object-contain opacity-70 hover:opacity-100"
              onClick={openModal}
            />
          )}
        </>
      )}
    </div>
  );
}

export default EditThread;
