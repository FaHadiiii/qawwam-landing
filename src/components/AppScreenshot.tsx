import { useTheme } from "../lib/theme-context";

interface AppScreenshotProps {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function AppScreenshot({
  name,
  alt,
  className,
  priority = false,
}: AppScreenshotProps) {
  const { theme } = useTheme();

  return (
    <img
      src={`/screenshot/${theme}/${name}.png`}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={`aspect-[1320/2868] w-full rounded-md border border-border bg-secondary object-cover dark:border-dark-border dark:bg-dark-secondary ${
        className ?? ""
      }`}
    />
  );
}
