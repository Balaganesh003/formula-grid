const initialGrid = () => {
  return Array.from({ length: 4 }, () => new Array(4).fill(''));
};


export const evaluateFormula = (input) => {
  try {
    if (input.startsWith('=')) {
      const formula = input.slice(1).trim();

      if (formula && !/[=+\-*/]$/.test(formula)) {
        // eslint-disable-next-line no-eval
        const result = eval(formula);
        return result.toString();
      } else {

        return input;
      }
    }
  } catch (error) {
    console.error("Error evaluating formula:", error);
    return "Error";
  }
  return input;
};




export const saveState = (gridData) => {
  try {
    const serializedData = JSON.stringify(gridData);
    localStorage.setItem('gridState', serializedData);
  } catch (error) {
    console.error("Error saving state:", error);
  }
};

export const loadState = (key = 'gridState') => {
  try {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : initialGrid();
  } catch (error) {
    console.error("Error loading state:", error);
    return initialGrid();
  }
};




export const saveStateToHistory = (gridData, rowIndex, colIndex, initialState, finalState) => {
  try {
    let currentHistory = loadState('gridHistory');
    if (!currentHistory) {
      currentHistory = gridData.map(row => row.map(() => []));
    }

    if (!Array.isArray(currentHistory[rowIndex][colIndex])) {
      currentHistory[rowIndex][colIndex] = [];
    }

    const cellHistory = currentHistory[rowIndex][colIndex];
    if (cellHistory.length === 0 || cellHistory[cellHistory.length - 1] !== initialState) {
      cellHistory.push(initialState);
    }

    cellHistory.push(finalState);

    localStorage.setItem('gridHistory', JSON.stringify(currentHistory));
  } catch (error) {
    console.error("Error saving state to history:", error);
  }
};
