import { createClient } from '@liveblocks/client'
import { createRoomContext } from '@liveblocks/react'
import { clientEnv } from 'src/env/schema.mjs'
import { Question } from 'src/types/models/questions'

const client = createClient({
  publicApiKey: clientEnv.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY ?? '',
})

// Presence represents the properties that will exist on every User in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
type Presence = {
  cursor?: { x: number; y: number }
  color?: string
  name?: string
}

// Optionally, Storage represents the shared document that persists in the
// Room, even after all Users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  questions: Question[]
  category: number | null
  shown?: boolean
  index?: number
}

// Optionally, UserMeta represents static/readonly metadata on each User, as
// provided by your own custom auth backend (if used). Useful for data that
// will not change during a session, like a User's name or avatar.
// type UserMeta = {
//   id?: string,  // Accessible through `user.id`
//   info?: Json,  // Accessible through `user.info`
// };

// Optionally, the type of custom events broadcasted and listened for in this
// room. Must be JSON-serializable.
// type RoomEvent = {};

export const {
  RoomProvider,
  useOthers,
  useStorage,
  useMutation,
  useMyPresence,
  /* ...all the other hooks you’re using... */
} = createRoomContext<Presence, Storage /* UserMeta, RoomEvent */>(client)
