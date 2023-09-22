'use client';

import twClass from '@/lib/twClass';
import { useEffect, useState } from 'react';

const InspirationQuotes = () => {
  const quotes = [
    {
      quote: `"Nothing is impossible. The word itself says 'I'm possible!'"`,
      author: 'Audrey Hepburn',
    },
    {
      quote: `"There is nothing impossible to they who will try."`,
      author: 'Alexander the Great',
    },
    {
      quote: `"The bad news is time flies. The good news is you're the pilot."`,
      author: 'Michael Altshuler',
    },
    {
      quote: `"Keep your face always toward the sunshine, and shadows will fall behind you."`,
      author: 'Walt Whitman',
    },
    {
      quote: `"Success is not final, failure is not fatal: it is the courage to continue that counts."`,
      author: 'Winston Churchill',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // change the quote every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className='hidden md:flex flex-1 w-full bg-gray-800 rounded-md p-8 flex-col justify-center relative'>
      {quotes.map((quote, index) => (
        <div
          className={twClass(
            'w-10/12 flex flex-col transition duration-1000 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            currentIndex === index ? 'opacity-100' : 'opacity-0'
          )}
          key={index}>
          <p className='text-left italic'>{quote.quote}</p>
          <p className='text-right opacity-75 italic'>{quote.author}</p>
        </div>
      ))}
    </div>
  );
};

export default InspirationQuotes;
