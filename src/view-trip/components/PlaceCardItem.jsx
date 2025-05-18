import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/Global';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  console.log('ved',place)

  useEffect(() => {
    if (place) GetPlacePhoto();
  }, [place]);

const GetPlacePhoto = async () => {
  try {
    const data = { textQuery: place.placeName };
    const resp = await GetPlaceDetails(data);

    const rawName = resp?.data?.places?.[0]?.photos?.[0]?.name;
    const photoRef = rawName?.split("/").pop();

    if (photoRef) {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
      setPhotoUrl(PhotoUrl);
    } else {
      console.warn("⚠️ No photo found for:", place.placeName);
      setPhotoUrl("https://via.placeholder.com/130");
    }
  } catch (error) {
    console.error("❌ Failed to fetch place photo:", error);
    setPhotoUrl("https://via.placeholder.com/130");
  }
};


  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img 
          src={photoUrl|| "https://plus.unsplash.com/premium_photo-1721654789105-43ff4bb0a486?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          className='w-[130px] h-[130px] rounded-xl object-cover' 
          alt={place.placeName}
        />
        <div>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-500'>{place.placeDetails}</p>
          <p className='mt-2'>🕙{place.timeTravel}</p>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;