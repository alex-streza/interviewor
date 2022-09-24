import { RoomProvider } from '@api/liveblock.config'
import InterviewSection from '@components/sections/Interview'
import { Category } from '@prisma/client'
import { dehydrate } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import { getCategories, getQuestionsByCategory, queryClient } from 'src/api'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  await queryClient.prefetchQuery(['questionsByCategory'], () =>
    getQuestionsByCategory({
      category_id: 1,
    }),
  )
  await queryClient.prefetchQuery(['categories'], () => getCategories())

  const dehydratedState = dehydrate(queryClient)
  const questions = dehydratedState.queries
    .map((query) => query.state?.data?.questionsByCategory)
    .filter((data) => data)[0]
    .sort(() => 0.5 - Math.random())
  const categories = dehydratedState.queries
    .map((query) => query.state?.data?.categories)
    .filter((data) => data)[0]
    .sort((a) => (!a.active ? 1 : -1))

  const isRoomSelected = query.roomId
  const newRoomId = Date.now() + '-' + Math.floor(Math.random() * 10000)

  let options = {}
  if (!isRoomSelected) {
    const responseCreateRoom = await fetch(
      'https://api.liveblocks.io/v2/rooms',
      {
        method: 'POST',
        body: JSON.stringify({
          id: newRoomId,
          defaultAccesses: ['room:write'],
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY}`,
        },
      },
    )
    const room = await responseCreateRoom.json()

    if (!room.error) {
      const responseInitializeRoom = await fetch(
        `https://api.liveblocks.io/v2/rooms/${newRoomId}/storage`,
        {
          body: JSON.stringify({
            liveblocksType: 'LiveObject',
            data: {
              questions: {
                liveblocksType: 'LiveList',
                data: questions,
              },
            },
          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY}`,
          },
        },
      )
      await responseInitializeRoom.json()
    }
    options = {
      redirect: {
        permanent: false,
        destination: '/interview?roomId=' + newRoomId,
      },
    }
  }

  return {
    props: {
      categories,
      dehydratedState,
    },
    ...options,
  }
}
const Interview = ({ categories }: { categories: Category[] }) => {
  const router = useRouter()

  return (
    <RoomProvider id={router.query.roomId as string} initialPresence={{}}>
      <InterviewSection categories={categories} />
    </RoomProvider>
  )
}

export default Interview
