"use client";

import { useRef, useState, useTransition } from "react";
import { uploadAdminMediaAction } from "@/features/admin/actions";
import { buttonClassName, Input } from "@/components/ui";

type MediaKind = "cover" | "video";

type Props = {
  label: string;
  kind: MediaKind;
  value: string;
  onChange: (url: string) => void;
  urlPlaceholder?: string;
  disabled?: boolean;
};

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url) || url.includes("/videos/");
}

export function MediaField({
  label,
  kind,
  value,
  onChange,
  urlPlaceholder,
  disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const accept =
    kind === "cover"
      ? "image/jpeg,image/png,image/webp"
      : "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov";

  function handleUpload(file: File | null) {
    if (!file || disabled) return;

    setUploadError(null);
    const formData = new FormData();
    formData.set("kind", kind);
    formData.set("file", file);

    startTransition(async () => {
      const result = await uploadAdminMediaAction(formData);
      if (!result.ok) {
        setUploadError(result.error);
        return;
      }
      onChange(result.publicUrl);
    });
  }

  const showVideoPreview =
    kind === "video" && value && (isVideoUrl(value) || value.startsWith("http"));

  return (
    <div className="flex flex-col gap-2 sm:col-span-2">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            disabled={disabled || pending}
            onChange={(e) => {
              handleUpload(e.target.files?.[0] ?? null);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            disabled={disabled || pending}
            onClick={() => inputRef.current?.click()}
            className={buttonClassName({ variant: "outline", size: "sm" })}
          >
            {pending ? "Uploading…" : "Upload file"}
          </button>
        </div>
      </div>

      <Input
        label="Or paste URL"
        value={value}
        onChange={(e) => {
          setUploadError(null);
          onChange(e.target.value);
        }}
        placeholder={
          urlPlaceholder ??
          (kind === "cover"
            ? "https://…/cover.jpg or /work/p-01.jpg"
            : "YouTube / Vimeo / direct MP4 URL")
        }
        disabled={disabled || pending}
      />

      {uploadError ? (
        <p className="text-sm text-danger">{uploadError}</p>
      ) : null}

      {value ? (
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          {kind === "cover" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt=""
              className="aspect-[4/5] max-h-48 w-full object-cover"
            />
          ) : showVideoPreview ? (
            <video
              src={value}
              controls
              preload="metadata"
              className="aspect-video max-h-48 w-full bg-black object-contain"
            />
          ) : (
            <p className="truncate px-3 py-2 text-xs text-muted">{value}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
