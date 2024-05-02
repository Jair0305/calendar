import React from 'react';
import Calendar from './components/Calendar';

const Page: React.FC = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
      <div>
        <Calendar month={month} year={year} />
      </div>
  );
};

export default Page;