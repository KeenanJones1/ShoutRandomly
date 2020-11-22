class ShoutsController < ApplicationController

    def index
        # return all of the shouts from the user and their followers
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        
        user = User.find(user_id)

        shouts = user.followed_shouts


        
        # search how to order then by created by
        # byebug
        render json: shouts.to_json(
            only: [:id, :body, :created_at, :likeCount, :commentCount],
            include: [user: {only: [:username, :imgUrl]}]
        )
    end

    def show
        # show one shout and all of the comments on that shout from that one shout
        byebug
    end
    
    def create
        # create a shout and return a shout and message
        
        if params['body'].blank?
            render json: {error: "Shout body can't be blank"}, status: 403
        else
            token = request.headers[:Authorization].split(' ')[1]
            decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
            user_id = decoded_token[0]['user_id']
            user = User.find(user_id)
            shout = Shout.create!(user: user, body: params['body'])
            shouts = user.shouts
            render json: shouts.to_json(
            only: [:id, :body, :created_at, :likeCount, :commentCount],
            include: [user: {only: [:username, :imgUrl]}]
        )
        end
    end

    def update
        # update a shout and return the shout and message
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)

        shout = Shout.find(params['shoutId'])
        shout.update(body: params['shoutBody'])

        # byebug
        render json: user.to_json(
            only: [:username, :imgUrl, :bio], include: [shouts:{only: [:id, :body, :likeCount, :commentCount, :created_at, :updated_at]}, comments: {only: [:body, :shout_id]}]
        )
    end

    def destroy 
        # destroy shout and return the shout and message
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)
        
        shout = Shout.find(params['id'])
        shout.destroy

        render json: user.to_json(
            only: [:username, :imgUrl, :bio], include: [shouts:{only: [:id, :body, :likeCount, :commentCount, :created_at, :updated_at]}, comments: {only: [:body, :shout_id]}]
        )
        

        
    end
end
