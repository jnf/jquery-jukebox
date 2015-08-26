Rails.application.routes.draw do
  root 'api#index'
  get '/search/:artist' => 'api#search', as: 'search'
end
