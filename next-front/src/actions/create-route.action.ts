"use server";
import { CreateOrStartRoute } from "@/types/types";
import { revalidateTag } from "next/cache";

export async function createRouteAction(state: CreateOrStartRoute, formData: FormData) {
  const { sourceId, destinationId } = Object.fromEntries(formData);

  const directionsResponse = await fetch(
    // `${process.env.NEST_API_URL}/directions?originId=${sourceId}&destinationId=${destinationId}`,
    `${process.env.NEST_API_URL}/directions?originId=${sourceId}&destinationId=${destinationId}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 1 * 60 * 60 * 24, // 1 day
      }
    }
  );

  if (!directionsResponse.ok) {
    // console.error(await directionsResponse.text());
    return { error: "Failed to fetch directions" };
  }

  const directionsData = await directionsResponse.json();
  const startAddress = directionsData.routes[0].legs[0].start_address;
  const endAddress = directionsData.routes[0].legs[0].end_address;

  // const response = await fetch(`${process.env.NEST_API_URL}/routes`, {
  const response = await fetch(`${process.env.NEST_API_URL}/routes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${startAddress} - ${endAddress}`,
      source_id: directionsData.request.origin.place_id.replace(
        "place_id:",
        ""
      ),
      destination_id: directionsData.request.destination.place_id.replace(
        "place_id:",
        ""
      ),
    }),
  });

  if (!response.ok) {
    // console.error(await response.text());
    return { error: "Failed to create route" };
  }

  revalidateTag("routes");

  return { success: true };
}
