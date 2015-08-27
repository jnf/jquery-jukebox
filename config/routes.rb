Rails.application.routes.draw do
  root "api#index"

  controller :api do
    get '/search/:artist', action: 'search', as: :search
    get '/popular', action: 'popular', as: :popular
    get '/random', action: 'random', as: :random
  end
end
