import { Link } from 'wouter';

const NotFound = () => (
  <div className="bg-gray-100 h-full">
    <div className="h-full flex items-center justify-center">
      <div className="w-2/5">
        <h1 className="text-center text-9xl font-bold text-cyan-700">404</h1>
        <p className="text-center text-4xl font-light">Page not found!</p>
        <Link href="/home">
          <a className="block text-center mt-3 text-cyan-700">Back to home page</a>
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
