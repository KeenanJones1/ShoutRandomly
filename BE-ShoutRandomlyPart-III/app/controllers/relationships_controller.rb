class RelationshipsController < ApplicationController

    def index
        # return a list of all the current_user followers and message
       byebug
        # render json: user.followed_users.json(
        #     only: [:username, :imgUrl, :bio]
        # )
    end
    
    def create
        # return a new relationship using the token and the params user info selected. return a message
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']

        follower_user = User.find(user_id)
        followed_user = User.find(params['followed'])
        
        followed_users_ids = follower_user.followed_users.map{|follow| follow.id }
        
        users = User.all.select { |user| user.id != follower_user.id && user.id != followed_user.id}
        
        all_users = users.reject {|user| followed_users_ids.include? user.id }
        
        # byebug
        relationship = Relationship.create!(follower_id: user_id, followed_id: params['followed'])

        render json: all_users.to_json(
            only: [:username, :id, :imgUrl, :bio], include:[followed_users: {only: [:username, :imgUrl, :bio]}]
            )

    end

    def destroy
        # delete a realtionship and return a message
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)
        

        
        relationship = Relationship.find_by(followed_id: params['followedUserId'])
        relationship.delete


        # byebug
        render json: user.to_json(
            only: [:username, :imgUrl, :bio], include: [followed_users: {only: [:id, :username, :imgUrl, :bio]}, shouts:{only: [:id, :body, :likeCount, :commentCount, :created_at, :updated_at]}, comments: {only: [:id, :body, :shout_id]},  ]
        )
    end

end
