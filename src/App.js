import React from 'react';
import Grid from './components/Grid';

const Home = () => {
  return (
    <div className="container  bg-custom-light min-h-screen min-w-screen text-custom-dark w-full h-full">
      <div className='max-w-[768px] w-full mx-auto p-4'>
      <h1 className="text-xl font-bold mb-4 text-center">FormulaGrid</h1>
      <Grid />
      </div>
    </div>
  );
};

export default Home;
