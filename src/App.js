// Importing the Context
import { Provider as DataProvider } from "./context/dataContext";

// Importing the components
import HomeScreen from "./components/HomeScreen";

function App() {
  return (
    <DataProvider>
      <HomeScreen />
    </DataProvider>
  );
}

export default App;
