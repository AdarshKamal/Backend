import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import passport from "passport";
import dotenv  from "dotenv";
import userModel from "./models/userModel.js"


dotenv.config();
GoogleStrategy.prototype.authorizationParams = function (options) {
	return { debug: true };
  };

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/api/v1/auth/google/callback",
			scope: ["profile", "email"],
		},
		async (_accessToken, _refreshToken, profile, done)=>{
			try{
			const existingUser =await userModel.findById(profile.id)
			//existing user
				  if(existingUser){
					  return done(null,existingUser);
					}
				 // register user
		        else{
				
				 //save
				 const newUser = await userModel.create({
					name:profile.displayName,
					email:profile.emails[0].value,
					
				    _id:profile.id,});
			   
		    return done(null,newUser);
			  }}catch (err) {
				return done(err, false);
			  }
			
			}
			
	)
);

passport.serializeUser((user, done) => {
	done(null,user.id);
});

passport.deserializeUser(async(id , done) => {
	const existingUser= await userModel.findById(id);
	done(null, existingUser);
});


 