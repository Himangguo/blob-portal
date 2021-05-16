import React, { memo, Suspense, useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";
import { message } from "antd";
import Eloading from "react-loading-dev";
import PageHeader from "@/components/page-header";
import store from "@/store";
import routes from "@/routes";
import AuthController from "@/components/auth-controller";
import { testUserLoginStatus } from "@/api/app";
export default memo(function App(props) {
  const [title, setTitle] = useState("");
  const _testUserLoginStatus = useCallback(() => {
    testUserLoginStatus()
      .then((res) => {
        console.log("testUserLoginStatus", res);
        setTitle(res.websiteName);
      })
      .catch((err) => {
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
          <AuthController>{renderRoutes(routes)}</AuthController>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
});
