const CATEGORIES = [
  { id: undefined, name: 'All' },
  { id: 1, name: '🍆 Colorful Harvest' },
  { id: 2, name: '🥕 Roots & Tubers' },
  { id: 3, name: '🌱 Aromatics & Herbs' },
  { id: 4, name: '🌿 Leafy & Fresh' },
  { id: 5, name: '🥦 Crucifers & Stalks' },
  { id: 6, name: '🌿 Legumes' },
];

const PRODUCTS = [
  {
    id: 11,
    name: 'Tomato',
    category: 1,
    price: 55,
    unit: 'kg',
    quantity: 1,
    image: 'tomato.png',
  },
  {
    id: 12,
    name: 'Red Bell Pepper',
    category: 1,
    price: 35,
    unit: 'piece',
    quantity: 1,
    image: 'bellpepper-red.png',
  },
  {
    id: 13,
    name: 'Yellow Bell Pepper',
    category: 1,
    price: 35,
    unit: 'piece',
    quantity: 1,
    image: 'bellpepper-yellow.png',
  },
  {
    id: 14,
    name: 'Green Bell Pepper',
    category: 1,
    price: 35,
    unit: 'piece',
    quantity: 1,
    image: 'bellpepper-green.png',
  },
  {
    id: 15,
    name: 'Eggplant',
    category: 1,
    price: 50,
    unit: 'kg',
    quantity: 1,
    image: 'eggplant.png',
  },
  {
    id: 16,
    name: 'Zucchini',
    category: 1,
    price: 60,
    unit: 'kg',
    quantity: 1,
    image: 'zucchini.png',
  },
  {
    id: 17,
    name: 'Pumpkin',
    category: 1,
    price: 80,
    unit: 'piece',
    quantity: 1,
    image: 'pumpkin.png',
  },
  {
    id: 18,
    name: 'Chili Pepper',
    category: 1,
    price: 70,
    unit: 'gr',
    quantity: 500,
    image: 'chili-pepper.png',
  },
  {
    id: 19,
    name: 'Okra',
    category: 1,
    price: 70,
    unit: 'kg',
    quantity: 1,
    image: 'okra.png',
  },

  {
    id: 22,
    name: 'Potato',
    category: 2,
    price: 30,
    unit: 'kg',
    quantity: 1,
    image: 'potato.png',
  },
  {
    id: 21,
    name: 'Carrot',
    category: 2,
    price: 45,
    unit: 'kg',
    quantity: 1,
    image: 'carrot.png',
  },
  {
    id: 23,
    name: 'Sweet Potato',
    category: 2,
    price: 50,
    unit: 'kg',
    quantity: 1,
    image: 'sweet-potato.png',
  },
  {
    id: 24,
    name: 'Radish',
    category: 2,
    price: 35,
    unit: 'gr',
    quantity: 500,
    image: 'radish.png',
  },
  {
    id: 25,
    name: 'Beetroot',
    category: 2,
    price: 55,
    unit: 'kg',
    quantity: 1,
    image: 'beetroot.png',
  },
  {
    id: 26,
    name: 'Taro',
    category: 2,
    price: 40,
    unit: 'kg',
    quantity: 1,
    image: 'taro.png',
  },
  {
    id: 27,
    name: 'Cassava',
    category: 2,
    price: 40,
    unit: 'kg',
    quantity: 1,
    image: 'cassava.png',
  },

  {
    id: 31,
    name: 'Onion',
    category: 3,
    price: 35,
    unit: 'kg',
    quantity: 1,
    image: 'onion-white.png',
  },
  {
    id: 33,
    name: 'Red Onion',
    category: 3,
    price: 40,
    unit: 'kg',
    quantity: 1,
    image: 'onion-red.png',
  },
  {
    id: 32,
    name: 'Garlic',
    category: 3,
    price: 80,
    unit: 'kg',
    quantity: 1,
    image: 'garlic.png',
  },
  {
    id: 34,
    name: 'Basil',
    category: 3,
    price: 100,
    unit: 'gr',
    quantity: 100,
    image: 'basil.png',
  },
  {
    id: 35,
    name: 'Cilantro',
    category: 3,
    price: 40,
    unit: 'gr',
    quantity: 250,
    image: 'cilantro.png',
  },

  {
    id: 42,
    name: 'Lettuce',
    category: 4,
    price: 40,
    unit: 'piece',
    quantity: 1,
    image: 'lettuce.png',
  },
  {
    id: 41,
    name: 'Spinach',
    category: 4,
    price: 50,
    unit: 'kg',
    quantity: 1,
    image: 'spinach.png',
  },
  {
    id: 44,
    name: 'Cabbage',
    category: 4,
    price: 55,
    unit: 'piece',
    quantity: 1,
    image: 'cabbage.png',
  },
  {
    id: 43,
    name: 'Kale',
    category: 4,
    price: 60,
    unit: 'gr',
    quantity: 500,
    image: 'kale.png',
  },
  {
    id: 45,
    name: 'Parsley',
    category: 4,
    price: 30,
    unit: 'gr',
    quantity: 250,
    image: 'parsley.png',
  },
  {
    id: 46,
    name: 'Morning Glory',
    category: 4,
    price: 35,
    unit: 'gr',
    quantity: 250,
    image: 'morning-glory.png',
  },

  {
    id: 51,
    name: 'Broccoli',
    category: 5,
    price: 70,
    unit: 'gr',
    quantity: 500,
    image: 'broccoli.png',
  },
  {
    id: 52,
    name: 'Cauliflower',
    category: 5,
    price: 60,
    unit: 'piece',
    quantity: 1,
    image: 'cauliflower.png',
  },
  {
    id: 55,
    name: 'Celery',
    category: 5,
    price: 50,
    unit: 'gr',
    quantity: 500,
    image: 'celery.png',
  },
  {
    id: 53,
    name: 'Asparagus',
    category: 5,
    price: 120,
    unit: 'gr',
    quantity: 500,
    image: 'asparagus.png',
  },
  {
    id: 54,
    name: 'Brussels Sprouts',
    category: 5,
    price: 90,
    unit: 'gr',
    quantity: 500,
    image: 'brussels-sprouts.png',
  },

  {
    id: 61,
    name: 'Green Beans',
    category: 6,
    price: 55,
    unit: 'kg',
    quantity: 1,
    image: 'green-beans.png',
  },
  {
    id: 62,
    name: 'Peas',
    category: 6,
    price: 60,
    unit: 'kg',
    quantity: 1,
    image: 'peas.png',
  },
  {
    id: 63,
    name: 'Lentils',
    category: 6,
    price: 45,
    unit: 'kg',
    quantity: 1,
    image: 'lentils.png',
  },
  {
    id: 64,
    name: 'Chickpeas',
    category: 6,
    price: 50,
    unit: 'kg',
    quantity: 1,
    image: 'chickpeas.png',
  },
  {
    id: 65,
    name: 'Edamame',
    category: 6,
    price: 80,
    unit: 'gr',
    quantity: 500,
    image: 'edamame.png',
  },
];
