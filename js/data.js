/**
 * FoodApp — Static Database
 * Seed data for restaurants and menus
 */

const RESTAURANTS = [
    { id: 1, name: 'Spice Garden', address: 'MG Road, Bangalore', rating: 4.8 },
    { id: 2, name: 'The Burger Lab', address: 'Koramangala, Bangalore', rating: 4.6 },
    { id: 3, name: 'Sushi World', address: 'Indiranagar, Bangalore', rating: 4.7 },
    { id: 4, name: 'Pizza Paradise', address: 'HSR Layout, Bangalore', rating: 4.5 },
    { id: 5, name: 'Tandoor Express', address: 'Whitefield, Bangalore', rating: 4.4 },
    { id: 6, name: 'Noodle Nation', address: 'Electronic City, Bangalore', rating: 4.3 },
    { id: 7, name: 'Biryani Bliss', address: 'Jayanagar, Bangalore', rating: 4.9 },
    { id: 8, name: 'Green Bowl (Vegan)', address: 'Malleshwaram, Bangalore', rating: 4.6 }
];

const MENU_ITEMS = [
    // 1. Spice Garden
    { id: 1, restaurantId: 1, itemName: 'Butter Chicken', price: 280, description: 'Creamy tomato-based chicken curry, served with naan' },
    { id: 2, restaurantId: 1, itemName: 'Paneer Tikka', price: 220, description: 'Grilled cottage cheese with peppers and spices' },
    { id: 3, restaurantId: 1, itemName: 'Dal Makhani', price: 180, description: 'Slow-cooked black lentils in buttery sauce' },
    { id: 4, restaurantId: 1, itemName: 'Garlic Naan', price: 60, description: 'Soft bread with garlic butter, baked in tandoor' },
    { id: 5, restaurantId: 1, itemName: 'Mango Lassi', price: 80, description: 'Chilled yogurt drink with fresh mango pulp' },

    // 2. The Burger Lab
    { id: 6, restaurantId: 2, itemName: 'Classic Smash Burger', price: 299, description: 'Double smash patty, cheddar, secret sauce, brioche bun' },
    { id: 7, restaurantId: 2, itemName: 'BBQ Bacon Burger', price: 349, description: 'Crispy bacon, BBQ sauce, caramelised onions' },
    { id: 8, restaurantId: 2, itemName: 'Veggie Patty Burger', price: 249, description: 'Plant-based patty with lettuce, tomato, pickles' },
    { id: 9, restaurantId: 2, itemName: 'Loaded Fries', price: 149, description: 'Crispy fries with cheese sauce and jalapeños' },
    { id: 10, restaurantId: 2, itemName: 'Oreo Milkshake', price: 179, description: 'Thick shake blended with Oreo cookies' },

    // 3. Sushi World
    { id: 11, restaurantId: 3, itemName: 'Salmon Nigiri (6pcs)', price: 380, description: 'Fresh Atlantic salmon over seasoned sushi rice' },
    { id: 12, restaurantId: 3, itemName: 'Spicy Tuna Roll', price: 320, description: 'Tuna with sriracha mayo, cucumber, avocado' },
    { id: 13, restaurantId: 3, itemName: 'Vegetable Maki (8pcs)', price: 240, description: 'Assorted veggies wrapped in nori and rice' },
    { id: 14, restaurantId: 3, itemName: 'Dragon Roll', price: 420, description: 'Shrimp tempura inside, avocado on top' },
    { id: 15, restaurantId: 3, itemName: 'Miso Soup', price: 100, description: 'Traditional Japanese broth with tofu and seaweed' },

    // 4. Pizza Paradise
    { id: 16, restaurantId: 4, itemName: 'Margherita Pizza', price: 299, description: 'Classic tomato, mozzarella, fresh basil' },
    { id: 17, restaurantId: 4, itemName: 'BBQ Chicken Pizza', price: 399, description: 'Pulled chicken, BBQ sauce, red onion' },
    { id: 18, restaurantId: 4, itemName: 'Veggie Supreme', price: 349, description: 'Bell peppers, corn, olives, mushrooms, cheese' },
    { id: 19, restaurantId: 4, itemName: 'Pasta Arrabiata', price: 249, description: 'Penne in spicy tomato sauce with garlic' },
    { id: 20, restaurantId: 4, itemName: 'Tiramisu', price: 180, description: 'Italian coffee dessert with mascarpone' },

    // 5. Tandoor Express
    { id: 21, restaurantId: 5, itemName: 'Chicken Biryani', price: 320, description: 'Fragrant basmati rice with spiced chicken and saffron' },
    { id: 22, restaurantId: 5, itemName: 'Seekh Kebab', price: 280, description: 'Minced lamb kebab grilled on skewers' },
    { id: 23, restaurantId: 5, itemName: 'Rogan Josh', price: 300, description: 'Slow-braised lamb in aromatic Kashmiri spices' },
    { id: 24, restaurantId: 5, itemName: 'Kulfi', price: 90, description: 'Traditional frozen Indian dessert with pistachios' },

    // 6. Noodle Nation
    { id: 25, restaurantId: 6, itemName: 'Pad Thai', price: 260, description: 'Stir-fried rice noodles with peanuts and lime' },
    { id: 26, restaurantId: 6, itemName: 'Ramen Bowl', price: 299, description: 'Rich pork broth, soft-boiled egg, chashu pork' },
    { id: 27, restaurantId: 6, itemName: 'Spring Rolls (6pcs)', price: 160, description: 'Crispy vegetable rolls with sweet chilli dip' },
    { id: 28, restaurantId: 6, itemName: 'Dim Sum Basket', price: 220, description: 'Steamed pork and prawn dumplings' },

    // 7. Biryani Bliss
    { id: 29, restaurantId: 7, itemName: 'Hyderabadi Dum Biryani', price: 350, description: 'Slow-cooked biryani with whole spices — the original' },
    { id: 30, restaurantId: 7, itemName: 'Mutton Biryani', price: 420, description: 'Tender mutton pieces in layered basmati rice' },
    { id: 31, restaurantId: 7, itemName: 'Veg Biryani', price: 280, description: 'Mixed vegetables and paneer with aromatic rice' },
    { id: 32, restaurantId: 7, itemName: 'Mirchi Ka Salan', price: 120, description: 'Spicy peanut and coconut chilli gravy' },
    { id: 33, restaurantId: 7, itemName: 'Double Ka Meetha', price: 150, description: 'Hyderabadi bread pudding in sugar syrup' },

    // 8. Green Bowl (Vegan)
    { id: 34, restaurantId: 8, itemName: 'Buddha Bowl', price: 280, description: 'Quinoa, roasted veggies, chickpeas, tahini dressing' },
    { id: 35, restaurantId: 8, itemName: 'Avocado Toast', price: 220, description: 'Sourdough with smashed avocado, chilli flakes' },
    { id: 36, restaurantId: 8, itemName: 'Acai Bowl', price: 260, description: 'Frozen acai blended with fruits and granola' },
    { id: 37, restaurantId: 8, itemName: 'Green Smoothie', price: 160, description: 'Spinach, mango, banana, almond milk' }
];
