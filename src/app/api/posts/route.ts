import { NextResponse } from 'next/server';
import { fetchPostsByCategory } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  if (!category) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }

  try {
    const posts = await fetchPostsByCategory(category, 6);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
