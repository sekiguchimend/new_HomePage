import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // MicroCMSからのWebhookのシークレットキーをチェック（オプション）
    const webhookSecret = request.headers.get('x-microcms-signature');
    
    console.log('Webhook received:', body);
    
    // コンテンツタイプに応じてrevalidateするパスを決定
    const { api, id, type } = body;
    
    switch (api) {
      case 'news':
        await revalidatePath('/news');
        await revalidatePath('/');
        await revalidateTag('news');
        console.log('Revalidated news pages');
        break;
        
      case 'blogs':
        await revalidatePath('/blog');
        await revalidatePath('/');
        await revalidateTag('blog');
        console.log('Revalidated blog pages');
        break;
        
      case 'results':
        await revalidatePath('/results');
        await revalidatePath('/');
        await revalidateTag('results');
        console.log('Revalidated results pages');
        break;
        
      default:
        // 全ページをrevalidate
        await revalidatePath('/');
        console.log('Revalidated all pages');
    }
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      api,
      type 
    });
    
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 