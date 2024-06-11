import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, readFileSync } from 'fs'
import pathJoin from 'path'

export const POST = async (request: Request) => {
  const body = await request.formData()
  // save file in local file system
  const file = body.get('file')
  if (!file) {
    return NextResponse.json({ status: 'error', message: 'File not found' }, { status: 400 })
  }
  try {
    const content = Buffer.from(await (file as File).arrayBuffer());
    const fileName = (new Date().getTime() + (file as File).name).replace(/ /g, '_')
    let tempraryImageDirectory: string;
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
      tempraryImageDirectory = './public/uploads/';
    } else {
      tempraryImageDirectory = '/tmp/';
    }
    writeFileSync(pathJoin.join(tempraryImageDirectory, fileName), content)
    // return file url if development
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
      return NextResponse.json({ status: 'success', fileUrl: 'http://localhost:3000/api/job/?file=' + fileName }, { status: 200 })
    }
    return NextResponse.json({ status: 'success', fileUrl: (process.env.BACKEND_URL || '') + '/api/job/?file=' + fileName }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error }, { status: 500 })
  }
}

export const GET = async (request: NextRequest) => {
  const file = request.nextUrl.searchParams.get('file') || ''
  let tempraryImageDirectory: string;
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    tempraryImageDirectory = './public/uploads/';
  } else {
    tempraryImageDirectory = '/tmp/';
  }
  const savedfile = readFileSync(pathJoin.join(tempraryImageDirectory, file))
  const fileContentType = file.split('.').pop() as 'pdf' | 'docx' | 'doc'
  return new NextResponse(
    savedfile,
    {
      headers: {
        'Content-Type': fileContentType === 'pdf' ? 'application/pdf' : 'application/msword',
      },
    }
  )
}
