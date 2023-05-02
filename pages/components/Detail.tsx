import React from 'react';

interface DetailComponentProp {
  title: string;
  value?: string;
  addClass?: string;
}

const DetailComponent: React.FC<DetailComponentProp> = ({
  title,
  value,
  addClass,
}) => {
  return (
    <div className='border-gray-350 flex justify-between border-b-2 pb-2'>
      <span className='font-bold'>{title}</span>
      <span className={`text-gray-400 ${addClass}`}>{value}</span>
    </div>
  );
};

export default DetailComponent;
