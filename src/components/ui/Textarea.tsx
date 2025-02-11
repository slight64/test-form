import { useRef, TextareaHTMLAttributes, useEffect } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({
  label,
  className = '',
  ...props
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };
  useEffect(() => {
    adjustHeight();
  }, [props.value]);

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-gray-900 flex flex-col items-start">
          <p>{label}</p>
          <textarea
            ref={textareaRef}
            className={`mt-1 p-2 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 ${className}`}
            {...props}
          />
        </label>
      )}
    </div>
  );
}
