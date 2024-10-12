import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./views/_layout";
import Punks from "./views/Punks";
import Details from "./views/Details";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/punks" element={<Punks />} />
        <Route path="/punks/:tokenid" element={<Details />} />
      </Routes>
    </Layout>
  );
}

export default App;
