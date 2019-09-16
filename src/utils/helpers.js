function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export const getCount = function() {
  if (typeof getCount.count === 'undefined') {
    getCount.count = 0;
  } else {
    getCount.count++;
  }
  return getCount.count;
};

const fnames = [
  'Mukesh',
  'Abhishek',
  'Pankaj',
  'Akash',
  'Yashwant',
  'Savitra',
  'Prafulla',
  'Shweta',
  'Amol',
  'Prashant',
];
const lnames = [
  'Kumar',
  'Rohan',
  'Sathe',
  'Salunkhe',
  'Revandkar',
  'Paharekari',
  'Bansode',
  'Shah',
  'Patil',
  'Joshi',
];

export function getFName() {
  let random = generateRandomInteger(0, fnames.length);
  return fnames[random];
}

export function getLName() {
  let random = generateRandomInteger(0, lnames.length);
  return lnames[random];
}
