import { createRoot } from "react-dom/client";
import axios from "axios";
import App from "./App.jsx";

axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

createRoot(document.getElementById("root")).render(<App />);
