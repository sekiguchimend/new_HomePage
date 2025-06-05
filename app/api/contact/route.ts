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
    
    // ファイルパス（public/contactsディレクトリに保存）
    const contactsDir = path.join(process.cwd(), 'public', 'contacts');
    
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(contactsDir)) {
      fs.mkdirSync(contactsDir, { recursive: true });
    }
    
    // ファイル名（日付 + 時刻 + ID）
    const fileName = `contact_${new Date().toISOString().slice(0, 10)}_${Date.now()}.json`;
    const filePath = path.join(contactsDir, fileName);
    
    // JSONファイルとして保存
    fs.writeFileSync(filePath, JSON.stringify(contactData, null, 2));
    
    console.log('📧 新しいお問い合わせを受信:', contactData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'お問い合わせを受け付けました',
      id: contactData.id 
    });
    
  } catch (error) {
    console.error('お問い合わせの保存に失敗:', error);
    return NextResponse.json(
      { success: false, message: 'エラーが発生しました' },
      { status: 500 }
    );
  }
} 