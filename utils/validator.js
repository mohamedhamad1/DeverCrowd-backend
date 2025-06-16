const { body } = require("express-validator");

const projectValidtor = () => [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
  body("timetofinish")
    .notEmpty()
    .withMessage("Time to finish is required")
    .isLength({ min: 2 }),
  body("sponser")
    .notEmpty()
    .withMessage("Sponsor is required")
    .isEmail()
    .withMessage("Sponsor must be a valid email"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Done", "InProgress", "Pending"])
    .withMessage("Invalid status"),
  body("pic").optional().isURL().withMessage("Invalid image URL"),
];

const messageValidtor = () => [
  body("username").notEmpty().isLength({ min: 2 }),
  body("email").notEmpty().isEmail(),
  body("numberphone")
    .notEmpty()
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  body("description").notEmpty().isLength({ min: 10 }),
  body("title").notEmpty().isLength({ min: 3 }),
  body("knownby").notEmpty().isLength({ min: 2 }),
];

const commentValidtor = () => [
  body("username").notEmpty().isLength({ min: 2 }),
  body("email").notEmpty().isEmail(),
  body("numberphone").notEmpty().isMobilePhone(),
  body("description").notEmpty().isLength({ min: 5 }),
  body("title").notEmpty().isLength({ min: 2 }),
  body("knownby").notEmpty().isLength({ min: 2 }),
];

const taskValidtor = () => [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 }),
  body("description").notEmpty().isLength({ min: 10 }),
  body("deadline")
    .notEmpty()
    .isISO8601()
    .withMessage("Invalid deadline format"),
  body("assignedTo").notEmpty().isLength({ min: 2 }),
  body("status").optional().isIn(["Done", "InProgress", "Pending"]),
  body("references").notEmpty().isLength({ min: 2 }),
  body("type").notEmpty().isLength({ min: 2 }),
];

const loginValidator = () => [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 }),
  body("password")
    .notEmpty()
    .isLength({ min: 6, max: 24 })
    .matches(/[A-Z]/)
    .withMessage("Must contain uppercase")
    .matches(/[a-z]/)
    .withMessage("Must contain lowercase")
    .matches(/[0-9]/)
    .withMessage("Must contain number")
    .matches(/[^a-zA-Z0-9]/)
    .withMessage("Must contain special character"),
];

const registerValidator = () => [
  body("username")
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/),
  body("password")
    .notEmpty()
    .isLength({ min: 6, max: 24 })
    .matches(/[A-Z]/)
    .matches(/[a-z]/)
    .matches(/[0-9]/)
    .matches(/[^a-zA-Z0-9]/),
  body("role")
    .notEmpty()
    .isLength({ min: 1, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/),
  body("nickname")
    .notEmpty()
    .isLength({ min: 2, max: 20 })
    .matches(/^[a-zA-Z]+$/),
];

module.exports = {
  projectValidtor,
  messageValidtor,
  commentValidtor,
  loginValidator,
  registerValidator,
  taskValidtor,
};
