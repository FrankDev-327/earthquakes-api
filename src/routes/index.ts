import * as express from "express";
import addressRoute from './address.route';
import seismicRoute from './seismic.route';

const router = express.Router();

router.use("/address", addressRoute);
router.use("/earthquake", seismicRoute);

export default router;

