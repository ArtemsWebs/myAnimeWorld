import { NextRequest, NextResponse } from 'next/server';
import { responseErrorHandler } from '@/app/lib/utils/ResponseErrorHandler';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, res: Response) {
  const cookiesStore = cookies();
  const allPermissions = await fetch(
    `${process.env.BACKEND_BASE_URL}/permission/allPermissions`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then(async (response) => await response.json())
    .catch((er) => er);

  if ('httpCode' in allPermissions) {
    responseErrorHandler(allPermissions);
  }

  return NextResponse.json({ allPermissions: allPermissions });
}

export async function POST(req: NextRequest, res: Response) {
  const body = await req.json();
  const createdPermission = await fetch(
    `${process.env.BACKEND_BASE_URL}/permission/createPermission`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
  return NextResponse.json(createdPermission);
}

export async function PUT(req: NextRequest, res: Response) {
  const permissionId = req.nextUrl.searchParams.get('permissionId');
  const body = await req.json();

  console.log(body);
  console.log(permissionId);

  const updatedPermission = await fetch(
    `${process.env.BACKEND_BASE_URL}/permission/changePermission/${permissionId}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
  if ('httpCode' in updatedPermission) {
    responseErrorHandler(updatedPermission);
  }
  return NextResponse.json(updatedPermission);
}

export async function DELETE(req: NextRequest, res: Response) {
  const searchParams = req.nextUrl.searchParams;
  const permissionId = searchParams.get('permissionId');
  const deletedPermession = await fetch(
    `${process.env.BACKEND_BASE_URL}/permission/deletePermission/${permissionId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
  if ('httpCode' in deletedPermession) {
    responseErrorHandler(deletedPermession);
  }
  return NextResponse.json(deletedPermession);
}
