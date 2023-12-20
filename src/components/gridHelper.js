export const evaluateFormula = (input) => {
  try {
    // Check if the input is a formula (starts with '=')
    if (input.startsWith('=')) {
      // Evaluate the formula
      // eslint-disable-next-line no-eval
      const result = eval(input.slice(1));
      return result.toString();
    }
  } catch (error) {
    console.error("Error evaluating formula:", error);
    return "Error";
  }
  return input;
};


export const saveState = (gridData) => {
  try {
    // Create a deep copy of the gridData that only includes serializable values
    const serializableGridData = gridData.map(row =>
      row.map(cell => {
        // Assuming cell is a string or a simple serializable object
        // Modify this according to your grid data structure
        return typeof cell === 'object' ? { ...cell } : cell;
      })
    );

    localStorage.setItem('gridState', JSON.stringify(serializableGridData));
  } catch (error) {
    console.error("Error saving state:", error);
    // Additional error handling as needed
  }
};



export const loadState = () => {
  const savedState = localStorage.getItem('gridState');
  return savedState ? JSON.parse(savedState) : null;
};
