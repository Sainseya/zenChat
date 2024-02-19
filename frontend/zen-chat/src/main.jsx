import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import ChatProvider from "./Context/ChatProvider";
import ServerPage from "./Pages/ServerPage";


ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <Router>
        <ChatProvider>
          <Routes>
            <Route path={"*"} element={<ErrorPage />} />
            <Route path={"/"} element={<Login />} />
            <Route path={"/chats/:id"} element={<Homepage />} />
            <Route path={"/server/:id"} element={<ServerPage />} />
          </Routes>
        </ChatProvider>
    </Router>
  </React.StrictMode>
);

