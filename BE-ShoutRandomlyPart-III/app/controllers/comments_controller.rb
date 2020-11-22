class CommentsController < ApplicationController

    def create
        # create a new comment and return the Shout and all of the comments on that Shout
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)
        shout = Shout.find(params['shoutId'])
        

    
            comment = Comment.create!(user_id: user_id, shout_id: params['shoutId'], body: params['body'])
            commentCount = shout.commentCount + 1
            shout.update!(commentCount: commentCount)
            render json: shout.to_json(only: [:id, :body, :created_at, :likeCount, :commentCount], include: [user: {only: [:id, :username, :imgUrl]}])
        
    end

    def update
        # update comment and return shout with all of the comments 
        # byebug
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)
        userComments = user.comments
        comment = Comment.find(params['commentId'])
        comment.update!(body: params['commentBody'])
        render json: userComments.to_json(only: [:id, :body, :created_at, :updated_at])
    end

    def destroy
        # delete comment and return message. only if the current_user match the user_id on comment. return message
        token = request.headers[:Authorization].split(' ')[1]
        decoded_token = JWT.decode(token, 'secret', true, { algorithm: 'HS256'})
        user_id = decoded_token[0]['user_id']
        user = User.find(user_id)
        userComments = user.comments
        comment = Comment.find(params['id'])
        comment.destroy
        # byebug
        render json: userComments.to_json(only: [:id, :body, :created_at, :updated_at])
    end

    private
    def comment_params
        params.require(:comment).permit(:user_id, :shout_id, :body)
    end
    
end
