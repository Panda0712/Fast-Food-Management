import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/`;

export const foods = [
  {
    name: "Hamburger",
    regularPrice: 50000,
    discount: 5000,
    image: imageUrl + "hamburger-001.jpeg",
    description: "Hamburger thượng hạng.",
  },
  {
    name: "Pizza",
    regularPrice: 75000,
    discount: 10000,
    image: imageUrl + "pizza-002.jpg",
    description: "Pizza thượng hạng.",
  },
  {
    name: "Cocacola",
    regularPrice: 15000,
    discount: 0,
    image: imageUrl + "cocacola-004.png",
    description: "Cocacola thượng hạng.",
  },
  {
    name: "Gà rán",
    regularPrice: 120000,
    discount: 20000,
    image: imageUrl + "chicken-fries-005.jpg",
    description: "Gà rán thượng hạng.",
  },
  {
    name: "Mì ý",
    regularPrice: 75000,
    discount: 5000,
    image: imageUrl + "noodles-006.jpg",
    description: "Mì ý thượng hạng.",
  },
  {
    name: "Khoai tây chiên",
    regularPrice: 30000,
    discount: 5000,
    image: imageUrl + "potatoes-fries-003.jpg",
    description: "Khoai tây chiên thượng hạng.",
  },
  {
    name: "Hamburger bò",
    regularPrice: 25000,
    discount: 2000,
    image: imageUrl + "hamburger-beef-007.jpg",
    description: "Hamburger bò thượng hạng.",
  },
  {
    name: "Hamburger thịt nướng",
    regularPrice: 20000,
    discount: 1000,
    image: imageUrl + "hamburger-grill-008.jpg",
    description: "Hamburger thịt nướng thượng hạng.",
  },
];
