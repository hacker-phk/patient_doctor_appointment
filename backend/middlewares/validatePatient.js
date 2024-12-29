import { body, validationResult } from 'express-validator';

export const validatePatient = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('age')
        .notEmpty().withMessage('Age is required')
        .isInt({ min: 0, max: 120 }).withMessage('Age must be a positive integer and realistic'),
    body('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
    body('address')
        .notEmpty().withMessage('Address is required')
        .isLength({ min: 5 }).withMessage('Address must be at least 5 characters long'),
    body('phoneNumber')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Please provide a valid phone number'),
    body('bloodGroup')
        .notEmpty().withMessage('Blood group is required')
        .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).withMessage('Invalid blood group'),
    body('medicalHistory')
        .optional() // Allow medical history to be optional
        .isString().withMessage('Medical history must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
