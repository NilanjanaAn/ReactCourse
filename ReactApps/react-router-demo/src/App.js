import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/Items";
import About from "./pages/About";

function App() {

  // first method, preferred
  const appRouter1 = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/items", element: <Items /> },
    { path: "/about", element: <About /> },
  ]);

  // second method, internally converted to first method
  const appRoutes = createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/about" element={<About />} />
    </>
  );
  const appRouter2 = createBrowserRouter(appRoutes);

  return (
    <>
      <RouterProvider router={appRouter1} />
    </>
  );
}

export default App;
