import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import * as loc from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlace, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces(params) {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          const error = new Error("Failed to fetch places");

          throw error;
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = loc.sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlace}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      loadingText="Fetching place data..."
      isLoading={isFetching}
    />
  );
}
