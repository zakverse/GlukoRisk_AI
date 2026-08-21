import { NextRequest, NextResponse } from 'next/server';
import { ClinicalDataInput } from '@/types/screening';
import { calculateRiskPrediction } from '@/utils/calculator';

export async function POST(req: NextRequest) {
  try {
    const body: ClinicalDataInput = await req.json();

    // Check if external FastAPI Python server is available
    const FASTAPI_URL = process.env.FASTAPI_URL || 'http://127.0.0.1:8000/api/v1/predict';
    
    try {
      const externalRes = await fetch(FASTAPI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(1500) // Fast 1.5s fallback
      });

      if (externalRes.ok) {
        const pyData = await externalRes.json();
        return NextResponse.json(pyData);
      }
    } catch {
      // Python FastAPI backend not currently running -> Fallback to instant JS ML inference engine
    }

    // Process locally with BRFSS ML model weights
    const predictionResult = calculateRiskPrediction(body);
    return NextResponse.json(predictionResult);
  } catch (error) {
    console.error('Error processing prediction request:', error);
    return NextResponse.json(
      { error: 'Gagal memproses data skrining kesehatan.' },
      { status: 500 }
    );
  }
}
