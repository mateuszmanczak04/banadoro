import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
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
      <div className='bg-white rounded absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col gap-4 items-center w-10/12 max-w-sm'>
        <div className='w-full flex justify-end'>
          <GrClose
            className='w-6 h-6 cursor-pointer hover:scale-110'
            onClick={close}
          />
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
