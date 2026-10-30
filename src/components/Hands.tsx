import type { SVGProps } from "react";

export function LeftHand(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 109 117"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M76.4014 84.1523C76.4723 84.1523 77.5816 84.2009 79.8256 84.4236C82.2338 84.8957 87.5028 87.2343 95.0929 91.7383C98.6884 94.2108 101.764 97.063 105.155 100.487" />
        <path d="M78.5939 86.9542C78.5939 86.8781 78.5597 90.6824 77.9926 98.7823C77.4596 103.039 76.4288 107.591 75.4986 110.286C74.5683 112.98 73.77 113.679 72.7285 113.591" />
        <path d="M3.00098 3C4.45331 3.61988 18.7987 14.7253 39.0985 32.4103C54.0657 46.7888 62.8058 56.7216 68.2301 65.3185C71.162 70.4631 74.458 77.1956 77.2371 84.0326" />
      </g>
    </svg>
  );
}

export function RightHand(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 98" fill="none" aria-hidden="true" {...props}>
      <g
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M92.1989 3C90.3978 3.80758 75.6871 14.7206 55.8061 36.2595C50.0104 44.3283 42.6279 55.9877 38.6193 62.5757C34.6107 69.1638 34.1997 70.3272 32.3994 73.3564" />
        <path d="M32.3994 73.3574H27.931C23.6885 73.3574 15.3199 73.3574 10.5144 73.6489C5.70887 73.9405 4.72007 74.5235 3.00098 75.2674" />
        <path d="M32.2443 74.9434C32.2836 74.9434 32.323 74.9434 32.1858 75.8028C32.0485 76.6623 31.7333 78.3812 31.049 81.3184C30.3647 84.2557 29.3207 88.3593 28.0303 94.6723" />
      </g>
    </svg>
  );
}
