import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { authRoutes, publicRoutes } from "./routes";
import { MAIN_ROUTE } from "./utils/consts";
import { useContext } from "react";
import { Context } from "@/main";

export function AppRouter() {
  const { user } = useContext(Context);

  const navigate = useNavigate();

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path="*" element={<Navigate replace to={MAIN_ROUTE} />} Route />
    </Routes>
  );
}
