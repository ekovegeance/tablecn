import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    label: z.string(),
    priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>

export const postSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, "Title must be at least 2 characters long"),
    tags: z.string().optional()
})
export type Post = z.infer<typeof postSchema>