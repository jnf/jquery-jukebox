Rails.application.routes.draw do
  root "api#index"

  controller :api do
    get '/search/:artist', action: 'search', as: :search
  end
end
