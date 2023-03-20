import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useParams } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpotShow from "./components/Spots/SpotShow";
import SpotForm from "./components/Spots/SpotForm";
import SpotManage from "./components/Spots/SpotManage";
import SpotEditForm from "./components/Spots/SpotEditForm";

import "./index.css";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.thunkRestoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Spots />
          </Route>
          <Route path="/spots/new">
            <SpotForm />
          </Route>
          <Route path="/spots/current">
            <SpotManage />
          </Route>
          <Route path="/spots/:spotId/edit">
            <SpotEditForm />
          </Route>
          <Route path="/spots/:spotId">
            <SpotShow />
          </Route>
          
          
          
          
          
          
        </Switch>
      )}
    </>
  );
}

export default App;