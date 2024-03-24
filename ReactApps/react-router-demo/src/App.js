import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/Items";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import ItemDetails from "./pages/ItemDetails";
import Error from "./pages/Error";

function App() {
  // first method, preferred
  const appRouter1 = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> }, // preferred method
        // writing variations for this particular route
        // { path: "/", element: <Home /> },
        // { path: "", element: <Home /> },
        {
          path: "items", // here element is not provided
          // as we don't want to outlet on the same page but go to an entirely different page
          children: [
            { index: true, element: <Items /> },
            { path: ":id", element: <ItemDetails /> },
          ],
        }, // "/items" is aboslute path, "items" is relative path
        { path: "about", element: <About /> },
      ],
    },
  ]);

  // second method, internally converted to first method
  const appRoutes = createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="items" element={<Items />} />
        <Route path="about" element={<About />} />
      </Route>
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
