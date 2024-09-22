import { env } from "@/env";
import { Client, ID, Storage } from "appwrite";

const client = new Client();
const storage = new Storage(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Your project ID

function getImageUrl(fileKey: string) {
  return storage.getFilePreview(env.NEXT_PUBLIC_BUCKET_ID, fileKey).href;
}

async function deleteImage(fileKey: string) {
  return await storage.deleteFile(env.NEXT_PUBLIC_BUCKET_ID, fileKey);
}

async function createImage(file: File) {
  return await storage.createFile(env.NEXT_PUBLIC_BUCKET_ID, ID.unique(), file);
}

export { client, storage, getImageUrl, deleteImage, createImage };
