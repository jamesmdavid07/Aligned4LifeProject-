import { mkdir, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import path from 'path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'No image file was provided.' },
        { status: 400 },
      );
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'Please upload a valid image file.' },
        { status: 400 },
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const extension = path.extname(file.name) || '.bin';
    const safeName = `${Date.now()}-${randomUUID()}${extension}`;
    const filePath = path.join(uploadDir, safeName);
    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully.',
      url: `/uploads/${safeName}`,
    });
  } catch (error) {
    console.error('Failed to upload image:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to upload image.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
