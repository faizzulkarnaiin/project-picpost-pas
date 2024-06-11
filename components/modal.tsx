import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, ReactNode, useRef, useState } from "react";

export default function Modal({ children } : {children : ReactNode}) {
  const overlayRef = useRef(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = (e : any) => {
    if (e.target === overlayRef.current) {
      router.back();
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto z-50"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center" ref={overlayRef} onClick={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            {/* Konten Modal */}
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {children}
              {/* Tombol Tutup */}
              <button
                type="button"
                className="mt-4 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-teal-900 border border-transparent rounded-md hover:bg-white focus:outline-none hover:text-teal-900 focus-visible:ring-2 focus-visible:ring-offset-2 hover:ring-teal-900"
                onClick={() => setIsOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
