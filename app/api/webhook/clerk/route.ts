import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, updateUser } from '@/lib/actions/user.actions'
import { NextResponse } from 'next/server'
import Clerk from '@clerk/clerk-sdk-node';
import Session, { ISession } from '@/lib/database/models/session.model'

const clerkClient = Clerk.createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! })

export async function POST(req: Request) {


  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      photo: image_url,
    }

    const newUser = await createUser(user);

    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser?._id
        }
      })
    }

    return NextResponse.json({ message: 'OK', user: newUser })
  }

  if (eventType === 'user.updated') {
    const { id, image_url, username } = evt.data

    const user = {
      username: username!,
      image_url: image_url,
    }

    const updatedUser = await updateUser({ id, user })

    return NextResponse.json({ message: 'OK', user: updatedUser })
  }

  if (eventType === 'session.created') {
    const { id, user_id } = evt.data;

    const existingSession = await Session.findOne({ user: user_id })

    if (existingSession) {
      await clerkClient.sessions.revokeSession(existingSession.sessionId)

      await Session.findOneAndDelete({ user: user_id })
    }

    const newSession = await Session.create({ user: user_id, sessionId: id })

    return NextResponse.json({ message: 'OK' })
  }

  return new Response('', { status: 200 })
}