"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { editThread } from "@/lib/actions/thread.actions";
import Loader from "../ui/loader";

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
    const pathname = usePathname()
  
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
  
      return (
        <div style={{ position: "relative", display: "inline-block" }}>
          {loading ? (
            <Loader />
          ) : (
            <>
              {isEditing ? (
                <div>
                  <textarea
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  />
                  <button onClick={handleEdit} className="text-white">Save</button>
                  <button onClick={() => setIsEditing(false)} className="text-white">Cancel</button>
                </div>
              ) : (
                <img
                  src="/assets/edit.svg"
                  alt="edit"
                  width={18}
                  height={18}
                  className="cursor-pointer object-contain"
                  onClick={() => setIsEditing(true)}
                />
              )}
            </>
          )}
        </div>
      );
  }
  
  export default EditThread;