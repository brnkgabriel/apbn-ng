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

const TeamCollection = defineCollection({
  type: "content",
  schema: z.object({
    order: z.string(),
    name: z.string(),
    acronym: z.string().optional(),
    role: z.string(),
    picture: z.string(),
    body: z.string().optional()
  })
})

const SlidersCollection = defineCollection({
  type: "content",
  schema: z.object({
    active: z.boolean(),
    date: z.string(),
    name: z.string(),
    time: z.string(),
    venue: z.string(),
    theme: z.string(),
    host: z.string(),
    chairman: z.string(),
    keynotespeaker: z.string(),
    videourl: z.string().optional(),
    image: z.string(),
    type: z.string(),
    body: z.string().optional()
  })
})

export const collections = {
  "members": MembersCollection,
  "events": EventsCollection,
  "team": TeamCollection
}