import {z, TypeOf} from 'zod';

export const Student = z.object ({
    body: z.object({
        id: z
        .string({ required_error: 'ID is required ..'})
        .min(4, {message: 'Length more than 3'}),
        name: z
        .string({required_error: 'Name is Required ..'})
        .min(4, 'Name Is Required'),
        major: z
        .enum(['IT', 'IS','CS', 'SWE'],
        { required_error: 'Major is required !' }),
        level: z
        .number({required_error: 'Level is required ..'})
        .min(1).max(8, {message: 'Level is required less than 5 ..'}),
        GPA: z
        .number({required_error: 'GPA is required ..'})
        .min(0) .max(5),
    })
})

export type SchemaType = TypeOf<typeof Student>['body'];
