import { getGeocode, getLatLng } from "use-places-autocomplete";

export async function getLocation(zipCode: string) {
  const results = await getGeocode({ address: zipCode });

  console.log(results);
  const city = results[0].address_components[1].long_name;
  const { lat, lng } = getLatLng(results[0]);
  console.log("📍 Coordinates: ", { lat, lng }, city);

  return { city, lat, lng };
}
