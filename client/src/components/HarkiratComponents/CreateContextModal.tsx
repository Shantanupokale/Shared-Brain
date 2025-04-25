//modal is like a pop up when we tr to ad content then screen gets blurred and one popup is haown this isjthe genaral use of modal open and close 


export function CreateContextModal({ open, onClose }:any) {
    if (!open) return null;
  
    return (
      <>
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-slate-500 opacity-60 z-10"
          onClick={onClose}
        />
        <div className="fixed top-1/2 left-1/2 z-20 bg-white p-4 rounded shadow-md -translate-x-1/2 -translate-y-1/2">
          <p className="text-black">This is the modal content!</p>
          <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </>
    );
  }
  