class PostsController < ApplicationController
    def index
      @posts = Post.all
      render json: @posts
    end

    def create
        @post = Post.new(post_params)
    
        if @post.save
          render json: @post, status: :created
        else
          render json: @post.errors, status: :unprocessable_entity
        end
    end

    def show
      @post = Post.find(params[:id])
      render json: @post
      
    end

    def destroy
        @post = Post.find(params[:id])
        
        @post.destroy
        # head :no_content
        
    end    

    
    def update
        @post = Post.find(params[:id])
    
        if @post.update(post_params)
          render json: @post
        else
          render json: @post.errors, status: :unprocessable_entity
        end
    end

#   Private methods

    private

    def post_params
      params.require(:post).permit(:title, :description)
    end
  
end