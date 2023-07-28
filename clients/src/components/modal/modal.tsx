"use client";

import { useRouter } from "next/navigation";

export default function Modal({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const router = useRouter();
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          {children}
        </form>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              router.back();
            }}
          >
            close
          </button>
        </form>
      </dialog>
    </>
  );
}
