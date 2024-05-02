"use client";
import React from 'react';
import Calendar from './components/Calendar';

const Page: React.FC = () => {
  const date = new Date();
  const initialMonth = date.getMonth() + 1;
  const initialYear = date.getFullYear();

  return (
      <main className="">
          <div className="">
              <Calendar initialMonth={initialMonth} initialYear={initialYear} />
          </div>
      </main>
  );
};

export default Page;