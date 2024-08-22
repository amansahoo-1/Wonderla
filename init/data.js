// // data.js

// const sampleListings = [
//   {
//     _id: "66ab0877615e3b96c7498d7d",
//     title: "My new Villa",
//     description: "By the beach",
//     image:
//       "https://images.unsplash.com/photo-1722237959317-4ecde90e718b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//     __v: 0,
//   },
//   {
//     _id: "66ab0877615e3b96c7498d7e",
//     title: "Luxury Apartment",
//     description: "City center view",
//     image:
//       "https://images.unsplash.com/photo-1522012188892-112c23a88919?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
//     price: 1500,
//     location: "Mumbai, Maharashtra",
//     country: "India",
//     __v: 0,
//   },
//   {
//     _id: "66ab0877615e3b96c7498d7f",
//     title: "Cozy Cottage",
//     description: "Mountain retreat",
//     image:
//       "https://images.unsplash.com/photo-1470214304380-aadaedcfff28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
//     price: 900,
//     location: "Manali, Himachal Pradesh",
//     country: "India",
//     __v: 0,
//   },
//   {
//     _id: "66ab0877615e3b96c7498d80",
//     title: "Modern Studio",
//     description: "Heart of the city",
//     image:
//       "https://images.unsplash.com/photo-1560185007-5b2e84c8e0bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
//     price: 800,
//     location: "Bangalore, Karnataka",
//     country: "India",
//     __v: 0,
//   },
//   {
//     _id: "66ab0877615e3b96c7498d81",
//     title: "Beachside Bungalow",
//     description: "Steps from the ocean",
//     image:
//       "https://images.unsplash.com/photo-1552820728-8b17ff9bb7dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
//     price: 1300,
//     location: "Alleppey, Kerala",
//     country: "India",
//     __v: 0,
//   },
//   {
//     _id: "66ab0877615e3b96c7498d82",
//     title: "Penthouse Suite",
//     description: "Top floor with panoramic view",
//     image:
//       "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
//     price: 2000,
//     location: "New Delhi, Delhi",
//     country: "India",
//     __v: 0,
//   },
//   {
//     _id: "66ab0877615e3b96c7498d83",
//     title: "Charming Farmhouse",
//     description: "Countryside experience",
//     image:
//       "https://images.unsplash.com/photo-1523916892463-9d43e0b12e92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
//     price: 1000,
//     location: "Nashik, Maharashtra",
//     country: "India",
//     __v: 0,
//   },
//   {
//     _id: "66ab0877615e3b96c7498d84",
//     title: "Rustic Cabin",
//     description: "In the woods",
//     image:
//       "https://images.unsplash.com/photo-1481216470903-1c8f4aaca537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
//     price: 700,
//     location: "Coorg, Karnataka",
//     country: "India",
//     __v: 0,
//   },
//   {
//     _id: "66ab0877615e3b96c7498d85",
//     title: "Lake House",
//     description: "Peaceful lakeside view",
//     image:
//       "https://images.unsplash.com/photo-1520250497591-112ddeb1d2da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
//     price: 1100,
//     location: "Nainital, Uttarakhand",
//     country: "India",
//     __v: 0,
//   },
//   {
//     _id: "66ab0877615e3b96c7498d86",
//     title: "Desert Oasis",
//     description: "Experience the desert life",
//     image:
//       "https://images.unsplash.com/photo-1516542076529-1ea3854896b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
//     price: 950,
//     location: "Jaisalmer, Rajasthan",
//     country: "India",
//     __v: 0,
//   },
//   {
//     _id: "66ab0877615e3b96c7498d87",
//     title: "Snowy Chalet",
//     description: "Winter wonderland",
//     image:
//       "https://images.unsplash.com/photo-1486466732504-575bb7b2c336?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
//     price: 1400,
//     location: "Shimla, Himachal Pradesh",
//     country: "India",
//     __v: 0,
//   },
// ];

// module.exports = {data: sampleListings };

const sampleListings = [
  {
    _id: "66ab0877615e3b96c7498d7d",
    title: "My new Villa",
    description: "By the beach",
    image:
      "https://images.unsplash.com/photo-1722237959317-4ecde90e718b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
    price: 1200,
    location: "Calangute, Goa",
    country: "India",
  },
  {
    _id: "66ab0877615e3b96c7498d7e",
    title: "Luxury Apartment",
    description: "City center view",
    image:
      "https://images.unsplash.com/photo-1522012188892-112c23a88919?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
    price: 1500,
    location: "Mumbai, Maharashtra",
    country: "India",
  },
  {
    _id: "66ab0877615e3b96c7498d7f",
    title: "Cozy Cottage",
    description: "Mountain retreat",
    image:
      "https://images.unsplash.com/photo-1470214304380-aadaedcfff28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
    price: 900,
    location: "Manali, Himachal Pradesh",
    country: "India",
  },
  {
    _id: "66ab0877615e3b96c7498d80",
    title: "Modern Studio",
    description: "Heart of the city",
    image:
      "https://images.unsplash.com/photo-1560185007-5b2e84c8e0bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
    price: 800,
    location: "Bangalore, Karnataka",
    country: "India",
  },
  {
    _id: "66ab0877615e3b96c7498d81",
    title: "Beachside Bungalow",
    description: "Steps from the ocean",
    image:
      "https://images.unsplash.com/photo-1552820728-8b17ff9bb7dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
    price: 1300,
    location: "Alleppey, Kerala",
    country: "India",
  },
  {
    _id: "66ab0877615e3b96c7498d82",
    title: "Penthouse Suite",
    description: "Top floor with panoramic view",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
    price: 2000,
    location: "New Delhi, Delhi",
    country: "India",
  },
  {
    _id: "66ab0877615e3b96c7498d83",
    title: "Charming Farmhouse",
    description: "Countryside experience",
    image:
      "https://images.unsplash.com/photo-1523916892463-9d43e0b12e92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
    price: 1000,
    location: "Nashik, Maharashtra",
    country: "India",
  },
  {
    _id: "66ab0877615e3b96c7498d84",
    title: "Rustic Cabin",
    description: "In the woods",
    image:
      "https://images.unsplash.com/photo-1481216470903-1c8f4aaca537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
    price: 700,
    location: "Coorg, Karnataka",
    country: "India",
  },
  {
    _id: "66ab0877615e3b96c7498d85",
    title: "Lake House",
    description: "Peaceful lakeside view",
    image:
      "https://images.unsplash.com/photo-1520250497591-112ddeb1d2da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
    price: 1100,
    location: "Nainital, Uttarakhand",
    country: "India",
  },
  {
    _id: "66ab0877615e3b96c7498d86",
    title: "Desert Oasis",
    description: "Experience the desert life",
    image:
      "https://images.unsplash.com/photo-1516542076529-1ea3854896b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
    price: 1400,
    location: "Jaisalmer, Rajasthan",
    country: "India",
  },
];

module.exports = {
  data: sampleListings,
};
