import UploadFile from "./UploadFile";

export default function CreatePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Post an item</h1>
      <UploadFile />
    </div>
  );
}
