import twClass from '@/lib/twClass';
import { FC } from 'react';

interface RadioButtonProps {
  value: boolean;
  onChange: (isOn: boolean) => void;
  id: string;
}

const RadioButton: FC<RadioButtonProps> = ({ value, onChange, id }) => {
  const handleChange = () => {
    onChange(!value);
  };

  return (
    <div
      className={twClass(
        'w-[72px] h-[40px] rounded-[68px] relative cursor-pointer transition',
        value == false ? 'bg-gray-700' : 'bg-gray-500'
      )}
      onClick={handleChange}
      id={id}>
      <div
        className={twClass(
          'w-[32px] h-[32px] rounded-[32px] absolute top-[4px] transition left-[4px]',
          value === false
            ? 'translate-x-[0px] bg-gray-600'
            : 'translate-x-[32px] bg-primary-500'
        )}></div>
    </div>
  );
};

export default RadioButton;
