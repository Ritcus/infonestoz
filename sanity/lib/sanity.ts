
import { client } from "./client"

export async function testSanityConnection() {
    try {
      const data = await client.fetch('*[_type == "post"][0]')
      console.log("Sanity connection successful ✅", data)
    } catch (error) {
      console.error("Sanity connection failed ❌", error)
    }
  }