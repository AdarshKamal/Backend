import { Router } from "express";
import  {requireSignIn} from "../middlewares/authmiddleware.js";
const router = Router();

/** import controllers */
import * as controller from '../controllers/controller.js';

/** Questions Routes API */

router.route('/questions', requireSignIn,)
        .get(controller.getQuestions, requireSignIn,) /** GET Request */
        .post(controller.insertQuestions, requireSignIn,) /** POST Request */
        .delete(controller.dropQuestions, requireSignIn,) /** DELETE Request */

router.route('/results', requireSignIn,)
        .get(controller.getResult, requireSignIn,)
        .post(controller.storeResult, requireSignIn,)
        .delete(controller.dropResult, requireSignIn,)

export default router;