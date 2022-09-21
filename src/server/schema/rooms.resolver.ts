import { Query, Resolver } from 'type-graphql'

@Resolver()
export class RoomsResolver {
  @Query(() => String)
  async getNewRoomId(): Promise<string> {
    console.log('aasad', Date.now() + '-' + Math.floor(Math.random() * 10000))
    return Date.now() + '-' + Math.floor(Math.random() * 10000)
  }
}
