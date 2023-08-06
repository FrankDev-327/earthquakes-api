import * as express from "express";
import { IAddressPayload } from "../interfaces/address.interface";
import { AddressController } from "../controllers/address.controller";

const router = express.Router();

router.get("/",  async (req, res) => {
    const controller = new AddressController();
    const response = await controller.getListAddresses();
    return res.send(response);
  });


  export default router;