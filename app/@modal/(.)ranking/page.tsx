import Modal from '@/components/Modal';
import Ranking from '@/components/ranking/Ranking';

const page = () => {
  return (
    <Modal maxWidth='xl' title='Ranking'>
      {/* @ts-expect-error // TODO */}
      <Ranking />
    </Modal>
  );
};

export default page;
