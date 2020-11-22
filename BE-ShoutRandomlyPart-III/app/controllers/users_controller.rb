class UsersController < ApplicationController
    wrap_parameters :user, include: [:username, :password, :bio, :first_name, :last_name, :imgUrl]
    def create 
        user = User.create!(user_params)
        # byebug
        payload = { user_id: user.id }
        token = JWT.encode(payload, 'secret', 'HS256')
        # return a message
        render json: { user: user, token: token}
    end
    
    
    def index
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)
        users = User.all.select{ |user| user.id != user_id} 
        followed_users_ids = user.followed_users.map{|follow| follow.id }
        all_users = users.reject {|user| followed_users_ids.include? user.id }
        
        
        render json: all_users.to_json(
            only: [:username, :id, :imgUrl, :bio], include:[followed_users: {only: [:username, :imgUrl, :bio]}]
            )
    end



    def show
        # return a user's info, and their shouts maybe recent shouts?
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)
        

        render json: user.to_json(
            only: [:username, :imgUrl, :bio], include: [followed_users: {only: [:id, :username, :imgUrl, :bio]}, shouts:{only: [:id, :body, :likeCount, :commentCount, :created_at, :updated_at]}, comments: {only: [:id, :body, :shout_id]},  ]
        )
       
    end

    def update
        # Update only the current_user profile. check with token
        # @profile.avatar.attach(params[:file])
        # byebug
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)

        if params['image']
        user.image.attach(params['image'])
        
        imgUrl = url_for(user.image)
        user.update(imgUrl: imgUrl)
        else 
            user.update!(bio: params['body'])

        end
        render json: user.to_json(
            only: [:username, :imgUrl, :bio], include: [shouts:{only: [:id, :body, :likeCount, :commentCount, :created_at, :updated_at]}, comments: {only: [:id, :body, :shout_id]},  ]
        )
    end

    private
    def user_params
        params.require(:user).permit(:username, :image, :password, :first_name, :bio, :last_name, :imgUrl)

    end

end

# t.string "username"
#     t.string "password_digest"
#     t.string "first_name"
#     t.string "last_name"
#     t.string "imgUrl"
