import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AppProvider } from "./context/AppContext.jsx";
import App from "./App.jsx";
import "./index.css";

// Ponto de entrada: "desenha" o <App /> dentro da <div id="root"> do index.html.
// BrowserRouter = permite ter várias páginas (rotas) com URLs diferentes.
// AppProvider = deixa o estado global (login, modo escuro) disponível pra todos.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
