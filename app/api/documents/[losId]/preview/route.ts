import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { losId: string } }
) {
  try {
    const { losId } = params
    const { searchParams } = new URL(request.url)
    const applicationType = searchParams.get('applicationType')
    const filePath = searchParams.get('filePath')

    if (!filePath) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      )
    }

    console.log(`🔄 Frontend: Preview request for LOS-${losId}`)
    console.log(`🔄 Frontend: Application Type: ${applicationType}`)
    console.log(`🔄 Frontend: File Path: ${filePath}`)

    // Call the backend preview endpoint
    const endpoint = `http://localhost:8081/api/documents/${losId}/preview?applicationType=${applicationType}&filePath=${encodeURIComponent(filePath)}`
    
    console.log(`🔄 Frontend: Calling backend preview endpoint: ${endpoint}`)
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Frontend: Backend preview error:', errorText)
      return NextResponse.json(
        { error: 'Failed to fetch file preview' },
        { status: response.status }
      )
    }

    // Get the file content and headers from the backend
    const fileContent = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    const contentDisposition = response.headers.get('content-disposition')

    console.log('✅ Frontend: Successfully fetched file preview')
    console.log('✅ Frontend: Content-Type:', contentType)
    console.log('✅ Frontend: Content-Disposition:', contentDisposition)

    // Create response with proper headers for preview
    const headers = new Headers()
    headers.set('Content-Type', contentType)
    
    // Remove any download headers and set for inline display
    if (contentDisposition) {
      // Replace 'attachment' with 'inline' to display in browser
      const inlineDisposition = contentDisposition.replace('attachment', 'inline')
      headers.set('Content-Disposition', inlineDisposition)
    } else {
      // Set inline disposition if none exists
      headers.set('Content-Disposition', 'inline')
    }

    // Add CORS headers for cross-origin requests
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type')

    return new NextResponse(fileContent, {
      status: 200,
      headers: headers,
    })
  } catch (error) {
    console.error('❌ Frontend: Error fetching file preview:', error)
    return NextResponse.json(
      { error: 'Failed to connect to document server' },
      { status: 500 }
    )
  }
} 