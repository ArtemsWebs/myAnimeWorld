import { NextResponse } from 'next/server';

export const responseErrorHandler = (response: any) => {
  if ('httpCode' in response) {
    return NextResponse.json(
      {
        name: response.name,
        httpCode: response.httpCode,
        description: response.description,
      },
      { status: response.httpCode },
    );
  }
};
