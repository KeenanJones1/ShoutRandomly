class AuthController < ApplicationController
    def create 
        user = User.find_by(username: params[:username])
        
        

        payload = { user_id: user.id }
        token = JWT.encode(payload, 'secret', 'HS256')
        
        
            
            if user && user.authenticate(params[:password])
                render json: {token: token}
            end
    end

    def show
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, algorithm: 'HS256')
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)
        if user 
            render json: user.to_json(
                only: [:id, :bio, :username, :imgUrl], include: [followed_users: {only: [:id, :username, :imgUrl, :bio]},
                followed_shouts:{only:[:user_id, :body, :likeCount, :commentCount]}])
        else
            render json: {error: 'Invalid Token'}, status: 401
        end
    end
    
end
