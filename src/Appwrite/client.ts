import { env } from "@/env";
import { Client, Storage } from "appwrite";

const client = new Client();
const storage = new Storage(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Your project ID

function getImageUrl(fileKey: string) {
  return storage.getFilePreview(env.NEXT_PUBLIC_BUCKET_ID, fileKey).href;
}

export { client, storage, getImageUrl };
