import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AdminHome from "./pages/AdminHome";
import NotFound from "./pages/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {localStorage.getItem("user_login") && (
          <Route path="/admin/home" element={<AdminHome />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
// const AppRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   ...(localStorage?.getItem("user_login") && {
//     path: "/admin/home",
//     element: <AdminHome />,
//   }),
// ]);

export default AppRouter;
