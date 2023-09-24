import App from './(.)/App';
import Tutorial from './(.)/Tutorial';
import Footer from './(.)/Footer';

const page = () => {
  return (
    <div className='bottom-menu flex flex-col gap-4'>
      <App />
      <Tutorial />
      <Footer />
    </div>
  );
};

export default page;
