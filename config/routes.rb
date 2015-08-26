Rails.application.routes.draw do
  controller :api do
    get '/', action: 'index'
    get '/search/:artist', action: 'search'
  end
end
