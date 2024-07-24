import AWS from 'aws-sdk';
import AWSXRay from 'aws-xray-sdk';

import { createLogger } from "../utils/logger.mjs"

const todosTable = process.env.TODOS_TABLE
const todosIndex = process.env.TODOS_CREATED_AT_INDEX
const logger = createLogger("todosAccess")

const XAWS = AWSXRay.captureAWS(AWS);
const docClient = new XAWS.DynamoDB.DocumentClient();

export class TodoAccess{
    async getTodos(userId) {
        logger.info(`Getting todos for user ${userId}`)
        await docClient.query({
            TableName: todosTable,
            IndexName: todosIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise();
    }

    async createTodo(todo) {
        logger.info(`Creating todo ${todo.todoId} for user ${todo.userId}`)
        await docClient.put({
            TableName: todosTable,
            Item: todo
        }).promise();
    }

    async updateTodo(userId, todoId, todo) {
        logger.info(`Updating todo ${todoId} for user ${userId}`)
        await docClient.update({
            TableName: todosTable,
            Key: {
                todoId,
                userId
            },
            UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
            ExpressionAttributeValues: {
                ':name': todo.name,
                ':dueDate': todo.dueDate,
                ':done': todo.done
            },
            ExpressionAttributeNames: {
                '#name': 'name'
            }
        }).promise();
    }

    async deleteTodo(todoId, userId) {
        logger.info(`Deleting todo ${todoId} for user ${userId}`)
        await docClient.delete({
            TableName: todosTable,
            Key: {
                todoId,
                userId
            }
        }).promise();
    }
}