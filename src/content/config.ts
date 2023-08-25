import { defineCollection, z } from "astro:content";

const MembersCollection = defineCollection({
  type: "content",
  schema: z.object({
    acronym: z.string(),
    fullname: z.string(),
    category: z.string(),
    website: z.string(),
    logo: z.string()
  })
})

const EventsCollection = defineCollection({
  type: "content",
  schema: z.object({
    active: z.boolean(),
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    image: z.string().optional(),
    audiourl: z.string().optional(),
    videourl: z.string().optional(),
    body: z.string().optional()
  })
})

export const collections = {
  "members": MembersCollection,
  "events": EventsCollection
}