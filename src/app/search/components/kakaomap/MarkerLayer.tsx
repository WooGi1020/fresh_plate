import MapMarkerWithPan from "@/app/search/components/MapMarkerWithPan";
import { Restaurant } from "vegan";

interface Props {
  restaurants: Restaurant[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export default function MarkerLayer({ restaurants, selectedId, setSelectedId }: Props) {
  return (
    <>
      {restaurants.map((r) => (
        <MapMarkerWithPan key={r.id} restaurant={r} selectedId={selectedId} setSelectedId={setSelectedId} />
      ))}
    </>
  );
}
