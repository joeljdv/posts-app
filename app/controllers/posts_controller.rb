class PostsController < ApplicationController
    before_action :authorize
    
    def index
        posts = Post.all.order(created_at: :desc)
        render json: posts, include: ['user','comments', 'comments.user']
    end

    def show
        post = Post.all.find_by(id: params[:id])
        render json: post, include: ['user', 'comments', 'comments.user']
    end

    def create
        user = User.find_by(id: session[:user_id])
        post = user.posts.create(posts_params)
        if post.valid?
            render json: post, status: :created
        else
            render json: {errors: post.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        post = user.posts.find_by(id: params[:id])
        if post
            post.update(posts_params)
            render json: post
        else
            render json: {error: "Post Not found"}, status: :not_found
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        post = user.posts.find_by(id: params[:id])
        if post
            post.destroy
            head :no_content
        else
            render json:{error: "Post not found"}, status: :not_found
        end
    end

    def user_posts 
        user = User.find_by(id: session[:user_id])
        posts = user.posts
        if posts
            render json: posts
        else
            render json: {errors: posts.errors.full_messages}
        end
    end

    private

    def posts_params
        params.permit(:title, :content)
    end

    def authorize
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end
end