import React, { useState, useRef } from 'react';
import { GoogleMap, useLoadScript, Autocomplete } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { main } from '@/service/Aimodel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDailog, setOpenDailog] = useState(false);
  const autocompleteRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleInputChange = (Name, value) => {
    setFormData({
      ...formData,
      [Name]: value,
    });

    if (Name === 'noOfDays' && value > 5) {
      toast.error('Number of days cannot exceed 5!');
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error('You must be logged in to access this feature.');
      setOpenDailog(true);
      return;
    }

    if (!formData?.location?.name || !formData?.budget || !formData?.people) {
      toast.error('Please fill all details.');
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.name)
      .replace('{totaldays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    try {
      const result = await main(FINAL_PROMPT, formData?.location?.name);
      console.log("Parsed AI Result:", result);
      const docId = Date.now().toString();
      await SaveAiTrip(result, docId)
      toast.success("Trip generated and saved successfully!");
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error('Error generating or saving travel plan:', error.message);
      toast.error('Failed to generate or save travel plan.');
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData,docId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      

      if (!TripData || typeof TripData !== 'object') {
        console.error('Invalid tripData:', TripData);
        toast.error('Failed to save trip. Invalid trip data.');
        return;
      }

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: TripData,
        userEmail: user?.email || 'unknown@example.com',
        id: docId,
      });

      toast.success('Trip saved successfully!');
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip to Firestore.');
    }
  

  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json',
        }
      }).then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white py-16 text-center shadow-lg">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight animate-fade-in">
            Plan Your Perfect Trip
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 animate-fade-in-delay">
            Let us help you create a personalized itinerary tailored to your preferences.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-5 md:px-20 lg:px-40 py-10">
        <h2 className="font-bold text-3xl text-gray-800 text-center">Tell us your preferences 🏕️🌴</h2>
        <p className="mt-3 text-gray-600 text-center text-lg">
          Provide some basic information, and our trip planner will generate a customized itinerary.
        </p>

        {/* Inputs */}
        <div className="mt-10 flex flex-col gap-10">

          {/* Location */}
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-medium text-gray-800">What is your destination of choice?</h2>
            <Autocomplete
              onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
              onPlaceChanged={() => {
                const place = autocompleteRef.current.getPlace();
                setPlace(place);
                handleInputChange('location', { name: place.name || '' });
              }}
            >
              <input
                type="text"
                placeholder="Enter a location"
                className="border p-3 rounded-lg w-full mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Autocomplete>
          </div>

          {/* No. of Days */}
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-medium text-gray-800">How many days are you planning for the trip?</h2>
            <Input
              placeholder="Ex. 3"
              type="number"
              value={formData.noOfDays || ''}
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
              className="border p-3 rounded-lg w-full mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Budget */}
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-medium text-gray-800">What is Your Budget?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleInputChange('budget', item.title)}
                  className={`p-5 border cursor-pointer rounded-lg hover:shadow-lg transition-all ${formData?.budget === item.title && 'shadow-lg border-blue-500'
                    }`}
                >
                  <h2 className="text-4xl text-center">{item.icon}</h2>
                  <h2 className="font-bold text-lg text-center mt-2">{item.title}</h2>
                  <h2 className="text-sm text-gray-500 text-center">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Companions */}
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-medium text-gray-800">Who do you plan on traveling with?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
              {SelectTravelsList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleInputChange('people', item.people)}
                  className={`p-5 border cursor-pointer rounded-lg hover:shadow-lg transition-all ${formData?.people === item.people && 'shadow-lg border-blue-500'
                    }`}
                >
                  <h2 className="text-4xl text-center">{item.icon}</h2>
                  <h2 className="font-bold text-lg text-center mt-2">{item.title}</h2>
                  <h2 className="text-sm text-gray-500 text-center">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-10 flex justify-center">
          <Button
            disabled={loading}
            onClick={OnGenerateTrip}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            {loading
              ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
              : 'Generate Trip'}
          </Button>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={openDailog} onOpenChange={(isOpen) => setOpenDailog(isOpen)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <img src="/logo.svg" alt="App Logo" className="mx-auto my-4" />
            <DialogDescription>
              Sign in to the App with Google authentication securely.
            </DialogDescription>
            <Button
              onClick={() => {
                setOpenDailog(false);
                setTimeout(() => login(), 200);
              }}
              className="w-full mt-5 flex gap-4 items-center"
            >
              <FcGoogle className="h-7 w-7" />
              Sign In with Google
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
