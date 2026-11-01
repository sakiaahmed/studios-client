import EditStudioClient from "./EditStudioClient";

export default async function EditStudioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return <EditStudioClient id={resolvedParams.id} />;
}