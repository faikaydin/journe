import c from "./App.module.scss";
import { Outlet } from "react-router-dom";

import Nav from "./components/utils/nav/Nav";
import DataProvider from "./components/providers/DataProvider";

function App() {
  return (
    <DataProvider>
      <div className={c.layout}>
        <Nav /> <Outlet />
      </div>
    </DataProvider>
  );
}
export default App;
