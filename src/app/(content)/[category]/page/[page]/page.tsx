import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentView, { contentMetadata, parsePageParam } from "../../content";

// Cached and regenerated in the background; a failed refresh keeps the last good version.
export const revalidate = 1800;

// No paths at build time: each one is rendered on its first visit, then cached (ISR).
export async function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ category: string; page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, page } = await params;
  const n = parsePageParam(page);
  return n ? contentMetadata(category, n) : {};
}

export default async function PaginatedContentPage({ params }: Props) {
  const { category, page } = await params;
  const n = parsePageParam(page);
  if (!n) notFound();
  return <ContentView slug={category} page={n} />;
}
