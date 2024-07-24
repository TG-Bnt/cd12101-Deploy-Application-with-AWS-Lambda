import { getUserId } from "../utils.mjs"
import { updateTodo } from "../../businessLogic/todos.mjs"
import { createLogger } from "../../utils/logger.mjs"

const logger = createLogger("updateTodo")

export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)
  const userId = getUserId(event)

  logger.info("Updating todo", { userId, todoId, updatedTodo })

  const result = await updateTodo(userId, todoId, updatedTodo)
  
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
