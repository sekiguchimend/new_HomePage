import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // タイムスタンプを追加
    const contactData = {
      ...body,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    };
    
    // 本番環境とローカル環境の両方で動作するファイルパス設定
    // 本番環境では /tmp ディレクトリを使用（Vercelなどの場合）
    const isProduction = process.env.NODE_ENV === 'production';
    const contactsDir = isProduction 
      ? path.join('/tmp', 'contacts')
      : path.join(process.cwd(), 'public', 'contacts');
    
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(contactsDir)) {
      fs.mkdirSync(contactsDir, { recursive: true });
    }
    
    // ファイル名（日付 + 時刻 + ID）
    const fileName = `contact_${new Date().toISOString().slice(0, 10)}_${Date.now()}.json`;
    const filePath = path.join(contactsDir, fileName);
    
    // JSONファイルとして保存
    fs.writeFileSync(filePath, JSON.stringify(contactData, null, 2));
    
    // ログにも出力（本番環境でのデバッグ用）
    console.log('📧 新しいお問い合わせを受信:', {
      ...contactData,
      filePath: isProduction ? '[本番環境のため非表示]' : filePath
    });
    
    // 本番環境の場合は追加のログ出力
    if (isProduction) {
      console.log(`📁 ファイル保存先: ${fileName} (本番環境)`);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'お問い合わせを受け付けました',
      id: contactData.id 
    });
    
  } catch (error) {
    console.error('お問い合わせの保存に失敗:', error);
    
    // 本番環境でのエラーハンドリング強化
    if (process.env.NODE_ENV === 'production') {
      console.error('本番環境でのエラー詳細:', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString()
      });
    }
    
    return NextResponse.json(
      { success: false, message: 'エラーが発生しました' },
      { status: 500 }
    );
  }
} 