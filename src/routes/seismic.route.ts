import * as express from "express";
import { IBetweenDatePayload } from "../interfaces/between.date";
import { SeismicController } from "../controllers/seismic.controller";
import { IPaginationPayload } from "../interfaces/pagination.interface";

const router = express.Router();

router.get("/",  async (req, res) => {
    const controller = new SeismicController();
    const payload: IPaginationPayload = {
        skip: parseInt(req.query.skip as string),
        take: parseInt(req.query.take as string),
    };

    const response = await controller.getPaginationEarthquakeData(payload);
    return res.send(response);
  });

  router.get("/:id",  async (req, res) => {
    const controller = new SeismicController();
    const response = await controller.getSeismicDetails(req.params.id);
    return res.send(response);
  });

  router.get("/search/:startDate/:endDate",  async (req, res) => {
    const controller = new SeismicController();
    const response = await controller.getSeismicBetweenDates(req.params);
    return res.send(response);
  });

export default router;
