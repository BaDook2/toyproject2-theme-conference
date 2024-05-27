import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./components/Header";

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/nomadCoder-reactJS-Graduation" element={<Home />}>
            <Route path="movies/:id"></Route>
          </Route>
          <Route path="/nomadCoder-reactJS-Graduation/tv" element={<Tv />}>
            <Route
              path="/nomadCoder-reactJS-Graduation/tv/:id"
              element={<Tv />}
            ></Route>
          </Route>
          <Route
            path="/nomadCoder-reactJS-Graduation/search"
            element={<Search />}
          ></Route>
        </Routes>
      </Router>
  );
}

export default App;
