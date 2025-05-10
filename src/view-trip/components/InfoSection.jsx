import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/Global';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: trip?.userSelection?.location?.name };
      const resp = await GetPlaceDetails(data);
      if (resp?.data?.places?.[0]?.photos?.[0]?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Failed to fetch location photo:", error);
    }
  };

  return (
    <div>
      <img 
        src="https://plus.unsplash.com/premium_photo-1682390303252-4e1e31e692e4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJpcHxlbnwwfHwwfHx8MA%3D%3D" 
        className='h-[340px] w-full object-cover rounded-xl' 
        alt={trip?.userSelection?.location?.name}
      />
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.name}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅{trip.userSelection?.noOfDays} Day</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰{trip.userSelection?.budget}</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂No. Of Traveler:{trip.userSelection?.people}</h2>
          </div>
        </div>
        <Button aria-label="Share">
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;