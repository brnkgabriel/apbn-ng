import type { APIRoute } from "astro";
import type { iOptions } from "~/types";
import { set } from "./firestore";

export const post: APIRoute = async ({ request }) => {
  try {
    
    const body = await request.json() as iOptions

    const response = await set(body)
    const status = { status: 200 }

    return new Response(JSON.stringify(response), status)
  } catch (error: any) {
    const response = {
      error: true,
      success: false,
      message: error.message
    }
    const status = { status: 400 }

    return new Response(JSON.stringify(response), status)
  }

}

export const get: APIRoute = ({ params, request }) => {
  return {
    body: JSON.stringify({
      message: `testimonies`,
    })
  }
}