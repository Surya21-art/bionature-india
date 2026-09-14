import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bionatureRouter from "./bionature";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bionatureRouter);

export default router;
