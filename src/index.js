import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import SplashScreen from "./components/splash_screen/Splash-Screen.component";
import App from "./App";
import "./index.css";

//added default baseUrl to every http request
//https://powerful-tor-86910.herokuapp.com
// http://localhost:5000
axios.defaults.baseURL = "https://powerful-tor-86910.herokuapp.com";
//added default config for header prop for every post request i.e Content-Type
axios.defaults.headers.post["Content-Type"] = "application/json";
//added default config for header prop for every post request i.e Accept
axios.defaults.headers.post["Accept"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<SplashScreen />}>
        <Router>
          <App />
        </Router>
      </Suspense>
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);
