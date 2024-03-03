import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


// Example initial grid setup (you will need to adjust this based on your puzzle)
const initialGrid = [
  // Each sub-array represents a row
  [{ active: false }, { active: false }, { active: true, letter: '', hintNumber: 1, correctAnswer: 'C'}, { active: false }, { active: false }, { active: false }, { active: false },],
  [{ active: false }, { active: false }, { active: true, letter: '', correctAnswer: 'I'}, { active: false }, { active: true, letter: '', hintNumber: 2, correctAnswer: 'A'}, { active: false }, { active: false },],
  [{ active: false }, { active: false }, { active: true, letter: '', hintNumber: 3, correctAnswer: 'L' }, { active: true, letter: '', correctAnswer: 'U' }, { active: true, letter: '' , correctAnswer: 'N'}, { active: true, letter: '', correctAnswer: 'G' }, { active: true, letter: '', correctAnswer: 'S' },],
  [ { active: false }, { active: false }, { active: true, letter: '' , correctAnswer: 'I'}, { active: false }, { active: true, letter: '' , correctAnswer: 'A'},  { active: false }, { active: false },],
  [{ active: true, letter: '', hintNumber: 4, correctAnswer: 'H' }, { active: true, letter: '', correctAnswer: 'E'}, { active: true, letter: '', correctAnswer: 'A' }, { active: true, letter: '', correctAnswer: 'R' }, { active: true, letter: '', correctAnswer: 'T' }, { active: false }, { active: false },,],
  [{ active: false }, { active: false }, { active: false }, { active: false }, { active: true, letter: '', correctAnswer: 'O'}, { active: false }, { active: false },],
  [{ active: false }, { active: false }, { active: false }, { active: false }, { active: true, letter: '', correctAnswer: 'M' }, { active: false }, { active: false },],
  [{ active: false }, { active: false }, { active: false }, { active: false }, { active: true, letter: '', correctAnswer: 'Y'}, { active: false }, { active: false },],
];

const Crossword = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [timer, setTimer] = useState(0);
  const [activeCell, setActiveCell] = useState({ row: 0, col: 2});
  const [isTimerActive, setIsTimerActive] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

      e.preventDefault(); // Prevent scrolling
      let { row, col } = activeCell;

      const getNextActiveCell = (row, col, direction) => {
        let nextRow = row,
            nextCol = col;

        do {
          switch (direction) {
            case 'ArrowUp': nextRow--; break;
            case 'ArrowDown': nextRow++; break;
            case 'ArrowLeft': nextCol--; break;
            case 'ArrowRight': nextCol++; break;
            default: break;
          }

          // Boundary conditions
          if (nextRow < 0 || nextRow >= grid.length || nextCol < 0 || nextCol >= grid[0].length) return null;

        } while (!grid[nextRow][nextCol].active);

        return { row: nextRow, col: nextCol };
      };

      const nextActiveCell = getNextActiveCell(row, col, e.key);
      if (nextActiveCell) {
        setActiveCell(nextActiveCell);
        // Optional: focus the input of the next active cell
        document.querySelector(`input[data-row="${nextActiveCell.row}"][data-col="${nextActiveCell.col}"]`)?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCell, grid]);


  const handleInputChange = (row, col, value) => {
    if (!grid[row][col].active) return; // Ignore changes for inactive cells
    
    // Check if the input is a backspace/delete action
    const isDeletion = value === '';
  
    const updatedGrid = grid.map((gridRow, rowIndex) =>
    rowIndex === row
      ? gridRow.map((cell, cellIndex) =>
          cellIndex === col ? { ...cell, letter: isDeletion ? '' : value.trim().toUpperCase() } : cell
        )
      : gridRow
  );
  
    setGrid(updatedGrid);
  };
  
  const checkPuzzle = () => {
    let isCorrect = true;
    let incorrectCells = [];

    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.active && cell.letter !== cell.correctAnswer) {
          isCorrect = false;
          incorrectCells.push({
            row: rowIndex + 1,
            col: colIndex + 1,
            userAnswer: cell.letter,
            correctAnswer: cell.correctAnswer
          });
        }
      });
    });

    if (isCorrect) {
      router.push('/winner'); // This will navigate to the /winner page
    } else {
      const detailedMessage = incorrectCells.map(cellInfo =>
        `Cell at row ${cellInfo.row}, column ${cellInfo.col} is incorrect.`
      ).join('\n');

      alert(`Some answers are incorrect. Please review the following:\n${detailedMessage}`);
    }
  };
  
  
  

  const handleCellFocus = (row, col) => {
    if (!grid[row][col].active) return; // Ignore focus for inactive cells
    setActiveCell({ row, col });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="crossword-container">
    <div className="timer">Timer: {formatTime(timer)}</div>
      <div className="clues-container">
        <div className="clues-down">
          <h3>Down</h3>
          <div className={`clue ${activeCell.col === 2 ? 'active' : ''}`}>1. Hairlike projections for movement of substances over the cell surface</div>
          <div className={`clue ${activeCell.col === 4 ? 'active' : ''}`}>2. Study of the structure and shape of body parts</div>
        </div>
        <div className="clues-across">
          <h3>Across</h3>
          <div className={`clue ${activeCell.row === 2 ? 'active' : ''}`}>3. Organ in the pleural cavity</div>
          <div className={`clue ${activeCell.row === 4 ? 'active' : ''}`}>4. Organ in the pericardial cavity</div>
        </div>
      </div>
      <div className="crossword">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="crossword-row">
            {row.map((cell, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className={`crossword-cell-container ${cell.active ? '' : 'inactive'}`}>
                <input
                  type="text"
                  maxLength="1"
                  value={cell.letter || ''}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                  onFocus={() => handleCellFocus(rowIndex, colIndex)}
                  className={`crossword-cell ${cell.active ? '' : 'inactive'} ${activeCell.row === rowIndex && activeCell.col === colIndex ? 'active' : ''}`}
                  disabled={!cell.active}
                  data-row={rowIndex} // Added for focusing
                  data-col={colIndex} // Added for focusing
                />
                {cell.hintNumber && <span className="cell-number">{cell.hintNumber}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='submit-button-container'>
      <button onClick={checkPuzzle} className="submit-button">
        Submit Puzzle
      </button>
      </div>
    </div>
    
  );
};

export default Crossword;
