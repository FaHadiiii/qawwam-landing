import { useEffect, useMemo, useState } from "react";

export interface TocItem {
  id: string;
  text: string;
}

function useActiveHeading(ids: string[], offset: number) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const update = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= offset) current = id;
        else break;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, offset]);

  return activeId;
}

export function TableOfContents({
  items,
  offset = 112,
}: {
  items: TocItem[];
  offset?: number;
}) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveHeading(ids, offset);

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="text-[12px] font-medium text-ink-mute dark:text-dark-ink-mute">
        On this page
      </p>
      <ul className="mt-4 border-l border-border dark:border-dark-border">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13px] leading-5 transition-colors ${
                  active
                    ? "border-primary font-medium text-ink dark:text-dark-ink"
                    : "border-transparent text-ink-soft hover:border-border hover:text-ink dark:text-dark-ink-soft dark:hover:border-dark-border dark:hover:text-dark-ink"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}