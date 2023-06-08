export default function FormModal({
  children,
  onSubmit,
  open,
}: {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  open: boolean;
}): JSX.Element {
  return (
    <dialog id="my_modal_2" className="modal">
      <form method="dialog" className="modal-box" onSubmit={onSubmit}>
        {children}
      </form>
    </dialog>
  );
}
