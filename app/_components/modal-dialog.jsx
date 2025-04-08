
export default function ModalDialog({refName, title, description, onConfirm}) {
  return (
    <dialog ref={refName} className="modal">
      <div className="modal-box w-1/3 max-w-5xl">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{description}</p>
        <div className="modal-action flex justify-center items-center gap-2">
          <form method="dialog">
            <button className="btn btn-error btn-sm">Cancel</button>
            <button className="btn btn-primary btn-sm ml-2" onClick={onConfirm}>Confirm</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}