import { Suspense, lazy } from "react";
import Layout from "./components/layout/Layout.component";
import { Redirect, Route, Switch } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import SplashScreen from "./components/splash_screen/Splash-Screen.component";
import Loader from "./components/loading_state/Loader.component";
const Posts = lazy(() => import("./components/posts/Posts.component"));
const Create = lazy(() => import("./components/form/Create.component"));

const fetchMemories = async () => {
  try {
    const response = await axios.get("/post");
    const memories = await response.data;
    return memories;
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const { isLoading, error, data: memories, isFetching, refetch } = useQuery(
    "fetchMemories",
    fetchMemories,
    {
      staleTime: Infinity,
    }
  );

  return (
    <Switch>
      <Loader isLoading={isLoading} isFetching={isFetching}>
        <Layout>
          <Suspense fallback={<SplashScreen />}>
            <Route exact path="/">
              <Redirect to="/posts" />
            </Route>
            <Route path="/posts">
              <Posts
                refetch={refetch}
                isLoading={isLoading}
                memories={memories}
                error={error}
                isFetching={isFetching}
              />
            </Route>
            <Route path="/create">
              <Create refetch={refetch} />
            </Route>
          </Suspense>
        </Layout>
      </Loader>
    </Switch>
  );
}

export default App;
