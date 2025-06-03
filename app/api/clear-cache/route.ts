import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // 認証（オプション）
    const authHeader = request.headers.get('authorization');
    const secret = process.env.REVALIDATE_SECRET || 'your-secret-key';
    
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // 全ページのキャッシュをクリア
    await revalidatePath('/', 'layout');
    
    return NextResponse.json({ 
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Cache clear error:', error);
    return NextResponse.json(
      { message: 'Error clearing cache', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 