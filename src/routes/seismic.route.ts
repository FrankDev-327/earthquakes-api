import * as express from "express";
import { SeismicController } from "../controllers/seismic.controller";
import { IPaginationPayload } from "../interfaces/pagination.interface";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Earthquakes
 *     description: Endpoints related to earthquake data
 * parameters:
 *   - name: skip
 *     in: query
 *     description: Number of records to skip
 *     required: false
 *     schema:
 *       type: integer
 *   - name: take
 *     in: query
 *     description: Number of records to take
 *     required: false
 *     schema:
 *       type: integer
 * /earthquake:
 *   get:
 *     summary: Get earthquake data with optional pagination
 *     description: Returns earthquake data with optional pagination using skip and take parameters
 *     tags: [Earthquakes]
 *     parameters:
 *       - name: skip
 *         in: query
 *         description: Number of records to skip
 *         required: false
 *         schema:
 *           type: integer
 *       - name: take
 *         in: query
 *         description: Number of records to take
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of earthquakes with optional pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                   updatedDated:
 *                     type: string
 *                     format: date-time
 *                   type:
 *                     type: string
 *                   geometry:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       coordinates:
 *                         type: array
 *                         items:
 *                           type: number
 *                   lastupdate:
 *                     type: string
 *                     format: date-time
 *                   magtype:
 *                     type: string
 *                   evtype:
 *                     type: string
 *                   lon:
 *                     type: string
 *                   auth:
 *                     type: string
 *                   source_id:
 *                     type: string
 *                   depth:
 *                     type: string
 *                   unid:
 *                     type: string
 *                   mag:
 *                     type: string
 *                   time:
 *                     type: string
 *                     format: date-time
 *                   lat:
 *                     type: string
 *                   source_catalog:
 *                     type: string
 *                   flynn_region:
 *                     type: string
 *                   id_feature:
 *                     type: string
 */
router.get("/",  async (req, res) => {
    const controller = new SeismicController();
    const payload: IPaginationPayload = {
        skip: parseInt(req.query.skip as string),
        take: parseInt(req.query.take as string),
    };

    const response = await controller.getPaginationEarthquakeData(payload);
    return res.send(response);
  });

/**
 * @swagger
 * tags:
 *   - name: Earthquakes
 *     description: Endpoints related to earthquake data
 * /earthquake/{id}:
 *   get:
 *     summary: Get earthquake details by ID
 *     description: Returns details of an earthquake based on its ID
 *     tags: [Earthquakes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the earthquake
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the earthquake
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                   updatedDated:
 *                     type: string
 *                     format: date-time
 *                   type:
 *                     type: string
 *                   geometry:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       coordinates:
 *                         type: array
 *                         items:
 *                           type: number
 *                   lastupdate:
 *                     type: string
 *                     format: date-time
 *                   magtype:
 *                     type: string
 *                   evtype:
 *                     type: string
 *                   lon:
 *                     type: string
 *                   auth:
 *                     type: string
 *                   source_id:
 *                     type: string
 *                   depth:
 *                     type: string
 *                   unid:
 *                     type: string
 *                   mag:
 *                     type: string
 *                   time:
 *                     type: string
 *                     format: date-time
 *                   lat:
 *                     type: string
 *                   source_catalog:
 *                     type: string
 *                   flynn_region:
 *                     type: string
 *                   id_feature:
 *                     type: string
 */
  router.get("/:id",  async (req, res) => {
    const controller = new SeismicController();
    const response = await controller.getSeismicDetails(req.params.id);
    return res.send(response);
  });

  /**
 * @swagger
 * tags:
 *   - name: Earthquakes
 *     description: Endpoints related to earthquake data
 * parameters:
 *   - name: startDate
 *     in: path
 *     description: Start date for filtering earthquakes
 *     required: true
 *     schema:
 *       type: string
 *       format: date
 *   - name: endDate
 *     in: path
 *     description: End date for filtering earthquakes
 *     required: true
 *     schema:
 *       type: string
 *       format: date
 * /earthquake/search/{startDate}/{endDate}:
 *   get:
 *     summary: Search earthquakes within a date range
 *     description: Returns earthquake data within the specified date range
 *     tags: [Earthquakes]
 *     parameters:
 *       - name: startDate
 *         in: path
 *         description: Start date for filtering earthquakes
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - name: endDate
 *         in: path
 *         description: End date for filtering earthquakes
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of earthquakes within the specified date range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                   updatedDated:
 *                     type: string
 *                     format: date-time
 *                   type:
 *                     type: string
 *                   geometry:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       coordinates:
 *                         type: array
 *                         items:
 *                           type: number
 *                   lastupdate:
 *                     type: string
 *                     format: date-time
 *                   magtype:
 *                     type: string
 *                   evtype:
 *                     type: string
 *                   lon:
 *                     type: string
 *                   auth:
 *                     type: string
 *                   source_id:
 *                     type: string
 *                   depth:
 *                     type: string
 *                   unid:
 *                     type: string
 *                   mag:
 *                     type: string
 *                   time:
 *                     type: string
 *                     format: date-time
 *                   lat:
 *                     type: string
 *                   source_catalog:
 *                     type: string
 *                   flynn_region:
 *                     type: string
 *                   id_feature:
 *                     type: string
 *                   address:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       createdDate:
 *                         type: string
 *                         format: date-time
 *                       updatedDated:
 *                         type: string
 *                         format: date-time
 *                       country:
 *                         type: string
 *                       city:
 *                         type: string
 *                       district:
 *                         type: string
 *                       neighbourhood:
 *                         type: string
 *                       street:
 *                         type: string
 *                       country_code:
 *                         type: string
 */
  router.get("/search/:startDate/:endDate",  async (req, res) => {
    const controller = new SeismicController();
    const response = await controller.getSeismicBetweenDates(req.params);
    return res.send(response);
  });

  /**
 * @swagger
 * tags:
 *   - name: Earthquakes
 *     description: Endpoints related to places data
 * /earthquake/place/{country}:
 *   get:
 *     summary: Get addresses by country
 *     description: Returns a list of addresses for a specific country
 *     tags: [Earthquakes]
 *     parameters:
 *       - name: country
 *         in: path
 *         description: Country code for filtering addresses
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of addresses for the specified country
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                   updatedDated:
 *                     type: string
 *                     format: date-time
 *                   country:
 *                     type: string
 *                   city:
 *                     type: string
 *                   district:
 *                     type: string
 *                   neighbourhood:
 *                     type: string
 *                   street:
 *                     type: string
 *                   country_code:
 *                     type: string
 */
  router.get("/place/:country",  async (req, res) => {
    const controller = new SeismicController();
    const response = await controller.getSeismicByCountryData(req.params.country);
    return res.send(response);
  });

  /**
 * @swagger
 * tags:
 *   - name: Earthquakes
 *     description: Endpoints related to earthquake data
 * /earthquake/country-range/{place}/{extent}:
 *   get:
 *     summary: Get earthquake data by country and time range
 *     description: Returns earthquake data for a specific country and time range
 *     tags: [Earthquakes]
 *     parameters:
 *       - name: place
 *         in: path
 *         description: Country code for filtering earthquakes
 *         required: true
 *         schema:
 *           type: string
 *       - name: extent
 *         in: path
 *         description: Time extent for filtering earthquakes (year, month, days, 24h)
 *         required: true
 *         schema:
 *           type: string
 *           enum: [year, month, days, 24h]
 *     responses:
 *       200:
 *         description: List of earthquakes for the specified country and time range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                   updatedDated:
 *                     type: string
 *                     format: date-time
 *                   type:
 *                     type: string
 *                   geometry:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       coordinates:
 *                         type: array
 *                         items:
 *                           type: number
 *                   lastupdate:
 *                     type: string
 *                     format: date-time
 *                   magtype:
 *                     type: string
 *                   evtype:
 *                     type: string
 *                   lon:
 *                     type: string
 *                   auth:
 *                     type: string
 *                   source_id:
 *                     type: string
 *                   depth:
 *                     type: string
 *                   unid:
 *                     type: string
 *                   mag:
 *                     type: string
 *                   time:
 *                     type: string
 *                     format: date-time
 *                   lat:
 *                     type: string
 *                   source_catalog:
 *                     type: string
 *                   flynn_region:
 *                     type: string
 *                   id_feature:
 *                     type: string
 */
  router.get("/country-range/:place/:extent",  async (req, res) => {
    const controller = new SeismicController();
    const response = await controller.getSeismicByRangeData(req.params);
    return res.send(response);
  });

export default router;
