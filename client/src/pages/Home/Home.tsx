import { useQuery } from 'react-query';
import recordAPI from '../../api/record';
import Header from '../../components/Header';

const Home = () => {
  const { status, data, error } = useQuery('records', recordAPI.list);

  return (
    <div className="h-full bg-gray-100">
      <Header />
      {status === 'loading' && (
        <p>Loading...</p>
      )}
      {status === 'error' && (
        <p>Error: {(error as Error).message}</p>
      )}
      <div className="sm:px-6 my-6">
        <h1 className="text-lg font-medium">List of mind state records</h1>
      </div>
      <div className="sm:px-6">
        {data?.entities?.map((record) => (
          <div key={record.id} className="bg-white shadow sm:rounded-lg mb-3">
            <div className="sm:p-4 flex items-center justify-between">
              <div className="flex items-center">
                <p>{record.mood}</p>
                <p className="ml-3">{record.energy}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">{record.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
