import { CategoryScale, Chart, LinearScale, registerables } from 'chart.js';
import React from 'react';
Chart.register(CategoryScale, LinearScale, ...registerables);
import * as ChartView from 'react-chartjs-2';

interface ModalProps {
  onClose: () => void;
  labels: string[];
  highList: string[];
}
const Modal: React.FC<ModalProps> = ({ onClose, labels, highList }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'High',
        data: highList,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
        <div className='relative mx-auto my-12 w-10/12 max-w-4xl'>
          <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
            <div className='flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5'>
              <h3 className='text-green text-3xl font-semibold'>Chart Log</h3>
              <button
                className='float-right ml-auto border-0 bg-black p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none'
                onClick={onClose}
              >
                <span className='block h-6 w-6 text-2xl leading-6 text-white outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            <div className='relative flex-auto p-6'>
              <div className='my-auto h-fit w-full rounded-xl  border border-gray-100 pt-0  shadow-xl'>
                <ChartView.Line
                  data={data}
                  width={400}
                  height={200}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
            <div className='flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6'>
              <button
                className='text mb-1 mr-1 rounded bg-cyan-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600'
                type='button'
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
    </>
  );
};

export default Modal;
