import { getUserId } from "../utils.mjs"
import { getTodos } from "../../businessLogic/todos.mjs"
import { createLogger } from "../../utils/logger.mjs"

const logger = createLogger("getTodos")

export async function handler(event) {
  const userId = getUserId(event)
  logger.info(`Getting todos for user ${userId}`)

  const result = await getTodos(userId)

  return {
    statusCode: 200,
    Headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: result
    })
  }
}
