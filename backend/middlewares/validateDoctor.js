// doctorValidation.mjs (or doctorValidation.js if you set "type": "module" in package.json)
import { body, validationResult } from 'express-validator';

export const validateDoctor = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    body('designation').notEmpty().withMessage('Designation is required'),
    body('slot').notEmpty().withMessage('Slot is required'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('specializations').isArray().withMessage('Specializations must be an array'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];