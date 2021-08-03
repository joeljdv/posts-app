class UsersController < ApplicationController
    def create #signup
        user = User.create(user_params)
        if user
            session[:user_id] = user.id 
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        if user
            user.update(params[:profile_img])
            render json: user
        else
            render json: {error: "Not authorized"}
        end
    end

    def user_profile
        user = User.find_by(id: params[:id])
        if user
            render json: user
        else
            render json: {error: "Not Found"}, status: :not_found
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :profile_img)
    end
end

