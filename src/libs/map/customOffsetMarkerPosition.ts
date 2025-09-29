export default function customOffsetMarkerPosition(
  map: kakao.maps.Map,
  target: kakao.maps.LatLng
) {
  const OFFSET_Y_PX = 60;
  try {
    const proj = map.getProjection();
    const pt = proj.pointFromCoords(target);
    pt.y -= OFFSET_Y_PX;
    const centered = proj.coordsFromPoint(pt);
    map.panTo(centered);
  } catch {
    // projection 접근 실패 시 기본 panTo
    map.panTo(target);
  }
}
