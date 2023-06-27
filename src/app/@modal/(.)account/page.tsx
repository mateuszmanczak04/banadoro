import Account from '@/components/account/Account';
import Modal from '@/components/Modal';

const page = () => {
  return (
    <Modal maxWidth='3xl' title='Account'>
      <Account />
    </Modal>
  );
};

export default page;