Rails.application.routes.draw do
  
  resources :relationships, only: [:create, :destroy, :index]

  resources :comments, only: [:create, :update, :destroy, :index]

  resources :likes, only: [:create]
  
  resources :shouts

  resources :users, only: [:index, :show, :update]

  get 'myuser', to: 'users#show', as: '/myuser'
  patch 'profile', to: 'users#update', as: '/profile'

  post 'signup', to: 'users#create', as: '/signup'

  post 'unlike', to: 'likes#destroy', as: '/unlike'
  post 'unfollow', to: 'relationships#destroy', as: '/unfollow'

  post 'login', to: 'auth#create', as: '/login'
  get 'current_user', to: 'auth#show', as: '/current_user'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
