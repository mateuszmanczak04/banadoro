'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  maxWidth: string;
  title: string;
};

const Modal = ({ children, maxWidth, title }: Props) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  // disable document scrolling while modal is open
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  return (
    <div className='fixed w-screen h-screen z-50 left-0 top-0'>
      {/* backdrop */}
      <div
        className='w-full h-full bg-black bg-opacity-70'
        onClick={handleClose}></div>
      {/* content */}
      <div
        className={`bg-primary-300 rounded absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col gap-4 items-center w-10/12 dark:bg-gray-900 max-h-[83vh] overflow-y-scroll scrollbar-none max-w-${maxWidth}`}>
        <div className='w-full flex justify-between'>
          <h2 className='text-3xl font-bold'>{title}</h2>
          <svg
            onClick={handleClose}
            className='w-8 h-8 cursor-pointer'
            stroke='currentColor'
            strokeWidth='2.5'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'></path>
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
