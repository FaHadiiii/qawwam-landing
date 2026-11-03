import { isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import { TableOfContents } from "../components/TableOfContents";

interface DisclosurePageProps {
  title: string;
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return textFromChildren(children.props.children);
  }
  return "";
}

function tocFor(content: string) {
  return content
    .split("\n")
    .map((line) => line.match(/^##\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const text = match[1]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`]/g, "")
        .trim();
      return { id: slugify(text), text };
    });
}

export function DisclosurePage({ title, content }: DisclosurePageProps) {
  const toc = tocFor(content);

  return (
    <PageShell>
      <div className="pb-20 pt-24 sm:pb-24 sm:pt-28">
        <div className="mx-auto max-w-5xl px-5">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[13px] text-ink-soft dark:text-dark-ink-soft"
          >
            <Link
              to="/"
              className="transition-colors hover:text-ink dark:hover:text-dark-ink"
            >
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink dark:text-dark-ink">{title}</span>
          </nav>

          <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
            <div className="min-w-0 max-w-3xl">
              <header>
                <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.03em] text-ink dark:text-dark-ink">
                  {title}
                </h1>
              </header>

              <article className="prose-qawwam mt-10">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children, node: _node, ...props }) => (
                      <h2
                        id={slugify(textFromChildren(children))}
                        className="scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h2>
                    ),
                    a: ({ node: _node, ...props }) => {
                      const href = props.href ?? "";
                      // Map internal disclosure anchors to landing routes.
                      if (href.startsWith("#privacy-policy"))
                        return <Link to="/privacy">Privacy Policy</Link>;
                      if (href.startsWith("#terms-of-use"))
                        return <Link to="/terms">Terms of Use</Link>;
                      if (href.startsWith("#acknowledgement"))
                        return <Link to="/acknowledgement">Acknowledgement</Link>;
                      if (href.startsWith("#account-deletion"))
                        return <Link to="/account-deletion">Account Deletion</Link>;
                      if (href.startsWith("#")) return <a href={href} {...props} />;
                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        />
                      );
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>
            </div>

            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <TableOfContents items={toc} />
              </aside>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}