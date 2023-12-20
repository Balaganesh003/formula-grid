import React, { useState, useEffect, useRef } from 'react';
import Cell from './Cell';
import { evaluateFormula, saveState, loadState } from './gridHelper';

const initialGrid = () => {
  return Array.from({ length: 4 }, () => new Array(4).fill(""));
};

const Grid = () => {
  const [gridData, setGridData] = useState(() => {
    const savedState = loadState();
    return savedState || initialGrid();
  });

  const cellRefs = useRef([...Array(4)].map(() => Array(4).fill(null)));

  useEffect(() => {
  // Save a serializable version of the grid data
  const serializableDataToSave = gridData.map(row =>
    row.map(cell => {
      // Ensure each cell is serializable
      return typeof cell === 'object' ? serializeCell(cell) : cell;
    })
  );
  saveState(serializableDataToSave);
}, [gridData]);;

// Helper function to serialize a cell object
function serializeCell(cell) {
  // Check if cell is null or undefined
  if (cell === null || cell === undefined) {
    return ''; // or some default value you prefer
  }

  // Now handle the case where cell is an object
  // Ensure to return a serializable value
  return cell.value; // Modify this line according to your cell object structure
}


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
    newGrid[row][col] = value; // value should be a string
    return newGrid;
  });
};

  const handleBlur = (row, col) => {
  let cellValue = gridData[row][col];

  // Ensure cellValue is a string
  if (typeof cellValue !== 'string') {
    cellValue = String(cellValue);
  }

  if (cellValue.startsWith('=')) {
    const evaluatedValue = evaluateFormula(cellValue);
    updateCell(row, col, evaluatedValue);
  }
};


  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-4">
        {gridData.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              ref={el => cellRefs.current[rowIndex][colIndex] = el}
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onChange={(value) => updateCell(rowIndex, colIndex, value)}
              onBlur={() => handleBlur(rowIndex, colIndex)}
              onKeyDown={(e) => handleKeyPress(rowIndex, colIndex, e)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
