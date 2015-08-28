Rails.application.routes.draw do
  controller :welcome do
    get '/', action: 'index'
  end

  controller :api do
    get '/search/:artist', action: 'search'
    get '/random', action: 'random'
  end
end
