Rails.application.routes.draw do
  root 'api#index'
  post '/search' => 'api#search', as: 'search'
end
