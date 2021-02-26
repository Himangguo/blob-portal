import React, { memo, Suspense, useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";

import Eloading from "react-loading-dev";
import PageHeader from "@/components/page-header";
import store from "@/store";
import routes from "@/routes";

import { testUserLoginStatus } from "@/api/app";
export default memo(function App() {
  const [title, setTitle] = useState("");
  const _testUserLoginStatus = useCallback(() => {
    testUserLoginStatus().then((res) => {
      console.log("testUserLoginStatus", res);
      setTitle(res.websiteName);
    });
  });
  useEffect(() => {
    _testUserLoginStatus();
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Eloading />}>
          <PageHeader title={title} />
          {renderRoutes(routes)}
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
});
