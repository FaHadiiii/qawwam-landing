import { motion } from "motion/react";
import { useTheme } from "../lib/theme-context";
import { Icon } from "./Icon";

export function ThemeToggleCard() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative flex aspect-square h-full items-center justify-center bg-[#171717] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.4)] [container-type:inline-size]">
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        onClick={toggle}
        className={`relative flex h-8 w-14 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] ${
          isDark
            ? "justify-start border border-[#303030] bg-[#242424]"
            : "justify-end border border-[#383838] bg-[#2a2a2a]"
        }`}
      >
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 32,
          }}
          className={`flex h-6 w-6 items-center justify-center rounded-full shadow-sm ${
            isDark ? "bg-[#0c0c0c]" : "bg-white"
          }`}
        >
          {isDark ? (
            <Icon
              name="moon"
              className="h-3.5 w-3.5 text-[#F5D3A4]"
              fill="currentColor"
            />
          ) : (
            <Icon
              name="sun"
              className="h-3.5 w-3.5 text-amber-500"
            />
          )}
        </motion.div>
      </button>
    </div>
  );
}
