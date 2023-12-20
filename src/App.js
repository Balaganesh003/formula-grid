import React from 'react';
import Grid from './components/Grid';

const Home = () => {
  return (
    <div className="container mx-auto p-4 max-w-[768px]">
      <h1 className="text-xl font-bold mb-4">FormulaGrid</h1>
      <Grid />
    </div>
  );
};

export default Home;
