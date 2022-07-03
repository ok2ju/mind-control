import { ReactNode } from 'react';
import Header from '../components/Header';

type Props = {
  children: ReactNode,
};

const MainTemplate = ({ children }: Props) => (
  <div className="h-full bg-gray-100">
    <Header />
    {children}
  </div>
);

export default MainTemplate;
