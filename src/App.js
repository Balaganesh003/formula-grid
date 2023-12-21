import React from 'react';
import Grid from './components/Grid';

const Home = () => {
  return (
    <div className="min-h-screen min-w-screen  bg-custom-light text-custom-dark w-full h-full">
      <div className='p-5'>
        <h1 className="text-xl font-bold py-8 text-center">FormulaGrid</h1>
        <Grid />
      </div>
    </div>

  );
};

export default Home;
