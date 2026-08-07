import {Router} from "express"
import {getRestaurant,getFeaturedRestaurant,getRestaurantBySlug,getRestaurantAvailability} from  "../controllers/restaurantController.js"

const restaurantRouter = Router();
 restaurantRouter.get("/",getRestaurant);
 restaurantRouter.get("/featured",getFeaturedRestaurant);
 restaurantRouter.get("/:slug",getRestaurantBySlug);
 restaurantRouter.get("/:availability",getRestaurantAvailability);

 export default restaurantRouter;