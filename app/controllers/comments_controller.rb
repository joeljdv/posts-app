class CommentsController < ApplicationController
    before_action :authorize

    def index
        comments = Comment.all
        render json: comments
    end

    def show 
        comment = Comment.find_by(id: params[:id])
        render json: comment
    end

    def create
        user = User.find_by(id: session[:user_id])
        post = Post.find_by(id: params[:post_id])
        comment = Comment.create(content: params[:content], user_id: user.id, post_id: post.id)
        if comment.valid?
            render json: comment, status: :created
        else 
            render json: {errors: comment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        if comment
            comment.destroy
            head :no_content
        end
    end

    private

    def authorize
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end
end