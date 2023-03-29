import React, { useEffect, useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import AccountSettings from './AccountSettings';
import { useSession } from 'next-auth/react';

type Props = {
  close: () => void;
};

const AccountModal = ({ close }: Props) => {
  // session
  const { status } = useSession();

  const [authenticationStatus, setAuthenticationStatus] = useState<
    'login' | 'register' | 'loggedIn'
  >('login');

  useEffect(() => {
    if (status === 'authenticated') {
      setAuthenticationStatus('loggedIn');
    }
  }, [status]);

  return (
    <div className='fixed w-screen h-screen z-50 left-0 top-0'>
      {/* backdrop */}
      <div
        className='w-full h-full bg-black bg-opacity-70'
        onClick={close}></div>
      {/* content */}
      <div className='bg-white rounded absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col gap-4 items-center w-10/12 max-w-sm dark:bg-gray-900'>
        <div className='w-full flex justify-end'>
          <svg
            className='w-8 h-8 cursor-pointer'
            stroke='currentColor'
            stroke-width='2.5'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M6 18L18 6M6 6l12 12'></path>
          </svg>
        </div>
        <h2 className='text-3xl font-bold'>Account</h2>

        {authenticationStatus === 'login' && (
          <LoginForm
            setAuthenticationStatus={setAuthenticationStatus}
            close={close}
          />
        )}
        {authenticationStatus === 'register' && (
          <RegisterForm
            setAuthenticationStatus={setAuthenticationStatus}
            close={close}
          />
        )}
        {authenticationStatus === 'loggedIn' && (
          <AccountSettings close={close} />
        )}
      </div>
    </div>
  );
};

export default AccountModal;
