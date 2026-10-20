import type { Metadata } from "next";
import ContentView, { contentMetadata } from "./content";

// Cached and regenerated in the background; a failed refresh keeps the last good version.
export const revalidate = 1800;

// No paths at build time: each one is rendered on its first visit, then cached (ISR).
export async function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return contentMetadata((await params).category, 1);
}

export default async function ContentPage({ params }: Props) {
  return <ContentView slug={(await params).category} page={1} />;
}
