import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places to visit</h2>
      <div>
        {trip?.tripData?.travelPlan?.itinerary?.map((item, index) => (
          <div key={`day-${index}`} className='mt-5'>
            <h2 className='font-medium text-lg'>{item.day}</h2>
            {item.plan?.map((place, placeIndex) => (
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