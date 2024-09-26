import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Thanchanok Naensin",
    studentId: "660610763",
  });
};
