import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductsPage from "./products";
import SubCategoryPage from "./components/subPage";
import MainLayout from "./layout/main-layout";
import SubCategoryPages from "./layout/all-child";

function App() {
  return (
    <Routes>
      {/* Main layout */}
      <Route path="/" element={<MainLayout />}>
        {/* Index page = All Parents */}
        <Route index element={<ProductsPage />} />

        {/* SubCategory Page = alohida page */}
        <Route path="subpage/:parentId" element={<SubCategoryPage />} />
        <Route path="subcategorypage" element={<SubCategoryPages />} />
      </Route>
    </Routes>
  );
}

export default App;
