import {z, TypeOf} from 'zod';

export const Bank = z.object ({
    body: z.object({
        id: z
        .string({ required_error: 'ID is required ..'})
        .min(4, {message: 'Length more than 3'}),
        username: z
        .string({required_error: 'Username is Required ..'})
        .min(7, 'Username Is Required'),
        password: z
        .string({ required_error: 'Password is required ..'})
        .regex(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`)),
        balance: z
        .number({required_error: 'GPA is required ..'})
    })
})

export type SchemaType = TypeOf<typeof Bank>['body'];
