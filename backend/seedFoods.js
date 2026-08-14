import mongoose from "mongoose";
import "dotenv/config";
import Food from "./model/foodModel.js";

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing foods
    await Food.deleteMany({});
    console.log("Cleared existing foods");

    const foods = [
      {
        name: "Greek Salad",
        description: "Fresh vegetables with feta cheese and olives",
        price: 250,
        category: "Salad",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop",
      },
      {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with Caesar dressing and croutons",
        price: 280,
        category: "Salad",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
      },
      {
        name: "Spring Rolls",
        description: "Crispy rolls filled with vegetables and shrimp",
        price: 200,
        category: "Rolls",
        image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      },
      {
        name: "Chicken Roll",
        description: "Soft tortilla with grilled chicken and vegetables",
        price: 220,
        category: "Rolls",
        image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      },
      {
        name: "Chocolate Cake",
        description: "Rich chocolate cake with ganache frosting",
        price: 300,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
      },
      {
        name: "Cheesecake",
        description: "Creamy cheesecake with berry topping",
        price: 280,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop",
      },
      {
        name: "Chicken Sandwich",
        description: "Grilled chicken breast on toasted bread with mayo",
        price: 240,
        category: "Sandwich",
        image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=400&h=400&fit=crop",
      },
      {
        name: "Veggie Sandwich",
        description: "Fresh vegetables and hummus on whole wheat bread",
        price: 200,
        category: "Sandwich",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop",
      },
      {
        name: "Chocolate Cake",
        description: "Decadent multi-layer chocolate cake",
        price: 320,
        category: "Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
      },
      {
        name: "Vanilla Cake",
        description: "Classic vanilla cake with buttercream frosting",
        price: 280,
        category: "Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
      },
      {
        name: "Vegetarian Curry",
        description: "Mixed vegetables in aromatic spiced sauce",
        price: 260,
        category: "Pure Veg",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
      },
      {
        name: "Paneer Tikka",
        description: "Marinated paneer cheese grilled with vegetables",
        price: 290,
        category: "Pure Veg",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
      },
      {
        name: "Spaghetti Carbonara",
        description: "Classic Italian pasta with creamy sauce",
        price: 310,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
      },
      {
        name: "Penne Arrabbiata",
        description: "Spicy Italian pasta with tomato and garlic",
        price: 290,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
      },
      {
        name: "Ramen",
        description: "Japanese noodles in rich broth with toppings",
        price: 330,
        category: "Noodles",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop",
      },
      {
        name: "Pad Thai",
        description: "Thai stir-fried noodles with shrimp and vegetables",
        price: 300,
        category: "Noodles",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop",
      },
    ];

    await Food.insertMany(foods);
    console.log("✅ Food items seeded successfully!");
    console.log(`Added ${foods.length} food items`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding foods:", error);
    process.exit(1);
  }
};

seedFoods();
