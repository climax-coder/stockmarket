import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import '@fortawesome/fontawesome-svg-core/styles.css';

import useDebounce from './hooks/useDebounce';

import HeaderComponent from './components/Header';
import Layout from './components/Layout';

export default function HomePage({ stockList }: { stockList: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const router = useRouter();

  const handleonChange = (e: string) => {
    setSearchTerm(e);
  };

  useEffect(() => {
    router.push(`/?symbol=${debouncedSearch}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Layout title='flex-col items-center justify-center text-center'>
      <HeaderComponent title='Stock Market' />
      <div className='relative mx-auto flex w-full justify-items-center text-center md:w-3/5'>
        <input
          placeholder='Type symbol ...'
          value={searchTerm}
          onChange={(e) => handleonChange(e.target.value)}
          className='w-full rounded-full border-r-8 border-r-black border-t-black p-3.5 pl-5 text-lg focus:outline-none'
        />
        <FontAwesomeIcon
          icon={faSearch}
          className='absolute bottom-0 right-0 rounded-full bg-cyan-500 p-[1.32rem] text-white shadow-lg shadow-cyan-500/50 focus:md:p-5'
        />
      </div>
      <div className='md:divide-y-5 mx-auto mt-5 flex w-full flex-col divide-y divide-gray-400 overflow-hidden rounded-md bg-gray-200 shadow-lg shadow-cyan-500/50 md:w-3/5'>
        {stockList &&
          stockList.map((stock, index) => (
            <Link href={`/detail/${stock['1. symbol']}`} key={index}>
              <div className='w-90 flex justify-between p-4 pl-10 pr-10 hover:bg-cyan-500  active:bg-cyan-700 '>
                <span>{stock['1. symbol']}</span>
                <span>
                  {stock['9. matchScore']}
                  {stock['8. currency']}
                </span>
              </div>
            </Link>
          ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const qeury = query.symbol || '';
  const response = await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${qeury}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  const stockList = data.bestMatches;

  if (!stockList) {
    return {
      props: {
        stockList: null,
      },
    };
  }

  return {
    props: {
      stockList,
    },
  };
}
