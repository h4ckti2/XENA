import * as Validator from 'App/Validators'
import * as Repo from 'App/Repos'
import * as Domain from 'App/Domains'

import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessagesController {
  public get = async ({ request, response }: HttpContextContract) => {
    const { id, status } = await request.validate(Validator.Message.Get)

    const maybeMessage = await Repo.Message.get({ id, status })
    if (!maybeMessage)
      return response.noContent()
    
    const message = Domain.Message.fromJSON(maybeMessage)

    return response.ok(message)
  }

  public getMultiple = async ({ request, response, logger }: HttpContextContract) => {
    const { page, status, clientId, withReplies } = await request.validate(Validator.Message.GetMultiple)

    // TEMP START
    if (withReplies) {
      const authHeader = request.header('Authorization')
      if (!authHeader)
      return response.unprocessableEntity({ success: false, message: 'Supply the auth. header.' })
      
      try {
        jwt.verify(authHeader.split('Bearer ')[1], Env.get('TRUSTED_PUBLIC_KEY').replace(/\\n/g, '\n'), { algorithms: ['RS512'] })
      } catch(e) {
        logger.warn(e)
        return response.unauthorized({ success: false })
      }
    }
    // TEMP END

    const maybeMessages = await Repo.Message.getMultiple({ page, status, clientId, noReplies: !withReplies })
    if (!maybeMessages.length)
      return response.noContent()

    const messages = !withReplies
      ? maybeMessages.map(maybeMessage => Domain.Message.fromJSON(maybeMessage))
      : await Promise.all(maybeMessages.map(async maybeMessage => {
          const message = Domain.Message.fromJSON(maybeMessage)
          const replies = await Repo.Message.getMultiple({ replyTo: message.id })
            .then(messages => messages.map(m => Domain.Message.fromJSON(m)))
          return { ...message, replies }
        }))

    return response.ok(messages)
  }

  public insert = async ({ request, response }: HttpContextContract) => {
    const { from, to, toMultiple, subject, content, replyTo } = await request.validate(Validator.Message.Insert)

    toMultiple
      // Insert a message for each of the recipients.
      ? await Promise.all(toMultiple.map(to => Repo.Message.insert(Domain.Message.fromJSON({ from, to, subject, content, status: 'SENT', replyTo }))
        .then(message => Domain.Message.fromJSON(message))))
      // Insert a message for a single recipient.
      : await Repo.Message.insert(Domain.Message.fromJSON({ from, to, subject, content, status: 'SENT', replyTo }))
        .then(message => Domain.Message.fromJSON(message))

    return response.created()
  }

  public ack = async ({ request, response }: HttpContextContract) => {
    const { id } = await request.validate(Validator.Message.Update)

    const maybeMesssage = await Repo.Message.get({ id })
    if (!maybeMesssage)
      return response.notFound({ success: false, message: 'Message not found.' })

    const message = Domain.Message.fromJSON(maybeMesssage)

    await Repo.Message.ack(message.id)

    return response.noContent()
  }

  public delete = async ({ request, response }: HttpContextContract) => {
    const { id } = await request.validate(Validator.Message.Delete)

    const maybeMesssage = await Repo.Message.get({ id })
    if (!maybeMesssage)
      return response.notFound({ success: false, message: 'Message not found.' })

    await Repo.Message.delete(id)

    return response.noContent()
  }
}
