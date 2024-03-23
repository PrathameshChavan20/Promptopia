import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
const dotenv = require("dotenv");
dotenv.config();
import { Toaster } from "react-hot-toast";

export const metadata = {
  tittle: "Promptopia",
  description: "Discover and Share AI Prompts",
};
const Rootlayout = ({ children }) => {
  return (
    <html lang="eng">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Toaster position="top-right" />
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Rootlayout;
