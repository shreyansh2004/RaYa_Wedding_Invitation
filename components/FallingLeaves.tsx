export function FallingLeaves() {
  return (
    <div className="falling-leaves" aria-hidden="true">
      {Array.from({ length: 7 }, (_, index) => (
        <svg className="falling-leaf" viewBox="0 0 32 32" key={index}>
          <path
            d="M5 26C5 13 12 5 27 4 26 18 19 26 5 26Z"
            fill="currentColor"
            fillOpacity=".38"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path d="M6 26 23 9" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}
