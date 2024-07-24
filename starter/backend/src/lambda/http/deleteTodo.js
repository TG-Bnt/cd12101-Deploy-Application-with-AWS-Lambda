import { getUserId } from "../utils.mjs"
import { deleteTodo } from "../../businessLogic/todos.mjs"
import { createLogger } from "../../utils/logger.mjs"

const logger = createLogger("deleteTodo")

export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)

  logger.info("Deleting todo", { todoId })

  const result = await deleteTodo(userId, todoId)

  return {
    statusCode: 200,
    Headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: result
    })
  }
}

