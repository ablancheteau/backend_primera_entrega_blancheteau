import { Router } from "express";

const router = Router()

router.get('/',(req,res)=>{
    res.render('login')
});

router.get("/profile-github", isAuth, (req, res) => {
    console.log("req.user", req.user);
    const user = req.user.toObject();
    res.render("profile", { user });
  });

export default router