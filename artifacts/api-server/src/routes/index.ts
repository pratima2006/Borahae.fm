import { Router, type IRouter } from "express";
import healthRouter from "./health";
import borahaeRouter from "./borahae";

const router: IRouter = Router();

router.use(healthRouter);
router.use(borahaeRouter);

export default router;
