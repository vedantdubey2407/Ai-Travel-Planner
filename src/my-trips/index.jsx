import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './component/UserTripCardItem';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/');
        return;
      }

      const q = query(
        collection(db, 'AITrips'),
        where('userEmail', '==', user.email)
      );
      
      const querySnapshot = await getDocs(q);
      const trips = [];
      
      querySnapshot.forEach((doc) => {
        trips.push({ ...doc.data(), id: doc.id });
      });

      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>My Trips</h2>
        <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <UserTripCardItem key={trip.id} trip={trip} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p>No trips found. Create your first trip!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;