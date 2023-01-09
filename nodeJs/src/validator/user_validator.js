const {body,query} =require('express-validator');

const registerValidation = () => {
    return [
        body("nameSurname").isLength({ min: 3 }).withMessage("Please enter valid fullname."),
        body("username").isLength({ min: 2 }).withMessage("Please enter valid username."),
        body("email").isEmail().withMessage("Please enter valid email."),
        body("telephone").isLength({ min: 6 }).withMessage("Please enter valid telephone."),
        body("password").isLength({ min: 8 }).withMessage("Please enter valid password."),
    ];
};

module.exports=registerValidation
