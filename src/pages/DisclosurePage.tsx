import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";

interface DisclosurePageProps {
  title: string;
  content: string;
  updatedAt: string;
  version: string;
}

export function DisclosurePage({
  title,
  content,
  updatedAt,
  version,
}: DisclosurePageProps) {
  return (
    <PageShell>
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-5">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-ink-soft dark:text-dark-ink-soft">
            <Link to="/" className="transition hover:text-primary">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="font-medium text-ink dark:text-dark-ink">
              {title}
            </span>
          </nav>

          {/* Header */}
          <header className="mt-8 border-b border-border pb-8 dark:border-dark-border">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {title}
                </h1>
                <p className="mt-2 text-sm text-ink-soft dark:text-dark-ink-soft">
                  Version {version} · Effective {updatedAt}
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                Last updated {updatedAt}
              </span>
            </div>
          </header>

          {/* Body */}
          <article className="prose-qawwam mt-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node: _node, ...props }) => {
                  const href = props.href ?? "";
                  // Map internal disclosure anchors to landing routes.
                  if (href.startsWith("#privacy-policy"))
                    return <Link to="/privacy">Privacy Policy</Link>;
                  if (href.startsWith("#terms-of-use"))
                    return <Link to="/terms">Terms of Use</Link>;
                  if (href.startsWith("#acknowledgement"))
                    return <Link to="/acknowledgement">Acknowledgement</Link>;
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

          <div className="mt-16 flex justify-center">
            <Link
              to="/"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(41,101,228,0.35)] transition hover:bg-primary/90"
            >
              ← Back to Qawwam
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
