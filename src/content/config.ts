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
    date: z.date().optional(),
    name: z.string(), 
    venue: z.string().optional(),
    map: z.string().optional(),
    theme: z.string().optional(),
    host: z.string().optional(),
    chairman: z.string().optional(),
    keynotespeaker: z.string().optional(),
    facilitator1: z.string().optional(),
    facilitator2: z.string().optional(),
    facilitator3: z.string().optional(),
    facilitator4: z.string().optional(),
    videourl: z.string().optional(),
    dkimage: z.string().optional(),
    mbimage: z.string().optional(),
    image: z.string().optional(),
    type: z.string(),
    website: z.string().optional(),
    body: z.string().optional()
  })
})

export const collections = {
  "members": MembersCollection,
  "events": EventsCollection,
  "team": TeamCollection,
  "sliders": SlidersCollection
}