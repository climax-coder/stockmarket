import Image from 'next/image';
import React, { ReactNode } from 'react';

interface LayoutProp {
  title?: string;
  children?: ReactNode;
}
const LayoutComponent: React.FC<LayoutProp> = (props) => {
  return (
    <main
      className={`relative flex min-h-screen w-full justify-center bg-slate-800 ${props.title}`}
    >
      <div className='absolute inset-0'>
        <Image
          src='/images/bg.jpg'
          alt='background image'
          className='opacity-[0.3]'
          fill
        />
      </div>
      <div className='relative z-10 flex min-h-screen w-full flex-col justify-center px-2 py-4 md:px-0'>
        {props.children}
      </div>
    </main>
  );
};

export default LayoutComponent;
