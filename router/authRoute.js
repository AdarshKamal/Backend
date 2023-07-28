import express from "express";

import { 
    registerController,
    loginController,
    testController,
    forgotPasswordController,

} from "../controllers/authController.js"
import  {requireSignIn} from "../middlewares/authmiddleware.js"
import passport from "passport";

const CLIENT_URL= "http://localhost:3000";





//route object
const router= express.Router();
//routing

// router.get("/login/Val", (req, res) => {
// 	if (req.exitinguser) {
// 		res.status(200).json({
// 			error: false,
// 			message: "Successfully Loged In",
// 			user: req.exitinguser,
// 		});
// 	} else {
// 		res.status(403).json({ error: true, message: "Not Authorized" });
// 	}
// });

// router.get("/Homepage", (req, res) => {
// 	res.status(401).json({
// 		error: true,
// 		message: "Log in failure",
// 	});
// });

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/",
	})
);



//register ||method Post
router.post("/register",registerController);
//LOGIN||POST
router.post("/login",loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
// router.get('/test', requireSignIn,isAdmin,testController);
//protected route user
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})


export default router;