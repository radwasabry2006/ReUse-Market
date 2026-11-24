
// Automatically import all product images
const imageModules = import.meta.glob(
  '../assets/products/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
    import: 'default',
    query: '?url',
  }
)

// Sort images by their product number
const productImages = Object.entries(imageModules)
  .sort(([a], [b]) => {
    const numberA = Number(a.match(/product-(\d+)/)?.[1] ?? 0)
    const numberB = Number(b.match(/product-(\d+)/)?.[1] ?? 0)
    return numberA - numberB
  })
  .map(([, image]) => image)


// All products
const products = [

  // 1 - 10

  {
    name: 'Wooden Office Desk',
    description: 'A practical wooden desk with a spacious surface, perfect for studying or working from home.',
    category: 'Furniture',
    type: 'sale',
    price: 1500,
    location: 'Cairo',
    condition: 'Good',
    specifications: {
      material: 'Solid wood',
      color: 'Natural brown',
      dimensions: '120 × 60 × 75 cm',
      weight: 'Approx. 18 kg',
      usageDuration: '2 years',
      style: 'Modern minimalist',
    },
  },

  {
    name: 'Smartphone',
    description: 'A modern smartphone with a large display and a sleek design.',
    category: 'Electronics',
    type: 'sale',
    price: 4500,
    location: 'Assiut',
    condition: 'Like New',
    specifications: {
      brand: 'Samsung (sample listing)',
      model: 'Galaxy A series (sample)',
      storage: '128 GB',
      ram: '6 GB',
      battery: '5000 mAh',
      usageDuration: '8 months',
      accessories: 'Charger and protective case',
      warranty: 'No warranty',
    },
  },

  {
    name: 'Comfortable Bed',
    description: 'A comfortable bedroom bed with a soft mattress and a simple elegant design.',
    category: 'Furniture',
    type: 'sale',
    price: 3500,
    location: 'Giza',
    condition: 'Good',
    specifications: {
      material: 'Wooden frame with upholstered headboard',
      color: 'Light beige',
      dimensions: '160 × 200 cm',
      weight: 'Approx. 45 kg',
      usageDuration: '3 years',
      style: 'Simple modern',
    },
  },

  {
    name: 'Denim Jacket',
    description: 'A classic blue denim jacket suitable for everyday outfits.',
    category: 'Clothing',
    type: 'sale',
    price: 450,
    location: 'Cairo',
    condition: 'Good',
    specifications: {
      brand: 'Unbranded',
      size: 'M',
      color: 'Blue',
      material: 'Denim cotton',
      fit: 'Regular fit',
      usageDuration: '1 year',
      gender: 'Unisex',
    },
  },

  {
    name: 'Floral Summer Dress',
    description: 'A lightweight floral dress, perfect for warm summer days.',
    category: 'Clothing',
    type: 'sale',
    price: 350,
    location: 'Assiut',
    condition: 'Like New',
    specifications: {
      brand: 'Unbranded',
      size: 'M',
      color: 'White with floral print',
      material: 'Lightweight polyester blend',
      fit: 'Regular fit',
      usageDuration: '3 months',
      gender: 'Women',
    },
  },

  {
    name: 'White Sneakers',
    description: 'Comfortable white sneakers suitable for daily walking and casual outfits.',
    category: 'Clothing',
    type: 'sale',
    price: 600,
    location: 'Cairo',
    condition: 'Good',
    specifications: {
      brand: 'Unbranded',
      size: 'EU 39',
      color: 'White',
      material: 'Synthetic leather and rubber',
      fit: 'Regular fit',
      usageDuration: '6 months',
      gender: 'Unisex',
    },
  },

  {
    name: 'Wireless Headphones',
    description: 'Over-ear wireless headphones designed for listening to music and entertainment.',
    category: 'Electronics',
    type: 'sale',
    price: 800,
    location: 'Assiut',
    condition: 'Like New',
    specifications: {
      brand: 'JBL (sample listing)',
      model: 'Wireless over-ear (sample)',
      battery: 'Up to 20 hours (sample)',
      usageDuration: '5 months',
      accessories: 'Charging cable',
      warranty: 'No warranty',
    },
  },

  {
    name: 'Book Collection',
    description: 'A collection of popular books in good condition, perfect for reading lovers.',
    category: 'Books',
    type: 'donate',
    price: 0,
    location: 'Assiut',
    condition: 'Good',
    specifications: {
      title: 'Mixed book collection',
      author: 'Various authors',
      publisher: 'Various publishers',
      language: 'Arabic and English',
      pages: 'Different page counts',
      edition: 'Mixed editions',
    },
  },

  {
    name: 'Beige Handbag',
    description: 'An elegant beige handbag suitable for everyday use and different occasions.',
    category: 'Bags',
    type: 'sale',
    price: 500,
    location: 'Cairo',
    condition: 'Good',
    specifications: {
      brand: 'Unbranded',
      bagType: 'Shoulder handbag',
      material: 'Faux leather',
      color: 'Beige',
      size: 'Medium',
      compartments: '2 main compartments and 1 inner pocket',
      usageDuration: '8 months',
    },
  },

  {
    name: 'Green Armchair',
    description: 'A comfortable green armchair that adds a stylish touch to any living room.',
    category: 'Furniture',
    type: 'sale',
    price: 2200,
    location: 'Giza',
    condition: 'Good',
    specifications: {
      material: 'Wooden frame and fabric upholstery',
      color: 'Olive green',
      dimensions: '85 × 80 × 90 cm',
      weight: 'Approx. 20 kg',
      usageDuration: '2 years',
      style: 'Contemporary',
    },
  },


  // 11 - 20

  {
    name: 'Air Fryer',
    description: 'A practical air fryer for preparing meals with less oil.',
    category: 'Home Appliances',
    type: 'sale',
    price: 1800,
    location: 'Cairo',
    condition: 'Like New',
    specifications: {
      brand: 'Philips (sample listing)',
      model: 'Digital air fryer (sample)',
      power: '1400 W (sample)',
      capacity: '4.2 L (sample)',
      usageDuration: '6 months',
      workingStatus: 'Fully working',
      accessories: 'Cooking basket and user guide',
      warranty: 'No warranty',
    },
  },

  {
    name: 'Floral Ceramic Mug',
    description: 'A beautiful ceramic mug with a colorful floral design, perfect for coffee or tea.',
    category: 'Home Decor',
    type: 'sale',
    price: 120,
    location: 'Assiut',
    condition: 'New',
    specifications: {
      material: 'Ceramic',
      color: 'White with floral pattern',
      dimensions: 'Approx. 10 cm height',
      weight: 'Approx. 350 g',
      style: 'Floral',
    },
  },

  {
    name: 'Sunglasses',
    description: 'Stylish sunglasses with a classic frame for everyday use.',
    category: 'Accessories',
    type: 'sale',
    price: 200,
    location: 'Cairo',
    condition: 'Good',
    specifications: {
      brand: 'Unbranded',
      size: 'Medium frame',
      color: 'Black',
      material: 'Plastic frame',
      fit: 'Classic fit',
      usageDuration: '4 months',
      gender: 'Unisex',
    },
  },

  {
    name: 'Black Backpack',
    description: 'A spacious black backpack suitable for university, work, or travel.',
    category: 'Bags',
    type: 'sale',
    price: 400,
    location: 'Assiut',
    condition: 'Like New',
    specifications: {
      brand: 'Unbranded',
      bagType: 'Backpack',
      material: 'Polyester',
      color: 'Black',
      size: 'Large',
      compartments: '3 compartments and 2 side pockets',
      usageDuration: '5 months',
    },
  },

  {
    name: 'Green Polo Shirt',
    description: 'A casual green polo shirt suitable for everyday wear.',
    category: 'Clothing',
    type: 'donate',
    price: 0,
    location: 'Giza',
    condition: 'Good',
    specifications: {
      brand: 'Unbranded',
      size: 'L',
      color: 'Green',
      material: 'Cotton',
      fit: 'Regular fit',
      usageDuration: '1 year',
      gender: 'Men',
    },
  },

  {
    name: 'Decorative Table Lamp',
    description: 'A warm decorative lamp that creates a cozy atmosphere in any room.',
    category: 'Home Decor',
    type: 'sale',
    price: 350,
    location: 'Cairo',
    condition: 'Good',
    specifications: {
      material: 'Metal base and fabric shade',
      color: 'Warm beige and gold',
      dimensions: 'Approx. 40 cm height',
      weight: 'Approx. 1.5 kg',
      style: 'Modern',
    },
  },

  {
    name: 'Gray Knit Sweater',
    description: 'A soft gray knitted sweater, ideal for cold weather and casual outfits.',
    category: 'Clothing',
    type: 'sale',
    price: 400,
    location: 'Assiut',
    condition: 'Good',
    specifications: {
      brand: 'Unbranded',
      size: 'L',
      color: 'Gray',
      material: 'Acrylic knit',
      fit: 'Regular fit',
      usageDuration: '1 winter season',
      gender: 'Unisex',
    },
  },

  {
    name: 'Vacuum Cleaner',
    description: 'A practical vacuum cleaner designed to help keep your home clean.',
    category: 'Home Appliances',
    type: 'sale',
    price: 2000,
    location: 'Cairo',
    condition: 'Good',
    specifications: {
      brand: 'Beko (sample listing)',
      model: 'Canister vacuum (sample)',
      power: '1800 W (sample)',
      capacity: '2 L dust container (sample)',
      usageDuration: '1 year',
      workingStatus: 'Fully working',
      accessories: 'Hose and standard floor brush',
      warranty: 'No warranty',
    },
  },

  {
    name: 'Navy Summer Shorts',
    description: 'Comfortable navy shorts, perfect for casual summer outfits.',
    category: 'Clothing',
    type: 'sale',
    price: 250,
    location: 'Giza',
    condition: 'Like New',
    specifications: {
      brand: 'Unbranded',
      size: 'M',
      color: 'Navy blue',
      material: 'Cotton blend',
      fit: 'Regular fit',
      usageDuration: '2 months',
      gender: 'Men',
    },
  },

  {
    name: 'Smart Watch',
    description: 'A modern smartwatch with a digital display for everyday use.',
    category: 'Electronics',
    type: 'sale',
    price: 900,
    location: 'Assiut',
    condition: 'Like New',
    specifications: {
      brand: 'Xiaomi (sample listing)',
      model: 'Mi Band series (sample)',
      battery: 'Up to 10 days (sample)',
      usageDuration: '4 months',
      accessories: 'Charging cable',
      warranty: 'No warranty',
    },
  },


  // 21 - 30

  {
    name: 'Pink Backpack',
    description: 'A cute pink backpack with multiple compartments, suitable for school, or daily use.',
    category: 'Bags',
    type: 'sale',
    price: 350,
    location: 'Cairo',
    condition: 'Good',
    specifications: {
      brand: 'Unbranded',
      bagType: 'School backpack',
      material: 'Polyester',
      color: 'Pink',
      size: 'Medium',
      compartments: '2 main compartments and 2 side pockets',
      usageDuration: '1 year',
    },
  },

  {
    name: 'Gaming Controller',
    description: 'A wireless gaming controller designed for comfortable gaming sessions.',
    category: 'Electronics',
    type: 'sale',
    price: 700,
    location: 'Assiut',
    condition: 'Like New',
    specifications: {
      brand: 'Compatible third-party brand',
      model: 'Wireless game controller',
      battery: 'Rechargeable battery',
      usageDuration: '3 months',
      accessories: 'USB charging cable',
      warranty: 'No warranty',
    },
  },

  {
    name: 'Burgundy Winter Scarf',
    description: 'A warm burgundy scarf that adds comfort and style during cold days.',
    category: 'Clothing',
    type: 'donate',
    price: 0,
    location: 'Giza',
    condition: 'Good',
    specifications: {
      brand: 'Unbranded',
      size: 'One size',
      color: 'Burgundy',
      material: 'Acrylic knit',
      fit: 'Wrap style',
      usageDuration: '1 winter season',
      gender: 'Unisex',
    },
  },

  {
    name: 'White Smart Watch',
    description: 'A stylish smartwatch with a light-colored strap and a clear digital display.',
    category: 'Electronics',
    type: 'sale',
    price: 850,
    location: 'Cairo',
    condition: 'Good',
    specifications: {
      brand: 'Xiaomi (sample listing)',
      model: 'Fitness smartwatch (sample)',
      battery: 'Up to 7 days (sample)',
      usageDuration: '6 months',
      accessories: 'Charging cable and white strap',
      warranty: 'No warranty',
    },
  },

  {
    name: 'Botanical Wall Art',
    description: 'A decorative framed botanical print that adds a modern touch to your room.',
    category: 'Home Decor',
    type: 'sale',
    price: 250,
    location: 'Assiut',
    condition: 'New',
    specifications: {
      material: 'Printed paper in a wooden frame',
      color: 'Green and natural tones',
      dimensions: '30 × 40 cm',
      weight: 'Approx. 800 g',
      style: 'Botanical / modern',
    },
  },

  {
    name: 'Stainless Steel Bottle',
    description: 'A reusable stainless steel water bottle, ideal for university, work, and travel.',
    category: 'Accessories',
    type: 'sale',
    price: 180,
    location: 'Cairo',
    condition: 'New',
    specifications: {
      material: 'Stainless steel',
      color: 'Silver',
      dimensions: 'Approx. 25 cm height',
      weight: 'Approx. 300 g',
      style: 'Minimalist reusable bottle',
    },
  },

  {
    name: 'Beige Sunglasses',
    description: 'Classic beige-frame sunglasses suitable for sunny days.',
    category: 'Accessories',
    type: 'sale',
    price: 220,
    location: 'Giza',
    condition: 'Good',
    specifications: {
      brand: 'Unbranded',
      size: 'Medium frame',
      color: 'Beige',
      material: 'Plastic frame',
      fit: 'Classic fit',
      usageDuration: '5 months',
      gender: 'Unisex',
    },
  },

  {
    name: 'Teddy Bear',
    description: 'A soft teddy bear that makes a lovely gift for children and loved ones.',
    category: 'Toys',
    type: 'donate',
    price: 0,
    location: 'Assiut',
    condition: 'Good',
    specifications: {
      material: 'Plush fabric',
      color: 'Brown',
      dimensions: 'Approx. 30 cm height',
      weight: 'Approx. 400 g',
      style: 'Classic teddy bear',
    },
  },

  {
    name: 'Cookware Set',
    description: 'A practical cookware set with pots and a frying pan for everyday cooking.',
    category: 'Home Appliances',
    type: 'sale',
    price: 1200,
    location: 'Cairo',
    condition: 'Like New',
    specifications: {
      brand: 'Tefal (sample listing)',
      model: 'Non-stick cookware set (sample)',
      capacity: 'Mixed pot sizes',
      usageDuration: '8 months',
      workingStatus: 'Good condition, no visible damage',
      accessories: 'Pots, frying pan and lids',
      warranty: 'No warranty',
    },
  },

  {
    name: 'Instant Camera',
    description: 'A compact instant camera that lets you capture and print special moments.',
    category: 'Electronics',
    type: 'sale',
    price: 1600,
    location: 'Assiut',
    condition: 'Good',
    specifications: {
      brand: 'Fujifilm (sample listing)',
      model: 'Instax Mini series (sample)',
      storage: 'Instant film',
      battery: 'AA batteries (sample)',
      usageDuration: '1 year',
      accessories: 'Camera strap',
      warranty: 'No warranty',
    },
  },


  // 31 - 40

  {
    name: 'Black Headphones',
    description: 'Comfortable black headphones suitable for music, videos, and online meetings.',
    category: 'Electronics',
    type: 'sale',
    price: 650,
    location: 'Giza',
    condition: 'Good',
    specifications: {
      brand: 'Sony (sample listing)',
      model: 'Wired over-ear headphones (sample)',
      battery: 'Not required (wired)',
      usageDuration: '1 year',
      accessories: 'Audio cable',
      warranty: 'No warranty',
    },
  },

  {
    name: 'Cat Plant Pot',
    description: 'A cute cat-shaped plant pot that adds a decorative touch to your home.',
    category: 'Home Decor',
    type: 'sale',
    price: 150,
    location: 'Assiut',
    condition: 'New',
    specifications: {
      material: 'Ceramic',
      color: 'White',
      dimensions: 'Approx. 15 × 12 cm',
      weight: 'Approx. 500 g',
      style: 'Cute / playful',
    },
  },

  {
    name: 'Pink Sneakers',
    description: 'Stylish pink and white sneakers suitable for casual everyday wear.',
    category: 'Clothing',
    type: 'sale',
    price: 550,
    location: 'Cairo',
    condition: 'Like New',
    specifications: {
      brand: 'Unbranded',
      size: 'EU 38',
      color: 'Pink and white',
      material: 'Mesh fabric and rubber',
      fit: 'Regular fit',
      usageDuration: '3 months',
      gender: 'Women',
    },
  },

  {
    name: 'Green Casual Dress',
    description: 'An elegant green dress with a comfortable design, suitable for casual occasions.',
    category: 'Clothing',
    type: 'sale',
    price: 450,
    location: 'Assiut',
    condition: 'Good',
    specifications: {
      brand: 'Unbranded',
      size: 'M',
      color: 'Green',
      material: 'Cotton blend',
      fit: 'Regular fit',
      usageDuration: '1 year',
      gender: 'Women',
    },
  },

  {
    name: 'Monopoly Board Game',
    description: 'A classic board game for fun family and friends gatherings.',
    category: 'Toys',
    type: 'donate',
    price: 0,
    location: 'Giza',
    condition: 'Good',
    specifications: {
      material: 'Cardboard board and paper cards',
      color: 'Multicolor',
      dimensions: 'Standard board game box',
      weight: 'Approx. 900 g',
      style: 'Family board game',
    },
  },

  {
    name: 'Power Bank',
    description: 'A portable power bank that helps charge your devices while traveling.',
    category: 'Electronics',
    type: 'sale',
    price: 400,
    location: 'Cairo',
    condition: 'Like New',
    specifications: {
      brand: 'Anker (sample listing)',
      model: 'Portable power bank (sample)',
      storage: '10000 mAh capacity',
      battery: '10000 mAh',
      usageDuration: '5 months',
      accessories: 'USB charging cable',
      warranty: 'No warranty',
    },
  },

  {
    name: 'Denim Shirt',
    description: 'A casual blue denim shirt that can be styled for different everyday looks.',
    category: 'Clothing',
    type: 'sale',
    price: 350,
    location: 'Assiut',
    condition: 'Good',
    specifications: {
      brand: 'Unbranded',
      size: 'L',
      color: 'Blue',
      material: 'Denim cotton',
      fit: 'Regular fit',
      usageDuration: '8 months',
      gender: 'Unisex',
    },
  },

  {
    name: 'Laptop Bag',
    description: 'A practical laptop bag with enough space for your laptop and daily essentials.',
    category: 'Bags',
    type: 'sale',
    price: 500,
    location: 'Cairo',
    condition: 'Like New',
    specifications: {
      brand: 'Unbranded',
      bagType: 'Laptop shoulder bag',
      material: 'Polyester with padded lining',
      color: 'Black',
      size: 'Fits up to 15.6-inch laptop',
      compartments: 'Laptop compartment and 3 accessory pockets',
      usageDuration: '6 months',
    },
  },

  {
    name: 'Scented Candles',
    description: 'Decorative scented candles that create a relaxing atmosphere at home.',
    category: 'Home Decor',
    type: 'sale',
    price: 180,
    location: 'Giza',
    condition: 'New',
    specifications: {
      material: 'Soy wax blend',
      color: 'Cream',
      dimensions: 'Approx. 8 cm jar',
      weight: 'Approx. 200 g',
      style: 'Minimalist jar candle',
    },
  },

  {
    name: 'Soft Blue Blanket',
    description: 'A soft and cozy blanket, perfect for relaxing and keeping warm.',
    category: 'Home Decor',
    type: 'donate',
    price: 0,
    location: 'Assiut',
    condition: 'Good',
    specifications: {
      material: 'Fleece fabric',
      color: 'Soft blue',
      dimensions: '150 × 200 cm',
      weight: 'Approx. 1 kg',
      style: 'Simple / cozy',
    },
  },

]


// Add unique IDs and matching images
export const popularItems = products.map((product, index) => ({
  ...product,
  id: `p${index + 1}`,
  image: productImages[index],
}))
