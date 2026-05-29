import { NextResponse } from 'next/server';

export const errorResponse = (message, status = 400) => {
  return NextResponse.json({ message }, { status });
};

export const successResponse = (data, status = 200) => {
  return NextResponse.json(data, { status });
};
