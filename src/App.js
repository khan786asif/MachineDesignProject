import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./component/Home";
import Designer from "./component/Designer";
import Layman from "./component/Layman";
import CadModel from "./component/CadModel";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/designer", element: <Designer /> },
    { path: "/layman", element: <Layman /> },
    { path: "/cadModel", element: <CadModel /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
