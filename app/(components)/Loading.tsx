import React from 'react';

const Loading = () => {
  return (
    <svg
      width='35'
      height='35'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='animate-spin'>
      <path
        d='M25 47.9604C20.6488 47.9604 16.3953 46.6701 12.7775 44.2528C9.15957 41.8354 6.33978 38.3994 4.67465 34.3795C3.00952 30.3595 2.57385 25.936 3.42272 21.6684C4.2716 17.4008 6.3669 13.4808 9.44365 10.4041C12.5204 7.32731 16.4404 5.23202 20.708 4.38314C24.9756 3.53427 29.3991 3.96994 33.419 5.63507C37.439 7.3002 40.8749 10.12 43.2923 13.7379C45.7097 17.3558 47 21.6092 47 25.9604'
        stroke='url(#paint0_angular_1_2)'
        strokeWidth='6'
        strokeLinecap='round'
      />
      <defs>
        <radialGradient
          id='paint0_angular_1_2'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(25 25.9604) rotate(75.9516) scale(25.7708)'>
          <stop />
          <stop offset='1' stop-color='#EF4444' />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Loading;
