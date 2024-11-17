const express  = require('express');
const router = express();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/authController')
const {signupValidator, loginValidator , sendMailVerificationValidator , passwordResetValidator , updateProfileValidator  , otpMailValidator , verifyOtpValidator} = require('../helper/validator');
const isLogined = require('../middlewires/auth')
router.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype === 'image/jpeg' || 'image/png') {
            cb(null, path.join(__dirname,'../public/images/'))
        } 
    },
    filename: function (req, file, cb) {
      const name = Date.now()+"-"+file.originalname;
      cb(null,name)
    }
  })
  const fileFilter = (req ,file ,cb)=>{
    if(file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null ,false)
    }
  }

  const upload = multer({
    storage: storage,
    fileFilter:fileFilter
   });


  router.post('/register' , upload.single('image') ,signupValidator ,  userController.signupUser )
  router.post('/login' ,loginValidator ,userController.loginUser );

  //authenticatied routes
  router.get('/profile' ,isLogined , userController.userProfile);
  router.post('/updateprofile' , isLogined ,updateProfileValidator , upload.single('image') , userController.updateProfile );
  router.get('/logout' ,isLogined, userController.logout);

module.exports = router;