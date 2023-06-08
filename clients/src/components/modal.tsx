"use client";

import Link from "next/link";

export default function Modal({
  children,
  backUrl,
}: {
  children: React.ReactNode;
  backUrl: string;
}): JSX.Element {
  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">{children}</div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          <Link href={backUrl}>Close</Link>
        </label>
      </div>
    </>
  );
}
