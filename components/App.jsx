import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "../utils/store";

import Body from "./Body";
import MainContainer from "./MainContainer";
import WatchPage from "./WatchPage";
import SearchResults from "./SearchResults";
import Resume from "./Resume";



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />, 
    children: [
      { path: "/", element: <MainContainer /> },
      { path: "watch", element: <WatchPage /> },
      { path: "results", element: <SearchResults/> },
      { path : "resume", element: <Resume/>},
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
