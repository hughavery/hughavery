import { useEffect, useRef } from 'react';

interface ModalProps {
  onClose: () => void;
}

function ContactModal({ onClose }: ModalProps) {
  const phoneNumber = '+64 022 499 3402';
  const emailAddress = 'hughavery101@gmail.com';
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div ref={modalRef} className="bg-white rounded-lg p-10">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <div className="mb-2">
        <p className="text-green-500 font-semibold">Phone:</p>
        <a href={`tel:${phoneNumber}`} className='underline text-indigo-500 hover:text-indigo-300'>{phoneNumber}</a>

        </div>
        <div className="mb-2">
          <p className="text-green-500 font-semibold">Email:</p>
          <a className="underline text-indigo-500 hover:text-indigo-300" href={`mailto:${emailAddress}`}>
            {emailAddress}
          </a>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-purple-200 text-gray-700 px-4 py-2 rounded mt-4 hover:bg-sky-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
