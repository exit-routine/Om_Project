Rails.application.routes.draw do

  resources :posts 

  get '/posts/:id', to: 'posts#show'



end

