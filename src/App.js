import './App.css';
import { useState, useTransition } from 'react';

const COLUMNS = 32;
const PLANE_SIZE = 65_536; // include 0
const PLANE_NAMES = [
  'Basic Multilingual Plane',
  'Supplementary Multilingual Plane',
  'Supplementary Ideographic Plane',
  'Tertiary Ideographic Plane',
  'unassigned',
  'unassigned',
  'unassigned',
  'unassigned',
  'unassigned',
  'unassigned',
  'unassigned',
  'unassigned',
  'unassigned',
  'unassigned',
  'Supplementary Special-purpose Plane',
  'Supplementary Private Use Area planes',
];

const keyLinks = [
  [
    { title: 'Arabic', link: 'U+0600' },
    { title: 'Han', link: 'U+4E00' },
    { title: 'surrogates', link: 'U+D800' },
    { title: 'Braille', link: 'U+2800' },
    { title: 'Misc Technical', link: 'U+237C' },
  ],
  [
    { title: 'Egyptian Hieroglyphs', link: 'U+13000' },
    { title: 'Linear A', link: 'U+10600' },
    { title: 'Emoji', link: 'U+1F300' },
  ],
];

function toCodepoint(number) {
  return `U+${number.toString(16).toUpperCase().padStart(4, '0')}`;
}

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

  const start = plane2 * PLANE_SIZE;
  const end = start + PLANE_SIZE - 1;

  const links = keyLinks[plane2];

  return (
    <>
      <div id="top">
        {Array.from({ length: 16 }, (_, i) => (
          <label>
            <input
              type="radio"
              checked={i === plane2}
              onChange={() => set(i)}
              key={i}
            />
            {i}
          </label>
        ))}
      </div>

      <h1>{PLANE_NAMES[plane2]}</h1>
      <p>
        from: {start.toLocaleString()} to: {end.toLocaleString()}
      </p>
      <p>
        from: {toCodepoint(start)} to: {toCodepoint(end)}
      </p>
      <p>{PLANE_SIZE.toLocaleString()} code points</p>

      <div className="key">
        <a href="#top">Top</a>
        {links?.map((link) => (
          <a href={`#${link.link}`}>{link.title}</a>
        ))}
      </div>
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <table>
          <tbody>
            {Array.from(
              { length: Math.ceil(PLANE_SIZE / COLUMNS) },
              (_, row) => (
                <tr>
                  {Array.from({ length: COLUMNS }, (_, column) => {
                    const codepoint =
                      PLANE_SIZE * plane + (COLUMNS * row + column);
                    return (
                      <td id={toCodepoint(codepoint)}>
                        {String.fromCodePoint(codepoint)}
                      </td>
                    );
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
