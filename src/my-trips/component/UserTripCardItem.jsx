import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/Global';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        if (!trip?.userSelection?.location?.name) {
          setLoading(false);
          return;
        }

        const data = { textQuery: trip.userSelection.location.name };
        const resp = await GetPlaceDetails(data);
        
        const firstPhoto = resp?.data?.places?.[0]?.photos?.[0];
        if (firstPhoto?.name) {
          const photoUrl = PHOTO_REF_URL.replace('{NAME}', firstPhoto.name);
          setPhotoUrl(photoUrl);
        }
      } catch (error) {
        console.error('Error fetching photo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [trip]);

  if (loading) {
    return (
      <div className="h-[220px] w-full bg-gray-200 animate-pulse rounded-xl"></div>
    );
  }

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className='hover:scale-105 transition-all'>
        <img
          src={photoUrl || "https://plus.unsplash.com/premium_photo-1683140916567-6d3cea90caf6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJpcHN8ZW58MHx8MHx8fDA%3D"}
          alt={trip?.userSelection?.location?.name || 'Trip destination'}
          className="object-cover rounded-xl h-[220px] w-full"
          onError={(e) => {
            e.target.src = "https://plus.unsplash.com/premium_photo-1683140916567-6d3cea90caf6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJpcHN8ZW58MHx8MHx8fDA%3D";
          }}
        />
        <div className="mt-2">
          <h2 className="font-bold text-lg truncate">{trip?.userSelection?.location?.name || 'Unknown Destination'}</h2>
          <h2 className="text-sm text-gray-500 truncate">
            {trip?.userSelection?.noOfDays || 'N/A'} Days • {trip?.userSelection?.budget || 'N/A'} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;