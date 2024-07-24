import { v4 as uuidv4 } from "uuid"
import { TodoAccess } from "../dataLayer/todoAccess.mjs"
import { AttachmentUtils } from "../fileStorage/s3AttachmentUtils.mjs"

import { createLogger } from "../utils/logger.mjs"

const todoAccess = new TodoAccess();
const attachmentUtils = new AttachmentUtils();
const logger = createLogger("todos")

export async function getTodos(userId) {
    logger.info(`Getting todos for user ${userId}`)
    return await todoAccess.getTodos(userId)
}

export async function createTodo(userId, newTodo) {
    logger.info(`Creating todo for user ${userId}`)
    const id = uuidv4()
    const item = {
        userId: userId,
        todoId: id,
        createdAt: new Date().toISOString(),
        done: false,
        attachementUrl: attachmentUtils.getAttachmentUrl(id),
        ...newTodo
    }

    await todoAccess.createTodo(item)
    return item
}

export async function updateTodo(userId, todoId, updatedTodo) {
    logger.info(`Updating todo ${todoId} for user ${userId}`)
    const item = {
        userId: userId,
        todoId: todoId,
        ...updatedTodo
    }

    await todoAccess.updateTodo(userId, todoId, item)
    return item
}

export async function deleteTodo(userId, todoId) {
    logger.info(`Deleting todo ${todoId} for user ${userId}`)
    const item = {
        userId: userId,
        todoId: todoId
    }

    await todoAccess.deleteTodo(item, userId)
    return item
}

export async function generatePresignedUrl(todoId) {
    return await attachmentUtils.getPresignedUrl(todoId)
}