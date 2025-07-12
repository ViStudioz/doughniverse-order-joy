import { Product } from "@/components/ProductCard";

// Import product images
import nutellaBomboloniImg from "@/assets/nutella-bomboloni.jpg";
import redVelvetCheesecakeImg from "@/assets/red-velvet-cheesecake.jpg";
import chocolateTubcakeImg from "@/assets/chocolate-tubcake.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Nutella Bomboloni",
    description: "Fluffy eggless donut filled with creamy Nutella and dusted with powdered sugar",
    price: 120,
    image: nutellaBomboloniImg,
    category: "bombolonis"
  },
  {
    id: "2",
    name: "Red Velvet Cheesecake",
    description: "Creamy eggless cheesecake with a rich red velvet base and cream cheese frosting",
    price: 150,
    image: redVelvetCheesecakeImg,
    category: "cheesecakes"
  },
  {
    id: "3",
    name: "Chocolate Tubcake",
    description: "Rich chocolate cake served in a convenient tub with chocolate frosting",
    price: 100,
    image: chocolateTubcakeImg,
    category: "tubcakes"
  },
  {
    id: "4",
    name: "Classic Bomboloni",
    description: "Traditional Italian donut filled with vanilla custard and topped with sugar",
    price: 110,
    image: nutellaBomboloniImg,
    category: "bombolonis"
  },
  {
    id: "5",
    name: "Strawberry Cheesecake",
    description: "Light and creamy cheesecake with fresh strawberry compote",
    price: 160,
    image: redVelvetCheesecakeImg,
    category: "cheesecakes"
  },
  {
    id: "6",
    name: "Vanilla Tubcake",
    description: "Moist vanilla sponge cake with buttercream frosting in a tub",
    price: 95,
    image: chocolateTubcakeImg,
    category: "tubcakes"
  },
  {
    id: "7",
    name: "Chocolate Brownie",
    description: "Fudgy eggless brownie with chocolate chips and nuts",
    price: 80,
    image: chocolateTubcakeImg,
    category: "cakes-brownies"
  },
  {
    id: "8",
    name: "Lemon Cheesecake",
    description: "Zesty lemon cheesecake with graham cracker crust",
    price: 155,
    image: redVelvetCheesecakeImg,
    category: "cheesecakes"
  }
];

export const categories = [
  { id: "all", name: "All Items" },
  { id: "bombolonis", name: "Bombolonis" },
  { id: "cheesecakes", name: "Cheesecakes" },
  { id: "tubcakes", name: "Tubcakes" },
  { id: "cakes-brownies", name: "Cakes & Brownies" }
];