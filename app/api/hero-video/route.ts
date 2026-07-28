import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const rootFilePath = path.join(process.cwd(), "202607280250.mp4");
  const publicDir = path.join(process.cwd(), "public", "videos");
  const publicFilePath = path.join(publicDir, "202607280250.mp4");

  try {
    if (fs.existsSync(rootFilePath)) {
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      const rootStat = fs.statSync(rootFilePath);
      const shouldCopy =
        !fs.existsSync(publicFilePath) ||
        fs.statSync(publicFilePath).size !== rootStat.size ||
        fs.statSync(publicFilePath).mtimeMs < rootStat.mtimeMs;
      if (shouldCopy) {
        fs.copyFileSync(rootFilePath, publicFilePath);
      }
    }
  } catch (e) {
    console.error("Error syncing hero video:", e);
  }

  const fileToServe = fs.existsSync(publicFilePath)
    ? publicFilePath
    : fs.existsSync(rootFilePath)
    ? rootFilePath
    : null;

  if (!fileToServe) {
    return new NextResponse("Video not found", { status: 404 });
  }

  try {
    const stat = fs.statSync(fileToServe);
    const fileSize = stat.size;
    const range = request.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(fileToServe, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize.toString(),
        "Content-Type": "video/mp4",
      };
      return new NextResponse(file as any, { status: 206, headers: head });
    } else {
      const head = {
        "Content-Length": fileSize.toString(),
        "Content-Type": "video/mp4",
      };
      const file = fs.createReadStream(fileToServe);
      return new NextResponse(file as any, { status: 200, headers: head });
    }
  } catch (error) {
    console.error("Error streaming video:", error);
    return new NextResponse("Error streaming video", { status: 500 });
  }
}
