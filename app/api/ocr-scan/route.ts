import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // TODO: Integrate Tesseract.js or Google Vision API for real OCR
    // For now return a mock result
    // const { data: { text } } = await Tesseract.recognize(buffer, 'ita+eng')

    const mockResult = {
      success: true,
      confidence: 0.85,
      extracted: {
        eventName: 'VASCO ROSSI',
        date: '15/07/2026',
        venue: 'STADIO SAN SIRO',
        section: 'SETTORE C6',
        row: 'FILA 2',
        seat: 'POSTO 10',
        price: '52.90',
        barcode: 'MOCK_BARCODE_123456',
      },
      rawText: 'Mock OCR text extraction — integrate Tesseract.js for real scanning',
    }

    return NextResponse.json(mockResult)
  } catch (err) {
    console.error('[ocr-scan]', err)
    return NextResponse.json({ error: 'OCR scan failed' }, { status: 500 })
  }
}
