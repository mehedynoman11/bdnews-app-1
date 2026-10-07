import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Topic = {
  id: string | number;
  name: string;
};

type Body = {
  url?: string;
  altText?: string;
  caption?: string;
  copyrightHolder?: string;
  width?: number;
  height?: number;
  text?: string;
  type?: string;
};

type NewsArticle = {
  title: string;
  source?: string;
  sourceUrl?: string;
  link?: string;
  firstPublished?: string;
  wordCount?: number;
  imageUrl?: string;
  text?: string;
  topics?: Topic[];
  body?: Body[];
  tags?: string[];
};

type Root = {
  data?: NewsArticle;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const readingTime = (words: number) => Math.max(1, Math.round(words / 200));

const renderBlock = (block: Body, i: number) => {
  // Image block
  if (block.url) {
    return (
      <figure key={i} className="my-8">
        <Image
          src={block.url}
          alt={block.altText || block.caption || 'News image'}
          width={block.width || 1200}
          height={block.height || 675}
          sizes="(min-width: 768px) 768px, 100vw"
          className="h-auto w-full rounded-xl"
        />
        {(block.caption || block.copyrightHolder) && (
          <figcaption className="mt-2 text-sm text-base-content/60">
            {block.caption}
            {block.copyrightHolder && (
              <span className="ml-1 opacity-70">({block.copyrightHolder})</span>
            )}
          </figcaption>
        )}
      </figure>
    );
  }

  // Text block
  if (block.text) {
    if (block.type?.toLowerCase().includes('heading')) {
      return (
        <h2 key={i} className="mb-3 mt-10 text-2xl font-bold">
          {block.text}
        </h2>
      );
    }
    return (
      <p key={i} className="mb-5 text-lg leading-8 text-base-content/90">
        {block.text}
      </p>
    );
  }

  return null;
};

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`
  );
  if (!res.ok) notFound();

  const json: Root = await res.json();
  const news = json.data;
  if (!news) notFound();

  // Skip body images that repeat the hero image
  const bodyBlocks = (news.body ?? []).filter(
    (b) => !(b.url && b.url === news.imageUrl)
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      {/* Back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-base-content/60 transition-colors hover:text-primary"
      >
        ← Back to news
      </Link>

      {/* Topics */}
      {news.topics && news.topics.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {news.topics.map((topic) => (
            <span
              key={topic.id}
              className="badge badge-primary badge-outline font-medium"
            >
              {topic.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
        {news.title}
      </h1>

      {/* Meta row */}
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-base-300 pb-5 text-sm text-base-content/60">
        {news.source && (
          <span className="font-semibold text-base-content/80">
            {news.source}
          </span>
        )}
        {news.firstPublished && (
          <time dateTime={news.firstPublished}>
            {formatDate(news.firstPublished)}
          </time>
        )}
        {typeof news.wordCount === 'number' && news.wordCount > 0 && (
          <span>{readingTime(news.wordCount)} min read</span>
        )}
      </div>

      {/* Hero image */}
      {news.imageUrl && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl shadow-md">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Article body */}
      <div className="mt-10">
        {bodyBlocks.length > 0 ? (
          bodyBlocks.map(renderBlock)
        ) : (
          <p className="whitespace-pre-line text-lg leading-8 text-base-content/90">
            {news.text}
          </p>
        )}
      </div>

      {/* Tags */}
      {(news.tags?.length ?? 0) > 0 && (
        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-base-300 pt-6">
          <span className="text-sm font-semibold text-base-content/60">
            Tags:
          </span>
          {(news.tags ?? []).map((tag) => (
            <span key={tag} className="badge badge-ghost">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Source card */}
      {news.sourceUrl && (
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-base-200 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-base-content/60">Originally published by</p>
            <p className="font-semibold">{news.source}</p>
          </div>
          <a
            href={news.link || news.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Read original ↗
          </a>
        </div>
      )}
    </article>
  );
};

export default NewsDetails;