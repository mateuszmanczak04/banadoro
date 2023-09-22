import SignOutButton from '../(common)/SignOutButton';
import ChangePassword from './ChangePassword';

const AccountSettings = () => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <h3 className='font-extrabold text-3xl w-full'>Account</h3>
      <ChangePassword />
      <SignOutButton />
    </div>
  );
};

export default AccountSettings;
