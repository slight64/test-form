import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  full?: boolean;
  label?: string;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, className = '', full = true, ...props },
  ref
) {

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-gray-900 flex flex-col items-start">
          <p>{label}</p>
          <input
            ref={ref}
            className={`${
              full ? 'w-full' : ''
            } flex-1 mt-1 p-2 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 ${className}`}
            {...props}
          />
        </label>
      )}
    </div>
  );
});
