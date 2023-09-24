const Footer = () => {
  return (
    <div className='w-full bg-gray-900 text-gray-400 flex justify-center py-8'>
      <div className='container text-center flex flex-col items-center gap-4'>
        <a href='https://www.linkedin.com/in/mateusz-manczak/' target='_blank'>
          Made by Mateusz Mańczak
        </a>
        <a
          href='https://github.com/mateuszmanczak04/banadoro'
          className='bg-primary-500 text-gray-900 px-2 rounded'>
          Source code
        </a>
      </div>
    </div>
  );
};

export default Footer;
