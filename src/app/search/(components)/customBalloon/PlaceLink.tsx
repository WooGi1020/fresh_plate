import { use } from "react";

import LinkIcon from "@/icons/link_icon.svg";

export default function PlaceLink({
  promise,
  restaurantName,
}: {
  promise: Promise<string | null>;
  restaurantName: string;
}) {
  const placeUrl = use(promise);

  if (!placeUrl) {
    return (
      <h2
        className="text-xl font-semibold truncate max-w-45 sm:max-w-62.5"
        title={restaurantName}
      >
        {restaurantName}
      </h2>
    );
  }

  return (
    <a
      href={placeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group text-xl font-semibold truncate max-w-45 sm:max-w-62.5 hover:underline"
      title={restaurantName}
    >
      {restaurantName}
      <LinkIcon className="w-3 h-3 inline-block ml-1" />
    </a>
  );
}
