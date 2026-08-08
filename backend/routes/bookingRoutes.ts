import {Router } from "express"
import {protect} from "../middlewares/auth.js";
import {createBooking,getMyBookings,cancelBookings} from "../controllers/bookingController.js";

const bookingRouter =Router();

bookingRouter.post("/",protect,createBooking)
bookingRouter.get("/my",protect,getMyBookings)
bookingRouter.put("/:id/cancel",protect,cancelBookings)

export default bookingRouter
