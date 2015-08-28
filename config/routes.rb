Rails.application.routes.draw do
  root 'home#index'

  controller :api do
    get '/search/:artist', action: 'search'
    get '/popular', action: 'popular'
    get '/unpopular', action: 'unpopular'
  end
end
