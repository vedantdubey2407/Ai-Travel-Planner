import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/Global';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (hotel) GetPlacePhoto();
  }, [hotel]);

 const GetPlacePhoto = async () => {
  try {
    const data = { textQuery: hotel?.hotelName };
    const resp = await GetPlaceDetails(data);

    const rawName = resp?.data?.places?.[0]?.photos?.[0]?.name;
    const photoRef = rawName?.split("/").pop(); // Extract only the photo reference

    if (photoRef) {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
      setPhotoUrl(PhotoUrl);
    } else {
      console.warn("⚠️ No photo found for:", hotel?.hotelName);
      setPhotoUrl("https://via.placeholder.com/130");
    }
  } catch (error) {
    console.error("❌ Failed to fetch hotel photo:", error);
    setPhotoUrl("https://via.placeholder.com/130");
  }
};


  return (
    <div className='flex items-center gap-5 my-5'>
      <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress} target='_blank'>
        <div className='hover:scale-105 transition-all cursor-pointer'>
          <img 
            src={photoUrl || "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
            className='w-[130px] h-[130px] rounded-xl object-cover' 
            alt={hotel?.hotelName}
          />
          <div className='my-2 flex flex-col gap-2'>
            <h2 className='font-medium'>{hotel?.hotelName}</h2>
            <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
            <h2 className='text-sm'>💰 {hotel?.price}</h2>
            <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;