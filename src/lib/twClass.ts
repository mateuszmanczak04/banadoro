import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** A combination of clsx and tailwind-merge packages */
const twClass = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default twClass;
