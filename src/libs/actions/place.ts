export default async function getPlaceAction(
  name: string,
): Promise<string | null> {
  try {
    const res = await fetch(`/api/places?query=${encodeURIComponent(name)}`);
    const data = await res.json();
    return data.documents?.[0]?.place_url || null;
  } catch {
    return null;
  }
}
