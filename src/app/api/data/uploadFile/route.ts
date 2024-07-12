import {
  createSessionClientOnRequest,
  createStorageAdminClient,
  createStorageClientOnRequest,
} from "@/AppWrite/config";
import { NextRequest, NextResponse } from "next/server";
import { ID, Permission, Role } from "node-appwrite";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;
  const description = data.get("description");
  const bucketId = data.get("bucketId") as string;
  const email = data.get("email") as string;
  const userid = data.get("userid") as string;
  console.log("file in route handler", file);
  console.log("description in route handler", description);
  console.log("first Bucket ID", bucketId);
  console.log("type of bucketID", typeof bucketId)

  if (!file || !description)
    return NextResponse.json({ message: "No file found" }, { status: 400 });

  const { storage: clientStorage } = await createStorageClientOnRequest(
    request
  );

  console.log("storage client created");

  if (bucketId != "undefined") {
    console.log("received bucket route run");
    const response = await clientStorage.createFile(
      bucketId,
      ID.unique(),
      file
    );
    if (response)
      return NextResponse.json({
        message: `${response.name} Uploaded successfully`,
        success: true,
      });
    else
      return NextResponse.json({
        message: "something Went Wrong",
        success: false,
      });
  } else {
    console.log("No bucket route run");
    const { storage: adminStorage } = await createStorageAdminClient();
    const { account: sessionClient } = await createSessionClientOnRequest(
      request
    );
    let user = null;

    const prefs = await sessionClient.getPrefs();

    const bucket = await adminStorage.createBucket(ID.unique(), email, [
      Permission.read(Role.user(userid)),
      Permission.write(Role.user(userid)),
      Permission.delete(Role.user(userid)),
    ]);
    console.log(bucket);
    if (bucket.$id) {
      const updatedPrefs = await sessionClient.updatePrefs({
        ...prefs,
        bucketId: bucket.$id,
      });
      user = await sessionClient.get();
      console.log("Updated User", user)
    }
    const fileCreated = await clientStorage.createFile(
      bucket.$id,
      ID.unique(),
      file
    );
    console.log("Created File", fileCreated);
    if (fileCreated.$id && bucket.$id) {
      return NextResponse.json({
        message: `${fileCreated.name} uploaded successfully`,
        success: true,
        user,
      });
    } else if (bucket.$id) {
      return NextResponse.json({
        message: "Storage Bucket Created but File not uploaded",
        success: true,
        user,
      });
    } else
      return NextResponse.json({
        message: "Something Went Wrong",
        success: false,
      });
  }
}
