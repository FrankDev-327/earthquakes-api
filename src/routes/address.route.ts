import * as express from "express";
import { AddressController } from "../controllers/address.controller";
import { IAddressPaginationPayload } from "../interfaces/address.pagination.interface";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Addresses
 *     description: Endpoints related to address data
 * /address:
 *   get:
 *     summary: List all addresses
 *     description: Returns a list of all addresses
 *     tags: [Addresses]
 *     responses:
 *       200:
 *         description: List of all addresses
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
router.get("/",  async (req, res) => {
    const controller = new AddressController();
    const response = await controller.getListAddresses();
    return res.send(response);
});

/**
 * @swagger
 * tags:
 *   - name: Addresses
 *     description: Endpoints related to address data
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
 * /address/paginate:
 *   get:
 *     summary: Get paginated address data
 *     description: Returns paginated address data using skip and take parameters
 *     tags: [Addresses]
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
 *         description: List of addresses with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                     updatedDated:
 *                       type: string
 *                       format: date-time
 *                     country:
 *                       type: string
 *                     city:
 *                       type: string
 *                     district:
 *                       type: string
 *                     neighbourhood:
 *                       type: string
 *                     street:
 *                       type: string
 *                     country_code:
 *                       type: string
 *               paginationInfo:
 *                 type: integer
 */
router.get("/paginate",  async (req, res) => {
  const controller = new AddressController();
  const payload: IAddressPaginationPayload = {
      skip: parseInt(req.query.skip as string),
      take: parseInt(req.query.take as string),
  };

  const response = await controller.getAddressPaginationData(payload);
  return res.send(response);
});

/**
 * @swagger
 * tags:
 *   - name: Addresses
 *     description: Endpoints related to address data
 * /address/{id}:
 *   get:
 *     summary: Get address details by ID
 *     description: Returns details of an address based on its ID
 *     tags: [Addresses]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the address
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                 updatedDated:
 *                   type: string
 *                   format: date-time
 *                 country:
 *                   type: string
 *                 city:
 *                   type: string
 *                 district:
 *                   type: string
 *                 neighbourhood:
 *                   type: string
 *                 street:
 *                   type: string
 *                 country_code:
 *                   type: string
 */
router.get("/:id",  async (req, res) => {
  const controller = new AddressController();
  const response = await controller.getAddressDetailsById(req.params.id);
  console.log();
  
  return res.send(response);
});

export default router;