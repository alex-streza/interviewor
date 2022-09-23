import { useOthers, useMyPresence } from '@api/liveblock.config'
import { Avatar, Center, Group } from '@mantine/core'
import Cursor from './Cursor'
import { useCallback, useEffect } from 'react'
import { darken } from 'color2k'

const Live = () => {
  const [, updateMyPresence] = useMyPresence()
  const others = useOthers()

  const handleUpdateCursor = useCallback(
    (event: MouseEvent) => {
      const eventDoc = document
      const doc = eventDoc.documentElement
      const body = eventDoc.body

      updateMyPresence({
        cursor: {
          x:
            (event.clientX +
              ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
              ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)) /
            window.innerWidth,
          y:
            (event.clientY +
              ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
              ((doc && doc.clientTop) || (body && body.clientTop) || 0)) /
            window.innerHeight,
        },
      })
    },
    [updateMyPresence],
  )

  useEffect(() => {
    updateMyPresence({
      color: darken('#00B4D8', others.length * 0.05),
      name: 'User ' + (others.length + 1),
    })
    document.body.addEventListener('mousemove', handleUpdateCursor)
  }, [handleUpdateCursor, others.length, updateMyPresence])

  return (
    <>
      <Center mb="xs">
        <Group style={{ gap: '0' }}>
          {others.map((other) => (
            <Avatar
              style={{
                marginLeft: -8,
              }}
              key={other.id}
              color="blue"
              radius="xl"
            >
              {other.presence?.name[0]}
              {other.presence?.name.split(' ')[1][0]}
            </Avatar>
          ))}
        </Group>
      </Center>
      {others.map((other) => (
        <Cursor
          key={other.id}
          x={(other.presence?.cursor?.x ?? 0) * window.innerWidth}
          y={(other.presence?.cursor?.y ?? 0) * window.innerHeight}
          color={other.presence?.color ?? ''}
          name={other.presence?.name ?? ''}
        />
      ))}
    </>
  )
}

export default Live
