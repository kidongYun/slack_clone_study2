import { Resolvers } from "src/types/resolvers";
import { CreateChannelMutationArgs, CreateChannelResponse } from "../../../../src/types/graphql"
import Channel from "../../../../src/entities/Channel";
// 상대경로로 사용해야함 (절대경로로는 파일을 못찾음)


const resolvers:Resolvers = {
    Mutation: {
        // args는 channel name.
        CreateChannel: async(_, args: CreateChannelMutationArgs):Promise<CreateChannelResponse> => {
            // GetMessages 라는 동작에 대한 비즈니스 로직 (Spring의 Controller와 유사)
            // 사용자가 API를 호출했을때 인자값이 args 안으로 들어온다.

            try {
                const { channelName } = args;
                // const { channelName } = args.channelName;

                const existChannel = await Channel.findOne({ channelName });
                // Message (typeORM) 을 사용하여 쿼리 메소드를 실행할 수 있음
                // await : 동기적으로 실행되고있으므로 데이터를 가져올때까지 기다리기 위함.
                // 'channelName' 일치하는 데이터를 조회해달라는 의미
                // findOne()은 SELECT Query와 유사하며 한가지의 튜플만 가져온다.

                if(existChannel) {
                    return {
                        ok: false,
                        error: "이미 존재하는 채널입니다."
                    }
                }
                // 채널이름이 중복될 경우 채널을 새로이 만들지 않기위함

                await Channel.create({channelName}).save();
                // 채널은 새롭게 만드는 부분.
                // Create()는 INSERT Query와 유사하며 새로운 튜플을 생성할 수 있다.
                // 뒤의 save() 함수를 호출하여야 실제 데이터베이스에 생겨남 COMMIT 개념같음.

                return {
                    ok: true,
                    error: null
                }
                // 성공했을 때의 응답 / 'CreateChannelResponse'를 'gql-merge'를 활용해서 변환하여 얻어낸 타입.
            
            } catch(error) {
                return {
                    ok: false,
                    error: error.message
                }
                // 실패했을 때의 응답 / 'CreateChannelResponse'를 'gql-merge'를 활용해서 변환하여 얻어낸 타입.
            } 
        }
    }
}

export default resolvers;