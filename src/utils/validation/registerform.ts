import { log } from "console";
import { z } from "zod";

// Defining the file limit and file type
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

export const formSchema: z.ZodSchema = z.object({
    name: z
        .string({ message: 'Name is required' })
        .min(3, { message: 'Name must be at least 3 characters long' }),
    email: z
        .string({ message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    phone: z
        .string({ message: 'Phone number is required' })
        .min(10, { message: 'Phone number must be at least 10 characters long' })
        .max(10, { message: 'Phone number must not exceed 10 characters' }),
    password: z
        .string({ message: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z
        .string({ message: 'Confirm password is required' })
        .min(6, { message: 'Password must be at least 6 characters long' }),
    restaurantName: z
        .string({ message: 'Resturant Name is required' })
        .min(3, { message: 'Resturant Name must be at least 3 characters long' })
        .optional()
        .nullable(),
    restaurantLocation: z
        .string({ message: 'Resturant Location is required' })
        .min(3, { message: 'Resturant Location must be at least 3 characters long' })
        .optional()
        .nullable(),
    termsAndConditions: z
        .boolean({ message: 'Please accept the terms and conditions' }),
    logo: z
        .instanceof(File)
        .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            `Image size should be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
        )
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            `Invalid file type. Only ${ACCEPTED_IMAGE_TYPES.join(', ')} are allowed`,
        )
        .optional()
        .nullable(),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
})


export type FormSchema = z.infer<typeof formSchema>;