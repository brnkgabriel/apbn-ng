import { defineCollection, z } from "astro:content";

const MembersCollection = defineCollection({
  type: "content",
  schema: z.object({
    acronym: z.string(),
    fullname: z.string(),
    category: z.string(),
    url: z.string(),
    logo: z.string()
  })
})

export const collections = {
  "members": MembersCollection
}