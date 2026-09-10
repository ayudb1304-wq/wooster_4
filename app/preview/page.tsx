import { notFound } from "next/navigation";

// Dev-only helper: frames the landing page at phone width for visual checks
// when the browser window cannot be resized. Not available in production.
export default function Preview() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="flex min-h-svh items-start gap-8 bg-ink-deep p-8">
      <div>
        <p className="mb-2 text-small text-paper-muted">390 x 844</p>
        <iframe src="/" title="Phone preview" width={390} height={844} className="border border-paper-muted/30 bg-paper" />
      </div>
      <div>
        <p className="mb-2 text-small text-paper-muted">1024 x 700</p>
        <iframe src="/" title="Tablet preview" width={1024} height={700} className="border border-paper-muted/30 bg-paper" />
      </div>
    </div>
  );
}
