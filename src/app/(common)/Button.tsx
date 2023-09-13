import twClass from '@/lib/twClass';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';

const buttonVariants = cva(
  'px-4 py-1 rounded transition duration-100 flex items-center gap-1 justify-center min-h-[32px] border-2', // base
  {
    variants: {
      variant: {
        primary:
          'text-gray-900 bg-primary-500 hover:bg-primary-400 border-primary-400 hover:border-primary-200',
        secondary:
          'text-gray-100 bg-gray-700 hover:bg-gray-600 border-gray-700 hover:border-gray-500',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/** A reusable button component. */
const Button: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twClass(buttonVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
