import licenses from "./licenses";

// Keep the public pricing presentation aligned with the selection cards.
const pricing = licenses.map((license) => ({
  ...license,
  button: "Choose License",
}));

export default pricing;
