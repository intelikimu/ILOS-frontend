import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { losId: string } }
) {
  try {
    const { losId } = params;
    
    console.log('🔄 Frontend API: Fetching form data for LOS ID:', losId);
    
    const response = await fetch(`http://localhost:5000/api/applications/form/${losId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('🔄 Frontend API: Backend response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Frontend API: Successfully fetched form data');
      return NextResponse.json(data);
    } else {
      const errorText = await response.text();
      console.error('❌ Frontend API: Backend error response:', errorText);
      console.error('❌ Frontend API: Response status:', response.status);
      
      return NextResponse.json(
        {
          error: 'Failed to fetch form data',
          details: errorText,
          status: response.status
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('❌ Frontend API: Exception caught:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 