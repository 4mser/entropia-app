"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteThread } from "@/lib/actions/thread.actions";
import Loader from "../ui/loader";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (currentUserId !== authorId) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteThread(JSON.parse(threadId), pathname);
      
    } finally {
      if (!parentId || !isComment) {
        router.push("/");
      }
      setLoading(false);

    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {loading ? (<Loader />
      ): (
        <img
        src="/assets/delete.svg"
        alt="delete"
        width={18}
        height={18}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
      )}
      
    </div>
  );
}

export default DeleteThread;
