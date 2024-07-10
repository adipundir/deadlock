import {
  createStorageAdminClient,
  createStorageClientOnRequest,
} from "@/AppWrite/config";
import { NextRequest, NextResponse } from "next/server";
import { ID, Permission, Role, Users } from "node-appwrite";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;
  const description = data.get("description");
  const bucketId = data.get("bucketId") as string;
  const email = data.get("email") as string;
  const userid = data.get("userid") as string;
  console.log("file in route handler", file);
  console.log("description in route handler", description);

  if (!file || !description )
    return NextResponse.json({ message: "No file found" }, { status: 400 });

  const { storage: clientStorage } = await createStorageClientOnRequest(
    request
  );

  if (bucketId) {
    const response = await clientStorage.createFile(
      bucketId,
      ID.unique(),
      file
    );
    if (response)
      return NextResponse.json({
        message: `${response.name} uploaded successfully`,
        success: true,
      });
    else
      return NextResponse.json({
        message: "something Went Wrong",
        success: false,
      });

  } else {

    const { storage: adminStorage } = await createStorageAdminClient();
    const bucket = await adminStorage.createBucket(ID.unique(), email, [
      Permission.read(Role.user(userid)),
      Permission.delete(Role.user(userid)),
    ]);
    const response = await clientStorage.createFile(
      bucket.$id,
      ID.unique(),
      file
    );
    if (response)
      return NextResponse.json({
        message: `${response.name} uploaded successfully`,
        success: true,
      });
    else
      return NextResponse.json({
        message: "something Went Wrong",
        success: false,
      });
  }
}
