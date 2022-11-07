import { Route, Switch, useLocation } from "wouter";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AxiosProvider } from "./context/axios-context";
import MainTemplate from "./templates/Main";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";

const queryClient = new QueryClient();

// https://community.auth0.com/t/why-is-authentication-lost-after-refreshing-my-single-page-application/56276
const providerConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  redirectUri: window.location.origin,
};

const App = () => {
  const [, setLocation] = useLocation();

  const onRedirectCallback = (appState: any) => {
    setLocation(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      {...providerConfig}
      useRefreshTokens
      cacheLocation="localstorage" // Note: use if "Third-party cookies are disabled in your browser"
      onRedirectCallback={onRedirectCallback}
    >
      <AxiosProvider>
        <QueryClientProvider client={queryClient}>
          <MainTemplate>
            <Switch>
              <Route path="/" component={HomePage} />
              <Route
                path="/create"
                component={() => <h1>Welcome to create page!</h1>}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </MainTemplate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AxiosProvider>
    </Auth0Provider>
  );
};

export default App;
