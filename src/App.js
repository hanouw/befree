import "./App.css";
import ErrorPage from "./pages/ErrorPage";
import Router from "./routes/indexRouter";
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Router />
      </ErrorBoundary>
    </div>
  );
}

export default App;
