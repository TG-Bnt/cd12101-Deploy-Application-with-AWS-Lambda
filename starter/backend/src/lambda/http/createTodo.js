import { getUserId } from "../utils.mjs"
import { createTodo } from "../../businessLogic/todos.mjs"
import { createLogger } from "../../utils/logger.mjs"

const logger = createLogger("createTodo")

export async function handler(event) {
  const newTodo = JSON.parse(event.body)
  const userId = getUserId(event)

  logger.info("Creating new todo", { userId, newTodo })

  const result = await createTodo(userId, newTodo)

  return {
    statusCode: 201,
    Headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: result
    })
  }
}

