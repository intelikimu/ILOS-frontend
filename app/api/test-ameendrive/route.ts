import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 AmeenDrive test endpoint called');
    
    // Get the base URL for the backend
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Test AmeenDrive applications specifically
    const response = await fetch(`${baseUrl}/api/applications/test/ameendrive`);
    
    if (!response.ok) {
      console.error('❌ AmeenDrive test failed:', response.status);
      return NextResponse.json({ 
        success: false, 
        error: `Backend responded with status: ${response.status}` 
      });
    }
    
    const data = await response.json();
    console.log('✅ AmeenDrive test success:', data);
    
    return NextResponse.json({
      success: true,
      message: 'AmeenDrive applications test successful',
      applicationsCount: data.totalRecords,
      applications: data.testQueryResult.slice(0, 2) // Show first 2 for debugging
    });
    
  } catch (error) {
    console.error('❌ AmeenDrive test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
} 