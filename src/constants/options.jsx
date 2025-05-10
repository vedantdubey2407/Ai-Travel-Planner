export const SelectTravelsList=[
    {
        id:1,
        title:"Just Me",
        desc:'A sole travels in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'

    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 people'
    },
    {
        id:4,
        title :'Friends',
        desc:'A bunch of thrill-seeks',
        icon:'👩‍👩‍👧‍👦',
        people:'5 to 10 people'
    },
]
export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Budget-friendly options for cost-conscious travelers",
        icon: "💸",
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Balanced options for a comfortable experience",
        icon: "💵",
    },
    {
        id: 3,
        title: "Higher",
        desc: "Premium options for a luxurious experience",
        icon: "💎",
    },
];
export const AI_PROMPT ='generate travel plan for Location:{location}, for {totaldays} Days for {traveler}  with a {budget} budget , give me a Hotels options list with hotel name ,hotel address ,price, hotel image url ,geo coordinates ,rating ,descriptions and suggest itinerary with place name ,place details ,place image url ,geo coordinates ,ticket pricing ,time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'