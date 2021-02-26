import React, { memo } from "react";
import HeaderMenu from "./header-menu";

import { HomeWrapper } from "./style";
import { renderRoutes } from "react-router-config";
import { Switch } from "react-router-dom";
export default memo(function Home(props) {
 
  return (
    <HomeWrapper>
      <HeaderMenu />
      <Switch>{renderRoutes(props.route.routes)}</Switch>
    </HomeWrapper>
  );
});
