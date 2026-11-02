const CONTRIBUTION_MATRIX: readonly (readonly number[])[] = [
  [3, 1, 3, 2, 1, 1, 3, 2, 2, 1, 2, 1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 2, 3, 1, 1, 3],
  [3, 1, 3, 3, 3, 1, 3, 2, 1, 1, 3, 3, 1, 3, 3, 1, 1, 3, 3, 1, 1, 2, 3, 3, 3, 2, 3],
  [3, 1, 1, 1, 3, 3, 2, 3, 3, 1, 3, 3, 1, 3, 1, 1, 1, 1, 3, 1, 3, 2, 3, 3, 1, 2, 3],
  [3, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 2, 1, 3, 1, 2, 1, 1, 1, 3, 0, 3],
  [3, 2, 3, 3, 1, 2, 2, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 2, 3, 3, 1, 2, 2, 1, 1, 2, 3],
  [3, 2, 3, 2, 1, 3, 1, 2, 1, 3, 2, 3, 3, 3, 1, 3, 3, 2, 1, 3, 2, 2, 1, 1, 2, 0, 3],
  [3, 2, 3, 2, 1, 2, 0, 1, 1, 2, 3, 3, 1, 1, 3, 1, 3, 3, 1, 2, 2, 3, 3, 3, 1, 2, 3],
];

const COLS = 27;
const SQUARE_SIZE = 14;
const STEP_X = (500 - SQUARE_SIZE) / (COLS - 1);
const STEP_Y = 18.69;

export function HabitCard() {
  return (
    <div className="relative flex aspect-square h-full flex-col justify-between overflow-hidden bg-primary text-white shadow-[0_1px_4px_rgba(23,22,15,0.08)] transition-colors duration-300 [container-type:inline-size] dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
      {/* Top-left title */}
      <div className="max-w-[85%] p-6 sm:p-7">
        <h3 className="text-[clamp(1.2rem,5.2cqw,1.65rem)] font-medium leading-[1.25] tracking-[-0.03em] text-white">
          Know your habits,
          <br />
          track milestone.
        </h3>
      </div>

      {/* Bottom GitHub contribution chart - squared shapes with lower opacity */}
      <div className="w-full pb-4 sm:pb-6">
        <svg
          viewBox="0 0 500 128"
          className="h-auto w-full overflow-hidden"
          aria-hidden="true"
        >
          {CONTRIBUTION_MATRIX.map((row, rIdx) =>
            row.map((level, cIdx) => {
              const x = cIdx * STEP_X;
              const y = rIdx * STEP_Y;
              const opacity =
                level === 3
                  ? 0.35
                  : level === 2
                    ? 0.20
                    : level === 1
                      ? 0.09
                      : 0.035;
              return (
                <rect
                  key={`${rIdx}-${cIdx}`}
                  x={x}
                  y={y}
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                  rx={2.5}
                  ry={2.5}
                  fill="white"
                  fillOpacity={opacity}
                />
              );
            }),
          )}
        </svg>
      </div>
    </div>
  );
}
