import { Fragment } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'wouter';
import dayjs from 'dayjs';
import recordAPI from '../../api/record';;
import MoodGrinIcon from '../../components/Icons/MoodGrin';
import EnergyIcon from '../../components/Icons/Energy';

const Home = () => {
  const { status, data, error } = useQuery('records', recordAPI.list);

  return (
    <Fragment>
      {status === 'loading' && (
        <p>Loading...</p>
      )}
      {status === 'error' && (
        <p>Error: {(error as Error).message}</p>
      )}
      <div className="sm:px-6 my-6">
        <h1 className="text-lg font-medium">Your state of mind changes with period of time</h1>
      </div>
      <div className="sm:px-6">
        {data?.entities?.map((record) => (
          <Link
            key={record.id}
            href={`/record/${record.id}`}
          >
            <a className="block bg-white shadow sm:rounded-lg mb-3">
              <div className="sm:p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex">
                    <p className="font-medium">Mood:</p>
                    <p className="ml-1">{record.mood}</p>
                    <MoodGrinIcon className="w-4 fill-yellow-500 ml-1" />
                  </div>
                  <div className="flex ml-3">
                    <p className="font-medium">Energy:</p>
                    <p className="ml-1">{record.energy}%</p>
                    <EnergyIcon className="w-4 fill-red-500 ml-1" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-400 p-2 rounded-md bg-gray-50">{dayjs(record.date).format('HH:MM - MMM DD, YYYY')}</p>
                </div>
              </div>
            </a>
          </Link>
        ))}
        {!data?.entities?.length && (
          <div  className="flex w-full justify-center items-center">
            <div>
              <p>There are no records</p>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
