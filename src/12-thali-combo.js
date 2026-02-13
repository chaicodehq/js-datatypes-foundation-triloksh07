/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *    => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (!thali || typeof thali !== "object") return "";

  const { name: thaliName, items: thaliItems, price: thaliPrice, isVeg } = thali;

  // if (!thali.name || typeof thali.name !== "string") return "";
  // if (!thali.items || !Array.isArray(thali.items)) return "";
  // if (typeof thali.isVeg !== "boolean") return "";
  // if (!thali.price || !Number.isFinite(thali.price)) return "";

  if (typeof thaliName !== "string") return "";
  if (!Array.isArray(thaliItems)) return "";
  if (typeof isVeg !== "boolean") return "";
  if (!Number.isFinite(thaliPrice)) return "";

  const vegLabel = thali.isVeg === true ? "(Veg)" : "(Non-Veg)";

  return `${thaliName.toUpperCase()} ${vegLabel} - Items: ${thaliItems.join(", ")} - Rs.${thaliPrice.toFixed(2)}`
}

export function getThaliStats(thalis) {
  if (!Array.isArray(thalis) || thalis.length <= 0) return null;

  // let vegCount = 0;
  // let nonVegCount = 0;
  // thalis.forEach(e => (e.isVeg === true ? vegCount++ : nonVegCount++));

  const vegCount = thalis.filter(e => e.isVeg === true).length;
  const nonVegCount = thalis.filter(e => e.isVeg === false).length;

  // const { vegCount, nonVegCount } = thalis.reduce((acc, e) => {

  //   if (e.isVeg === true) { acc.vegCount++ }
  //   else { acc.nonVegCount++; }

  //   return acc;
  // }, { vegCount: 0, nonVegCount: 0 });

  const totalThalis = thalis.length;

  const names = thalis.map(({ name }) => (name));
  const thaliPrices = thalis.map(e => (e.price));

  const cheapest = Math.min(...thaliPrices);
  const costliest = Math.max(...thaliPrices);

  const pricesSum = thaliPrices.reduce((acc, cur) => acc + cur, 0)
  const avgPrice = (pricesSum / thaliPrices.length).toFixed(2);

  return { totalThalis, vegCount, nonVegCount, cheapest, costliest, avgPrice, names };
}
const thalis = [
  { name: 'Rajasthani Thali', items: ['dal baati', 'churma', 'papad'], price: 250, isVeg: true },
  { name: 'Punjabi Thali', items: ['butter chicken', 'naan', 'dal makhani'], price: 350, isVeg: false },
  { name: 'Gujarati Thali', items: ['dhokla', 'thepla', 'dal', 'kadhi'], price: 200, isVeg: true },
  { name: 'South Indian Thali', items: ['dosa', 'sambar', 'chutney', 'rice'], price: 180, isVeg: true },
];

export function searchThaliMenu(thalis, query) {
  if (!Array.isArray(thalis) || typeof query !== "string") return [];

  // const filteredThali = thalis.map(({ name, items }) => ([name, items]));
  // const filteredThali = thalis.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()));
  // const queryArr = thalis.filter((e) => e.items.some(item => item.includes(query.toLowerCase())));

  const result = thalis.filter((element) => {
    return element.name.toLowerCase().includes(query.toLowerCase()) ||
      element.items.some(item => item.toLowerCase().includes(query.toLowerCase()));
  });

  return result;

}

console.log(generateThaliReceipt("shubham", thalis));

export function generateThaliReceipt(customerName, thalis) {
  if (typeof customerName !== "string" || !Array.isArray(thalis) || thalis.length <= 0) return "";

  const lineItems = thalis.map(({ name, price }) => {
    const lineItem = `- ${name} x Rs.${price}`;
    return lineItem;
  }).join("\n");

  const itemsCount = thalis.length;

  const total = thalis.reduce((total, { price }) => total + price, 0);

  const NAME = customerName.toUpperCase();

  const receipt = `THALI RECEIPT\n---\nCustomer: ${NAME}\n${lineItems}\n---\nTotal: Rs.${total}\nItems: ${itemsCount}`;

  return receipt;
}
