import { faLineChart } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CategoryScale, Chart, LinearScale, registerables } from 'chart.js';
Chart.register(CategoryScale, LinearScale, ...registerables);
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { IDetail } from '../types/detail';
import ViewList from '../components/Detail';
import Modal from '../components/Modal';
import Layout from '../components/Layout';

interface Data {
  [key: string]: {
    '1. open': string;
    [key: string]: string;
  };
}

const Detail = () => {
  const [overview, setOverview] = useState<IDetail>();
  const [dateList, setDateList] = useState<string[]>([]);
  const [highList, setHighList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { symbol } = router.query;
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchDetail = async (symbol: string) => {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const jsonData = await res.json();
    console.log(jsonData.Note);
    setOverview(jsonData);
  };

  const fetchDailyData = async () => {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`
    );
    const jsonData = await res.json();
    const datesData = Object.keys(jsonData['Time Series (Daily)']);
    const dailyDataArrs: Data = jsonData['Time Series (Daily)'];

    const highTemp: string[] = Object.values(dailyDataArrs).map(
      (item: { [key: string]: string }) => item['2. high']
    );
    setHighList(highTemp);
    setDateList(datesData);
  };

  useEffect(() => {
    fetchDetail(symbol as string);
  }, [symbol]);

  useEffect(() => {
    fetchDailyData();
  }, []);

  return (
    <Layout>
      {overview &&
        (overview.Note ? (
          <>
            <h1 className='mx-10 text-center text-white'>{overview.Note}</h1>
          </>
        ) : (
          <div className='relative m-auto rounded-lg bg-white p-6 shadow-lg  shadow-cyan-500/70 dark:bg-neutral-700 md:w-9/12'>
            <div className='mb-8 text-slate-800'>
              <span className=' pb-6 text-4xl font-medium'>
                {overview?.Name}
              </span>
              <p className='pt-6'>{overview?.Description}</p>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faLineChart}
                onClick={() => setShowModal(true)}
                className='absolute right-5 top-5 cursor-pointer rounded-md bg-cyan-500 p-[1.32rem] text-white shadow-lg shadow-cyan-500/50 focus:md:p-5'
              />
            </div>
            <div className='grid grid-cols-1 gap-6 shadow-zinc-200 md:grid-cols-2'>
              <ViewList title='Symbol' value={overview?.Symbol} />
              <ViewList title='Sector' value={overview?.Sector} />
              <ViewList title='Country' value={overview?.Country} />
              <ViewList title='Industry' value={overview?.Industry} />
              <ViewList
                title='52WeekHigh/Low'
                value={`${overview?.['52WeekHigh']}/${overview?.['52WeekLow']}${overview?.Currency}`}
              />
              <ViewList title='PEGRatio' value={overview?.PEGRatio} />
              <ViewList
                title='SharesOutstanding'
                value={overview?.SharesOutstanding}
              />
              <ViewList
                title='MarketCapitalization'
                value={overview?.MarketCapitalization}
              />
              <ViewList title='ForwardPE' value={overview?.ForwardPE} />
              <ViewList
                title='ExDividendDate'
                value={overview?.ExDividendDate}
              />
              <ViewList title='DividendDate' value={overview?.DividendDate} />
              <ViewList
                title='Address'
                addClass='ml-5'
                value={overview?.Address}
              />
            </div>
            {showModal && (
              <Modal
                onClose={handleCloseModal}
                labels={dateList}
                highList={highList}
              />
            )}
          </div>
        ))}
      <div className='absolute bottom-0 left-0 px-3 py-2 text-white'>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => router.back()}
          className='cursor-pointer rounded-full bg-cyan-500 p-[1.22rem] text-white shadow-lg shadow-cyan-500/50 focus:md:p-5'
        />
      </div>
    </Layout>
  );
};

export default Detail;
