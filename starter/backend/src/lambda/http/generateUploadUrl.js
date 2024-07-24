import { createLogger } from "../../utils/logger.mjs"
import { generatePresignedUrl } from "../../businessLogic/todos.mjs"

const logger = createLogger("generateUploadUrl")

export function handler(event) {
  const todoId = event.pathParameters.todoId

  logger.info("Generating upload url", { todoId })

  const uploadUrl = generatePresignedUrl(todoId)

  return {
    statusCode: 201,
    Headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl
    })
  }
}

