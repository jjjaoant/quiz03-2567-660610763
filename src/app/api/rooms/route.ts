import { DB, readDB, writeDB , Database, Room  } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@lib/DB";


export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms:(<Database>DB).rooms,
    totalRooms:(<Database>DB).rooms.length
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();



  if (!payload || (payload.role !== "ADMIN" && payload.role !== "SUPER_ADMIN")) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token ",
      },
      { status: 401 }
    );
  }


  readDB();

  const body = await request.json();
  const { roomName} = body;
  if ((<Database>DB).rooms.find( (room:Room) => room.roomName === roomName))
    return NextResponse.json(
        {
           ok: false,
           message: `Room ${"replace this with room name"} already exists`,
         },
         { status: 400 }
       );
  


  const roomId = nanoid();
  (<Database>DB).rooms.push({ roomId, roomName:roomId });

  //call writeDB after modifying Database
  writeDB();
   
  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
}
