import { BarChart3, Heart, MessageCircle, Play, Repeat2 } from "lucide-react";
import type { Post } from "./data";
import { Scene } from "./scenes";

const avatarTone: Record<string, string> = {
  MC: "bg-[#3f4f46] text-[#f3efe4]",
  AO: "bg-[#6d4c3d] text-[#f6efe6]",
  LN: "bg-[#3d4a5c] text-[#f3efe4]",
  RD: "bg-[#5c5346] text-[#f6f1e6]",
};

type FeedProps = {
  posts: Post[];
  selectedId: string | null;
  reducedMotion: boolean;
  onSelect: (post: Post) => void;
};

export function Feed({ posts, selectedId, reducedMotion, onSelect }: FeedProps) {
  return (
    <main
      id="feed"
      className="min-w-0 flex-1 overflow-hidden bg-[#f7f4ee]"
    >
      <div className="mx-auto flex h-full w-full max-w-[680px] flex-col px-4">
        <div className="flex h-12 shrink-0 items-end border-b border-[#e6dfd2] pb-2">
          <h1 className="font-sans text-[15px] font-semibold tracking-tight text-balance">
            Home
          </h1>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex min-h-0 flex-1 gap-3 border-b border-[#e6dfd2] py-3"
            >
              <div
                className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-medium ${avatarTone[post.avatar]}`}
                aria-hidden="true"
              >
                {post.avatar}
              </div>
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="flex min-w-0 items-baseline gap-1 text-[13px]">
                  <span className="truncate font-semibold">{post.name}</span>
                  <span className="truncate text-[#6f675c]" translate="no">
                    @{post.handle}
                  </span>
                  <span className="text-[#6f675c]">·</span>
                  <span className="shrink-0 text-[#6f675c] tabular-nums">{post.time}</span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-[14px] leading-snug text-pretty">
                  {post.text}
                </p>
                {post.media ? (
                  <MediaButton
                    post={post}
                    selected={selectedId === post.id}
                    reducedMotion={reducedMotion}
                    onSelect={onSelect}
                  />
                ) : null}
                <div className="mt-1.5 flex max-w-md shrink-0 items-center justify-between text-[12px] text-[#6f675c] tabular-nums">
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="size-3.5" aria-hidden="true" />
                    {post.replies}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Repeat2 className="size-3.5" aria-hidden="true" />
                    {post.reposts}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Heart className="size-3.5" aria-hidden="true" />
                    {post.likes}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BarChart3 className="size-3.5" aria-hidden="true" />
                    {post.views}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

function MediaButton({
  post,
  selected,
  reducedMotion,
  onSelect,
}: {
  post: Post;
  selected: boolean;
  reducedMotion: boolean;
  onSelect: (post: Post) => void;
}) {
  const media = post.media!;
  const label =
    media.kind === "video"
      ? `Check this video from ${post.name}. ${media.alt}`
      : `Check this image from ${post.name}. ${media.alt}`;

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      onClick={() => onSelect(post)}
      className={`group relative mt-2 min-h-16 w-full flex-1 overflow-hidden rounded-2xl border text-left transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none ${
        selected
          ? "border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.28)]"
          : "border-[#e4ddd0] hover:border-blue-600"
      }`}
    >
      <Scene id={post.id} reducedMotion={reducedMotion} className="absolute inset-0" />
      {media.kind === "video" ? (
        <span className="pointer-events-none absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-[#1c1917]/80 px-2 py-0.5 text-[11px] font-medium text-[#f6f1e6] tabular-nums">
          <Play className="size-3 fill-current" aria-hidden="true" />
          {media.duration}
        </span>
      ) : null}
      <span className="pointer-events-none absolute top-2 right-2 rounded-full bg-blue-600 px-2 py-0.5 font-sans text-[10px] font-medium tracking-wide text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-aria-pressed:opacity-100">
        Check this
      </span>
    </button>
  );
}
