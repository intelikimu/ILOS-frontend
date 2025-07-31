import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 Frontend API: Fetching SPU applications...');
    
    // Fetch SPU applications from the backend
    const response = await fetch('http://192.168.1.170:5000/api/applications/spu', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('🔄 Frontend API: Backend response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Frontend API: Successfully fetched SPU applications:', data.length);
      
      return NextResponse.json(data);
    } else {
      const errorText = await response.text();
      console.error('❌ Frontend API: Backend error response:', errorText);
      console.error('❌ Frontend API: Response status:', response.status);
      
      return NextResponse.json(
        { 
          error: 'Failed to fetch SPU applications', 
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