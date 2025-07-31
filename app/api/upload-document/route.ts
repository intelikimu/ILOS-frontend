import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Upload API: Starting upload process...');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const loanType = formData.get('loanType') as string;
    const losId = formData.get('losId') as string;

    console.log('🔄 Upload API: Received data:', {
      fileName: file?.name,
      fileSize: file?.size,
      loanType,
      losId
    });

    if (!file || !loanType || !losId) {
      console.error('❌ Upload API: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: file, loanType, or losId' },
        { status: 400 }
      );
    }

    // Create new FormData for the upload server
    const uploadFormData = new FormData();
    
    // Handle the file properly - convert to Blob if needed
    if (file instanceof File) {
      uploadFormData.append('file', file);
    } else {
      // If it's not a File object, try to convert it
      const fileData = file as any;
      const blob = new Blob([fileData], { type: fileData.type || 'application/octet-stream' });
      uploadFormData.append('file', blob, fileData.name || 'file');
    }
    
    uploadFormData.append('loanType', loanType);
    uploadFormData.append('losId', losId);

    console.log('🔄 Upload API: Sending to upload server...');
    
    // Upload to the uploadtoftp.js server
    const response = await fetch('http://localhost:8081/upload', {
      method: 'POST',
      body: uploadFormData,
      // Don't set Content-Type header - let the browser set it with the boundary
    });

    console.log('🔄 Upload API: Response status:', response.status);
    console.log('🔄 Upload API: Response headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const responseText = await response.text();
      console.log('✅ Upload API: Success response:', responseText);
      
      return NextResponse.json({
        success: true,
        message: `File ${file.name} uploaded successfully`,
        fileName: file.name,
        fileSize: file.size,
        loanType,
        losId,
      });
    } else {
      const errorText = await response.text();
      console.error('❌ Upload API: Server error response:', errorText);
      console.error('❌ Upload API: Response status:', response.status);
      
      return NextResponse.json(
        { 
          error: 'Upload failed', 
          details: errorText,
          status: response.status 
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('❌ Upload API: Exception caught:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 