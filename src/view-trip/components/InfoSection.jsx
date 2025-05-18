import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/Global';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  console.log("Photo URL:", photoUrl);

  

  useEffect(() => {
    if (trip) GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
  try {
    const data = { textQuery: trip?.userSelection?.location?.name };
    const resp = await GetPlaceDetails(data);

    const rawName = resp?.data?.places?.[0]?.photos?.[0]?.name;
    const photoRef = rawName?.split("/").pop(); // Extract just the photo reference

    if (photoRef) {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
      setPhotoUrl(PhotoUrl);
    } else {
      console.warn("⚠️ No photo found for:", trip?.userSelection?.location?.name);
      setPhotoUrl("https://via.placeholder.com/130");
    }
  } catch (error) {
    console.error("❌ Failed to fetch location photo:", error);
    setPhotoUrl("https://via.placeholder.com/130");
  }
};


  return (
    <div className=''>
      <img 
          src={photoUrl || "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
          className=' h-[340px] rounded-xl w-full object-cover' 
          
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