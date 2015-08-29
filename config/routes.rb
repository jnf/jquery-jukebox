Rails.application.routes.draw do
  root 'jukebox#index'

  controller :api do
    get '/search/:artist', action: 'search'
    get '/box-of-chocolates', action: 'random', as: 'random'
  end

  # in case there's a js error
  get '/search', to: redirect('/')
end
