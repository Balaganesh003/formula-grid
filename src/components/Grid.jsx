import React, { useState, useEffect, useRef } from 'react';
import Cell from './Cell';
import { evaluateFormula, saveState, loadState, saveStateToHistory } from '../utils/gridHelper';

const initialGrid = () => {
  return Array.from({ length: 4 }, () => new Array(4).fill(''));
};

const Grid = () => {
  const [gridData, setGridData] = useState(() => {
    const savedState = loadState();
    return savedState || initialGrid();
  });

  const cellRefs = useRef([...Array(4)].map(() => Array(4).fill(null)));
  const initialCellState = useRef([...Array(4)].map(() => Array(4).fill("")));

  useEffect(() => {
    const serializableDataToSave = gridData.map(row =>
      row.map(cell => {
        return typeof cell === 'object' ? serializeCell(cell) : cell;
      })
    );
    saveState(serializableDataToSave);
  }, [gridData]);

  const handleFocus = (row, col) => {
    initialCellState.current[row][col] = gridData[row][col];
  };

  const handleBlur = (row, col) => {
    const finalValue = gridData[row][col];
    const evaluatedValue = evaluateFormula(finalValue);


    setGridData(prevGrid => {
      const newGrid = prevGrid.map(innerRow => [...innerRow]);
      newGrid[row][col] = evaluatedValue;
      return newGrid;
    });


    const initialState = initialCellState.current[row][col];
    if (initialState !== evaluatedValue) {
      saveStateToHistory(gridData, row, col, initialState, evaluatedValue);
      saveState(gridData);
    }
  };

  const handleKeyPress = (row, col, e) => {
    let newRow = row;
    let newCol = col;
    if (e.key === "ArrowRight") {
      newCol = (col + 1) % 4;
    } else if (e.key === "ArrowLeft") {
      newCol = (col - 1 + 4) % 4;
    } else if (e.key === "ArrowDown") {
      newRow = (row + 1) % 4;
    } else if (e.key === "ArrowUp") {
      newRow = (row - 1 + 4) % 4;
    }
    cellRefs.current[newRow][newCol].focus();
  };

  const updateCell = (row, col, value) => {
    setGridData(prevGrid => {
      const newGrid = prevGrid.map(innerRow => [...innerRow]);
      newGrid[row][col] = value;
      return newGrid;
    });
  };

  const revertCellToSavedState = (rowIndex, colIndex) => {
    const historyState = loadState('gridHistory');
    if (historyState && historyState[rowIndex] && historyState[rowIndex][colIndex]) {
      const cellHistory = historyState[rowIndex][colIndex];
      if (cellHistory.length > 1) {
        cellHistory.pop();
        const previousState = cellHistory[cellHistory.length - 1];
        updateCell(rowIndex, colIndex, previousState);
      } else if (cellHistory.length === 1) {
        updateCell(rowIndex, colIndex, '');
      }
    }
  };

  function serializeCell(cell) {
    if (cell === null || cell === undefined) {
      return '';
    }
    return typeof cell === 'object' ? cell.value : cell;
  }

  return (
     <div className="max-w-[990px] mx-auto h-fit flex justify-center">
    <div className="grid w-fit grid-cols-1 mobile-md:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-x-4">
      {gridData.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            ref={el => cellRefs.current[rowIndex][colIndex] = el}
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onChange={(value) => updateCell(rowIndex, colIndex, value)}
            onFocus={() => handleFocus(rowIndex, colIndex)}
            onBlur={() => handleBlur(rowIndex, colIndex)}
            onKeyDown={(e) => handleKeyPress(rowIndex, colIndex, e)}
            onRevert={() => revertCellToSavedState(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  </div>
  );
};

export default Grid;
