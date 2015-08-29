Rails.application.routes.draw do
  root 'jukebox#index'

  controller :api do
    get '/search/:artist', action: 'search'
  end

  # in case there's a js error
  get '/search', to: redirect('/')
end
