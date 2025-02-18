import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Components/pages/Home";
import Home2 from "../Components/pages/Home2";



const router=createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout></Mainlayout>,
        children:[
            {
                path:'/',
                // element:<Home></Home>
                element:<Home2></Home2>
            },
            
        ]
    }
]);
export default router;