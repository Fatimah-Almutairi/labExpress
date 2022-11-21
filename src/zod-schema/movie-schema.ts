import {z, TypeOf} from 'zod';

export const movie = z.object ({
    body: z.object({
        id: z
        .string({ required_error: 'ID is required ..'})
        .min(4, {message: 'Length more than 3'}),
        name: z
        .string({required_error: 'Name is Required ..'})
        .min(4, 'Name Is Required'),
        genre: z
        .enum(['Drama', 'Action','Comedy'],
        { required_error: 'Genre is required !' }),
        rating: z
        .number({required_error: 'Rating is required ..'})
        .min(1).max(5, {message: 'Rating is required less than 5 ..'}),
        duration: z
        .number({required_error: 'duration is required ..'})
        .min(1) .max(60),
    })
})

export type SchemaType = TypeOf<typeof movie>['body'];
