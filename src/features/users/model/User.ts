export default interface User {
  id: string;
  email: string;
  role: "client" | "employee" | "brand";
  name: string;
}
