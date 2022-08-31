import './App.css';
import { useState, useTransition } from 'react';

const COLUMNS = 32;
const END = 65_536;

function App() {
  const [isPending, startTransition] = useTransition();
  const [plane, setPlane] = useState(0);
  const [plane2, setPlane2] = useState(0);

  const set = (number) => {
    setPlane2(number);
    startTransition(() => {
      setPlane(number);
    });
  };

  return (
    <>
      <p>Plane: {plane2}</p>
      <div>
        {Array.from({ length: 16 }, (_, i) => (
          <label>
            <input
              type="radio"
              checked={i == plane2}
              onChange={() => set(i)}
              key={i}
            />
            {i}
          </label>
        ))}
      </div>
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <table>
          <tbody>
            {Array.from({ length: Math.ceil(END / COLUMNS) }, (_, row) => (
              <tr>
                {Array.from({ length: COLUMNS }, (_, column) => {
                  const codepoint = END * plane + (COLUMNS * row + column);
                  return (
                    <td
                      data-tooltip={`U+${codepoint
                        .toString(16)
                        .toUpperCase()
                        .padStart(4, '0')}`}
                    >
                      {String.fromCodePoint(codepoint)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
