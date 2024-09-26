import { DB, Message, readDB, writeDB , Database } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  readDB();

  const roomId = request.nextUrl.searchParams.get('roomId');
  const room = (<Database>DB).rooms.find((room) => room.roomId === roomId);
  if (!room) {
    return NextResponse.json(
    {
     ok: false,
     message: `Room is not found`,
    },
     { status: 404 }
   );
 }

const message = (<Database>DB).messages.filter((message:Message) => message.roomId === roomId);

return NextResponse.json
 ({ 
  ok: true, 
  message
 });
}

export const POST = async (request: NextRequest) => {
  readDB();
 
  const body = await request.json();

  const { roomId, messageId:Message} = body;
  const room = (<Database>DB).rooms.find((r) => r.roomId === roomId);
  if (!room) {
   return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 }
  );
}

  const messageId = nanoid();
  (<Database>DB).messages.push({ messageId:Message, roomId:Message ,messageText:Message});

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId,
    message: "Message has been sent",
  });
};


export const DELETE = async (request: NextRequest) => {
  const payload = checkToken();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Invalid token",
  //   },
  //   { status: 401 }
  // );

  readDB();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Message is not found",
  //   },
  //   { status: 404 }
  // );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
