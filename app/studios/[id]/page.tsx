import StudioDetailsClient from "./StudioDetailsClient";

export default async function StudioDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <StudioDetailsClient id={resolvedParams.id} />;
}