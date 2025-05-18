import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'
  }
};

export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);

export const PHOTO_REF_URL =
  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference={NAME}&key=' +
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
