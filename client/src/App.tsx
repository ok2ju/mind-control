import { Route, Redirect, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import MainTemplate from './templates/Main';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainTemplate>
        <Switch>
          <Route path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={HomePage} />
          <Route path="/create" component={() => <h1>Welcome to create page!</h1>} />
          <Route component={NotFoundPage} />
        </Switch>
      </MainTemplate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
