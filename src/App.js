import React, { memo, Suspense } from "react";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";

import Eloading from "react-loading-dev";

import store from "@/store";
import routes from "@/routes";

export default memo(function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Eloading />}>{renderRoutes(routes)}</Suspense>
      </BrowserRouter>
    </Provider>
  );
});
