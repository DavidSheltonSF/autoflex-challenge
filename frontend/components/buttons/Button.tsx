import { MouseEventHandler } from 'react';

interface Props {
  height?: string;
  width?: string;
  backgroundColor?: string;
  color?: string;
  label?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function Button(props: Props) {
  const {
    height = '50px',
    width = '100px',
    backgroundColor = 'inherit',
    color = 'inherit',
    label = 'Button',
    onClick,
  } = props;
  return (
    <button
      onClick={onClick}
      className="bg-gray-300 text-black  rounded-md hover:brightness-130 cursor-pointer"
      style={{
        height,
        width,
        backgroundColor,
        color,
      }}
    >
      {label}
    </button>
  );
}
