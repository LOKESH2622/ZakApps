// Product data matching ABOKICHI style
const products = [
    {
        id: 1,
        name: "OKAZU Lovers Set (230mL/12 jars)",
        category: "Chili oil,Okazu",
        type: "Multi Set",
        flavour: "Chili Miso",
        price: 135.00,
        oldPrice: 167.88,
        rating: 5,
        reviews: 32,
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400",
        badge: "232",
        description: "Your new cooking BFF! You can add this to virtually everything. Try it on rice, on meat or tofu, in your burger, ramen and pretty much anything. These award winning products will have your taste buds lingering for more...and potentially create an addiction."
    },
    {
        id: 2,
        name: "OKAZU Chili Miso (230mL)",
        category: "Chili oil,Okazu",
        type: "Single Pack",
        flavour: "Chili Miso",
        price: 13.99,
        oldPrice: null,
        rating: 4.8,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400",
        badge: "Best Seller",
        description: "Our signature chili miso paste that brings the perfect balance of heat and umami to any dish. Made with premium organic ingredients."
    },
    {
        id: 3,
        name: "Miso Soup Variety Pack (3 flavours)",
        category: "Miso Soup",
        type: "Multi Set",
        flavour: "Mixed",
        price: 24.99,
        oldPrice: null,
        rating: 4.6,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
        badge: null,
        description: "Three delicious miso soup varieties in one convenient pack. Perfect for quick, nutritious meals."
    },
    {
        id: 4,
        name: "ABO MATCHA Instant Powder",
        category: "Instant Matcha",
        type: "Single Pack",
        flavour: "Original",
        price: 28.99,
        oldPrice: 32.00,
        rating: 4.9,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400",
        badge: "230",
        description: "Premium ceremonial grade matcha powder. Perfect for lattes, smoothies, or traditional tea ceremony."
    },
    {
        id: 5,
        name: "OKAZU Garlic Miso (230mL)",
        category: "Chili oil,Okazu",
        type: "Single Pack",
        flavour: "Garlic",
        price: 13.99,
        oldPrice: null,
        rating: 4.7,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1589729132389-8f0e0b55b91e?w=400",
        badge: null,
        description: "Rich and savory garlic-infused miso paste. Adds depth and flavor to stir-fries, marinades, and dressings."
    },
    {
        id: 6,
        name: "Organic Miso Soup - Original",
        category: "Miso Soup",
        type: "Single Pack",
        flavour: "Original",
        price: 9.99,
        oldPrice: null,
        rating: 4.5,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400",
        badge: null,
        description: "Classic organic miso soup with tofu and seaweed. Ready in minutes, authentic Japanese flavor."
    },
    {
        id: 7,
        name: "OKAZU Sesame Miso (230mL)",
        category: "Chili oil,Okazu",
        type: "Single Pack",
        flavour: "Sesame",
        price: 13.99,
        oldPrice: null,
        rating: 4.8,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1617817824775-33c8d451d063?w=400",
        badge: null,
        description: "Nutty sesame seeds combined with our signature miso blend. Perfect for noodles and grain bowls."
    },
    {
        id: 8,
        name: "Matcha Latte Mix - Sweetened",
        category: "Instant Matcha",
        type: "Single Pack",
        flavour: "Sweet",
        price: 22.99,
        oldPrice: null,
        rating: 4.6,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1536013266865-a6e0ce1b2cfd?w=400",
        badge: null,
        description: "Convenient sweetened matcha latte mix. Just add hot water or milk for a perfect café-style drink."
    },
    {
        id: 9,
        name: "OKAZU Spicy Collection (4 jars)",
        category: "Chili oil,Okazu",
        type: "Multi Set",
        flavour: "Mixed",
        price: 52.99,
        oldPrice: 59.96,
        rating: 4.9,
        reviews: 178,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
        badge: null,
        description: "Four levels of heat to explore. From mild to extra spicy, discover your perfect heat level."
    },
    {
        id: 10,
        name: "Coffee Miso Blend",
        category: "Coffee",
        type: "Single Pack",
        flavour: "Coffee",
        price: 16.99,
        oldPrice: null,
        rating: 4.4,
        reviews: 54,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
        badge: "New",
        description: "Unique blend of specialty coffee and miso. A surprising combination that coffee lovers adore."
    },
    {
        id: 11,
        name: "Miso Soup - Spicy",
        category: "Miso Soup",
        type: "Single Pack",
        flavour: "Spicy",
        price: 10.99,
        oldPrice: null,
        rating: 4.7,
        reviews: 91,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
        badge: null,
        description: "Traditional miso soup with a spicy kick. Perfect for cold days or when you need extra warmth."
    },
    {
        id: 12,
        name: "Matcha Ceremonial Grade",
        category: "Instant Matcha",
        type: "Single Pack",
        flavour: "Premium",
        price: 45.99,
        oldPrice: null,
        rating: 5,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=400",
        badge: "Premium",
        description: "Highest quality ceremonial grade matcha from Uji, Japan. Vibrant green color and smooth taste."
    }
];

// Additional products to reach 48 total
for (let i = 13; i <= 48; i++) {
    const baseProduct = products[i % 12];
    products.push({
        ...baseProduct,
        id: i,
        name: `${baseProduct.name} - Variant ${i}`,
        reviews: Math.floor(Math.random() * 200) + 20
    });
}