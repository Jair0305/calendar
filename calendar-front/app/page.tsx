"use client";
import React from 'react';
import Calendar from './components/Calendar';
//import Navbar from './components/Navbar';

const Page: React.FC = () => {
  const date = new Date();
  const initialMonth = date.getMonth() + 1;
  const initialYear = date.getFullYear();

  return (
      <main className="">
          <Calendar initialMonth={initialMonth} initialYear={initialYear} />
      </main>
  );
};

export default Page;