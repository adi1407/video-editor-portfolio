"use client";

export function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
      const shorts = parsed.pathname.match(/\/shorts\/([^/]+)/);
      if (shorts?.[1]) return `https://www.youtube.com/embed/${shorts[1]}?autoplay=1`;
      const embed = parsed.pathname.match(/\/embed\/([^/]+)/);
      if (embed?.[1]) return `https://www.youtube.com/embed/${embed[1]}?autoplay=1`;
    }

    if (host === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }

    if (host.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }

    return null;
  } catch {
    return null;
  }
}

type Props = {
  title: string;
  videoUrl: string;
  onClose: () => void;
};

export function WorkVideoModal({ title, videoUrl, onClose }: Props) {
  const embed = toEmbedUrl(videoUrl);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <h2 className="truncate font-display text-lg font-medium">{title}</h2>
          <div className="flex items-center gap-2">
            <a
              href={videoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-accent hover:underline"
            >
              Open link
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 text-sm text-muted hover:text-foreground"
            >
              Close
            </button>
          </div>
        </div>
        <div className="relative aspect-video w-full bg-black">
          {embed ? (
            <iframe
              src={embed}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="absolute inset-0 h-full w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}
