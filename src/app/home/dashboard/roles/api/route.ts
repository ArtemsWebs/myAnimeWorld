import { NextApiRequest } from 'next';
import { cookies } from 'next/headers';
import { responseErrorHandler } from '@/app/lib/utils/ResponseErrorHandler';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(req: NextApiRequest, res: Response) {
  const cookiesStore = cookies();
  const allUsers = await fetch(
    `${process.env.BACKEND_BASE_URL}/roles/allRoles`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then(async (response) => await response.json())
    .catch((er) => er);

  if ('httpCode' in allUsers) {
    responseErrorHandler(allUsers);
  }

  return NextResponse.json({
    allUsers: allUsers,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const resp = await fetch(`${process.env.BACKEND_BASE_URL}/roles/createRole`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // Indicates the content
    },
    method: 'POST',
    body: JSON.stringify(body),
  });
  return NextResponse.json(resp);
}

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const roleId = searchParams.get('roleId');
  const body = await req.json();
  const resp = await fetch(
    `${process.env.BACKEND_BASE_URL}/roles/changeRolePermission/${roleId}`,
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8', // Indicates the content
      },
      method: 'PUT',
      body: JSON.stringify(body),
    },
  );
  return NextResponse.json(resp);
}
export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const roleId = searchParams.get('roleId');
  const resp = await fetch(
    `${process.env.BACKEND_BASE_URL}/roles/deleteRole/${roleId}`,
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8', // Indicates the content
      },
      method: 'DELETE',
    },
  );
  return NextResponse.json(resp);
}
