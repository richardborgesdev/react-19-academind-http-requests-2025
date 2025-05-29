import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlace, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchPlaces(params) {
      setIsFetching(true);

      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();

      setAvailablePlaces(resData.places);

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

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
