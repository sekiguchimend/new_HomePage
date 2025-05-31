import { NextRequest, NextResponse } from 'next/server';
import { getNewsPosts } from '@/lib/microcms';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    
    const queries: any = {};
    if (limit) {
      queries.limit = parseInt(limit);
    }
    
    const response = await getNewsPosts(queries);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(
      { error: 'ニュースの取得に失敗しました' },
      { status: 500 }
    );
  }
} 