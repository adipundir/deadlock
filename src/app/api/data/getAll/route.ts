import { createStorageClientOnRequest } from "@/AppWrite/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { bucketId } = await request.json();
    console.log("get all function run");
    const { storage: clientStorage } = await createStorageClientOnRequest(
      request
    );
    const response = await clientStorage.listFiles(bucketId);
    const filesArray = response.files;
    const serialisedFilesArray = filesArray.map((file, index) => {
      const serialisedFile = {
        id : file.$id,
        sno : index + 1,
        name: file.name,
        mimetype: file.mimeType,
        sizeOriginal: file.sizeOriginal,
        createdAt: file.$createdAt,
      };
      return serialisedFile;
    });
    console.log("files", serialisedFilesArray);

    return NextResponse.json({
      message: "files retrieved",
      serialisedFilesArray,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
