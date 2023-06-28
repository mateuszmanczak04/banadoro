import Modal from '@/components/Modal';
import Ranking from '@/components/ranking/Ranking';

const page = () => {
  return (
    <Modal maxWidth='xl' title='Ranking'>
      {/* @ts-ignore server component */}
      <Ranking />
    </Modal>
  );
};

export default page;
