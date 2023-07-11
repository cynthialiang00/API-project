import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useParams } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpotShow from "./components/Spots/SpotShow/SpotShow";
import SpotForm from "./components/Spots/SpotForm";
import SpotManage from "./components/Spots/SpotManage";
import SpotEditForm from "./components/Spots/SpotEditForm";
import Forbidden from "./components/Forbidden/Forbidden";

import "./index.css";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

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
            <SpotForm user={sessionUser}/>
          </Route>
          <Route path="/spots/current">
            <SpotManage user={sessionUser}/>
          </Route>
          <Route path="/bookings/current">
            
          </Route>
          <Route path="/spots/:spotId/edit">
            <SpotEditForm user={sessionUser}/>
          </Route>
          <Route path="/spots/:spotId">
            <SpotShow />
          </Route>
          <Route exact path="/not-found">
            <Forbidden />
          </Route>
          <Route>
            <Forbidden />
          </Route>
          
        </Switch>
      )}
    </>
  );
}

export default App;