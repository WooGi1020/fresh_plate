import MapMarkerWithPan from "@/app/search/components/MapMarkerWithPan";
import { Restaurant } from "@/types/restaurants.schema";

interface Props {
  restaurants: Restaurant[];
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}

export default function MarkerLayer({
  restaurants,
  selectedId,
  setSelectedId,
}: Props) {
  return (
    <>
      {restaurants.map((r) => (
        <MapMarkerWithPan
          key={r.id}
          restaurant={r}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ))}
    </>
  );
}
