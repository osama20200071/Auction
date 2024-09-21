import UploadFile from "./UploadFile";

export default async function CreatePage() {
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post an item</h1>
      <UploadFile />
    </main>
  );
}
