import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import StateProvider from "context/StateContext";
import { ChakraProvider } from "@chakra-ui/react";


import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <><ToastContainer/>
    <ChakraProvider>
      <StateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
    </ChakraProvider>
  </>
);
