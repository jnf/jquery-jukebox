Rails.application.routes.draw do
  root "api#index"
  get '/search' => 'api#search', as: 'search'
end
