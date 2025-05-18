import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.travelPlan?.itinerary;
  

  return (
    <div>
      <h2 className='font-bold text-lg'>Places to visit</h2>
      <div>
        {Object.entries(itinerary || {}).map(([dayKey, dayData], index) => (
          <div key={`day-${index}`} className='mt-5'>
            <h2 className='font-medium text-lg'>{dayKey}</h2>
            {dayData?.places?.map((place, placeIndex) => (
              <div key={`place-${placeIndex}`} className='my-3'>
                <h2 className='font-medium text-sm text-orange-600'>{place.travelTime}</h2>
                <PlaceCardItem place={place} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
