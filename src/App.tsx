import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import JobModal from "./components/search/JobModal";

import Map from "./components/map/Map";
import Search from "./components/search/Search";
import logo from "./images/adzuna_logo.svg";

function App() {
  return (
    <div className="App">
      <main className="main_container">
        <div className="title">
          <img src={logo} alt="adzuna" />
          <div className="title_text">Jobs Search</div>
        </div>

        <Search />
        <Map />
        <JobModal />
      </main>
    </div>
  );
}

export default App;
