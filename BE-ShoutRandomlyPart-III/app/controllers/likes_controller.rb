class LikesController < ApplicationController

    def create
        # increase the count of the likecount on shout and return shout
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']

        
        
        shout = Shout.find(params['shoutId'])
        
        if  shout.likes.any?{|like| like.user_id === user_id}
            render json: shout.to_json(only: [:id, :body, :created_at, :likeCount, :commentCount], include: [user: {only: [:id, :username, :imgUrl]}]), status: 403, error: 'Already Liked'
        else
            like = Like.create!(user_id: user_id, shout_id: params['shoutId'])
            likeCount = shout.likeCount + 1
            shout.update!(likeCount: likeCount)
            render json: shout.to_json(only: [:id, :body, :created_at, :likeCount, :commentCount], include: [user: {only: [:id, :username, :imgUrl]}])
        end

    end

    def destroy
        # decrease the count of the likecount on shout and return shout
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        shout = Shout.find(params['shoutId'])
        like = Like.find_by(user_id: user_id, shout_id: shout.id)

        if shout.likes.any?{|like| like.user_id === user_id}
            like.delete
            likeCount = shout.likeCount - 1
            shout.update!(likeCount: likeCount)
            render json: shout.to_json(only: [:id, :body, :created_at, :likeCount, :commentCount], include: [user: {only: [:id, :username, :imgUrl]}])
        else

            render json: shout.to_json(only: [:id, :body, :created_at, :likeCount, :commentCount], include: [user: {only: [:id, :username, :imgUrl]}]), status: 403, error: 'Not Liked'
        end
        
    end
    
end
