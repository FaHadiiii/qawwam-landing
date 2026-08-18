import { MockFrame } from "react-mockframe";
import "react-mockframe/styles/mockframe-iphones.css";
import { useTheme } from "../lib/theme-context";

const DEVICE_W = 375;
const DEVICE_H = 812;

/** iPhone device frame (react-mockframe) rendering an app screenshot. */
export function DeviceFrame({
  name,
  alt,
  width,
}: {
  name: string;
  alt: string;
  width: number;
}) {
  const { theme } = useTheme();
  const zoom = width / DEVICE_W;
  return (
    <div style={{ width, height: DEVICE_H * zoom }}>
      <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}>
        <MockFrame
          device="iPhone 17"
          color="black"
          hideNotch
          style={{ width: DEVICE_W, height: DEVICE_H }}
        >
          <img
            src={`/screenshot/${theme}/${name}.png`}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </MockFrame>
      </div>
    </div>
  );
}
