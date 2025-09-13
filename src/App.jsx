import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import { Products } from "./products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Products />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
