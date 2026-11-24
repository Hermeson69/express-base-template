import { Router } from "express";
import { healthRoutes } from "@/modules/health/health.routes";
import { authRoutes } from "@/modules/auth/auth.routes";
import setupSwagger from "@/shared/swagger";

const routes = Router();

routes.use("/api", healthRoutes);
routes.use("/api", authRoutes);

setupSwagger(routes);

export default routes;
