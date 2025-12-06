export const products = [
    {
        id: 1,
        name: "Lenovo LOQ",
        description: "Lenovo LOQ 2024, Intel Core i5-13450HX, 13th Gen Gaming Laptop with NVIDIA GeForce RTX 4050 6GB GDDR6",
        price: 89990,
        rating: 5,
        category: "laptop gaming",
        images: [
            "/images/Lenovo LOQ.png",
            "/images/Lenovo LOQ2.png",
            "/images/Lenovo LOQ3.png",
            "/images/Lenovo LOQ4.png",
            "/images/Lenovo LOQ5.png",
            "/images/Lenovo LOQ6.png",
            "/images/Lenovo LOQ7.png"
        ],
        features: [
            "Intel Core i5-13450HX Processor",
            "NVIDIA GeForce RTX 4050 6GB GDDR6",
            "16GB DDR5 RAM",
            "512GB NVMe SSD",
            "15.6\" FHD IPS 144Hz Display",
            "Windows 11 Home"
        ],
    },
    {
        id: 2,
        name: "Portronics Toad One",
        description: "Bluetooth Mouse with 2.4 GHz & BT 5.3 Dual Wireless Connectivity, Silent Click, 1600 DPI",
        price: 548,
        rating: 3,
        category: "accessory gaming",
        images: [
            "/images/Portronics Toad One 1.webp",
            "/images/Portronics Toad One 2.jpg",
            "/images/Portronics Toad One 3.jpg",
            "/images/Portronics Toad One 4.jpg",
            "/images/Portronics Toad One 5.jpg",
            "/images/Portronics Toad One 6.jpg",
            "/images/Portronics Toad One 7.jpg"
        ],
        features: [
            "Dual Wireless Connectivity",
            "Silent Click Technology",
            "1600 DPI Precision",
            "6-Month Battery Life",
            "Ergonomic Design"
        ]
    },
    {
        id: 3,
        name: "MSI MAG 273QP QD-OLED Monitor",
        description: "27-inch QHD/4K gaming display with QD-OLED panel, 240Hz refresh rate, and 0.03ms response time",
        price: 19000,
        rating: 4,
        category: "monitor gaming",
        images: [
            "/images/MSI MAG 271QPX.jpg",
            "/images/MSI MAG 271QPX-2.jpg",
            "/images/MSI MAG 271QPX-3.jpg",
            "/images/MSI MAG 271QPX-4.jpg",
            "/images/MSI MAG 271QPX-5.jpg",
            "/images/MSI MAG 271QPX-6.jpg"
        ],
        features: [
            "27\" QD-OLED Panel",
            "2560x1440 Resolution",
            "240Hz Refresh Rate",
            "0.03ms Response Time",
            "HDR1000 Certified",
            "99% DCI-P3 Color Gamut"
        ]
    },
    {
        id: 4,
        name: "Corsair Vengeance RGB",
        description: "Corsair Vengeance RGB Pro 8GB (1x8GB) DDR4 3200 (PC4-25600) C16 Optimized for AMD Ryzen ? Black",
        price: 3349,
        rating: 5,
        category: "accessory",
        images: [
            "/images/Corsair Vengeance RGB.jpg",
            "/images/Corsair Vengeance RGB 2.jpg",
            "/images/Corsair Vengeance RGB 3.jpg",
            "/images/Corsair Vengeance RGB 4.jpg",
            "/images/Corsair Vengeance RGB 5.jpg",
            "/images/Corsair Vengeance RGB 6.jpg",
            "/images/Corsair Vengeance RGB 7.jpg"
        ],
        features: [
            "Brand                   --Corsair",
            "Computer Memory Size    --8 Gb",
            "RAM Memory              --DDR4",
            "Memory Speed            --3200 MHz",
            "Compatible Devices    -- Compatible Devices",
        ]
    },
    {
        id: 5,
        name: "iPhone 16 Pro Max",
        description: "iPhone 16 Pro Max: 5G Mobile Phone with Camera Control, 4K 120 fps Dolby Vision and a Huge Leap in Battery Life. Works with AirPods; Black Titanium",
        price: 89999,
        rating: 5,
        category: "mobile",
        images: [
            "/images/Iphone 16 pro max.png",
            "/images/Iphone 16 pro max 2.jpg",
            "/images/Iphone 16 pro max 3.jpg",
            "/images/Iphone 16 pro max 4.jpg",
            "/images/Iphone 16 pro max 5.jpg",
            "/images/Iphone 16 pro max 6.jpg"
        ],
        features: [
            "A18 Pro Chip",
            "512GB Storage",
            "48MP Main Camera",
            "6.7\" Super Retina XDR",
            "5G Capability",
            "All-day Battery Life"
        ],
        variations: {
            storage: [
                { name: "128GB", price_modifier: -10000 },
                { name: "256GB", price_modifier: 0 },
                { name: "512GB", price_modifier: 20000 },
                { name: "1TB", price_modifier: 40000 }
            ],
            color: [
                { name: "Black Titanium", image: "/images/Iphone 16 pro max.png" },
                { name: "Natural Titanium", image: "/images/Iphone 16 pro max 2.jpg" },
                { name: "White Titanium", image: "/images/Iphone 16 pro max 3.jpg" },
                { name: "Blue Titanium", image: "/images/Iphone 16 pro max 4.jpg" }
            ]
        }
    },
    {
        id: 6,
        name: "Gaming Chair Pro",
        description: "Ergonomic gaming chair with lumbar support and 4D adjustable armrests",
        price: 3999,
        rating: 4,
        category: "accessory gaming",
        images: ["/images/Gaming Chair.png"],
        features: [
            "4D Adjustable Armrests",
            "180° Recline",
            "Lumbar Support",
            "Premium PU Leather",
            "Heavy-duty Base"
        ]
    },
    {
        id: 7,
        name: "Gaming Headphones",
        description: "7.1 Surround Sound Gaming Headset with RGB lighting and noise-canceling mic",
        price: 2499,
        rating: 4,
        category: "accessory gaming",
        images: ["/images/Gaming Headphone.png"],
        features: [
            "7.1 Surround Sound",
            "RGB Lighting",
            "Noise-canceling Mic",
            "Memory Foam Earpads",
            "Multi-platform Compatible"
        ]
    },
    {
        id: 8,
        name: "Gaming Controller",
        description: "Wireless gaming controller with vibration feedback and programmable buttons",
        price: 1899,
        rating: 5,
        category: "gaming",
        images: ["/images/Gaming controller.png"],
        features: [
            "Wireless Connectivity",
            "Vibration Feedback",
            "Programmable Buttons",
            "20-hour Battery Life",
            "Low Latency"
        ]
    },
    {
        id: 9,
        name: "MacBook Air M4",
        description: "Apple 2025 MacBook Air (13-inch, Apple M4 chip with 10-core CPU and 8-core GPU, 16GB Unified Memory, 256GB) - Silver",
        price: 114990,
        rating: 5,
        category: "laptop",
        images: [
            "/images/MacBook Air M4 1.png",
            "/images/MacBook Air M4 2.jpg",
            "/images/MacBook Air M4 3.jpg",
            "/images/MacBook Air M4 4.jpg",
            "/images/MacBook Air M4 5.jpg",
            "/images/MacBook Air M4 6.jpg",
        ],
        features: [
            "M4 Chip",
            "13.6\" Retina Display",
            "16GB Unified Memory",
            "512GB SSD",
            "18-hour Battery Life",
            "1080p FaceTime Camera"
        ]
    },
    {
        id: 10,
        name: "HP 15",
        description: "AMD Ryzen 3 7320U (8GB DDR4, 512GB SSD) FHD, Anti-Glare, Micro-Edge, 15.6''/39.6cm, Win11, M365 Basic(1yr)* Office24, Silver, 1.59kg, fc0500AU, FHD Camera",
        price: 30990,
        rating: 4,
        category: "laptop gaming",
        images: [
            "/images/HP 15 1.jpg",
            "/images/HP 15 2.jpg",
            "/images/HP 15 3.jpg",
            "/images/HP 15 4.jpg",
            "/images/HP 15 5.jpg",
            "/images/HP 15 6.jpg",
            "/images/HP 15 7.jpg"
        ],
        features: [
            "AMD Ryzen 3 7320U Processor",
            "8GB DDR4 RAM",
            "512GB SSD",
            "15.6\" FHD Anti-Glare Display",
            "Windows 11 Home",
            "Microsoft 365 Basic (1 yr)"
        ]
    },
    {
        id: 11,
        name: "Samsung Galaxy S25 Ultra",
        description: "Samsung Galaxy S25 Ultra: Next-gen flagship with Snapdragon 8 Gen 4, 200MP camera, S Pen support, and all-day battery life",
        price: 89999,
        rating: 5,
        category: "mobile",
        images: [
            "/images/Samsung s25 ultra.png"
        ],
        features: [
            "Snapdragon 8 Gen 4 Processor",
            "12GB RAM + 256GB Storage",
            "200MP Main Camera",
            "6.8\" Dynamic AMOLED 2X Display",
            "5000mAh Battery with 45W Fast Charging",
            "S Pen Support",
            "5G Connectivity"
        ]
    }
];
