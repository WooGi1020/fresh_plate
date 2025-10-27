import MapMarkerWithPan from "@/app/search/components/MapMarkerWithPan";
import { useMapStore } from "@/store/useMapStore";
import { Restaurant } from "@/types/restaurants.schema";

interface Props {
  restaurants: Restaurant[];
}

export default function MarkerLayer({ restaurants }: Props) {
  const selectedId = useMapStore((s) => s.selectedId);
  const setSelectedId = useMapStore((s) => s.setSelectedId);

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
