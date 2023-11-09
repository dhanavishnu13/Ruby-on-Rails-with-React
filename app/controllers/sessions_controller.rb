class SessionsController < ApplicationController
    include CurrentUserConcern

    def create
        
        user = User.find_by(email: params["user"]["email"])
        .try(:authenticate, params["user"]["password"])  # getting from frontend as a object
        
        if user
        session[:user_id]=user.id
        render json: {
            status: :created,
            logged_in: true,
            user: user
        }
    else
        render json: {status: 401} #universal code for unautherized access
    end
    end

    def logged_in
        
        user = User.find_by(email: params["user"]["email"])
        if user && user.authenticate(params["user"]["password"])
            
            render json: {
                logged_in: true,
                user: @current_user
            }
        else
            render json: {
                logged_in: false
            }       #not added status because not creating anything and just asking
        end
    end

    def loggout
        reset_session
        render json: {status: 200, logged_out: true}
    end
end