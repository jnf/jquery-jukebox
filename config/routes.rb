Rails.application.routes.draw do
  root 'home#index'

  controller :api do
    get '/search/:artist', action: 'search'
    get '/popular', action: 'popular'
    # get '/soundcloud_embed', action: 'soundcloud_embed_html'
  end
end
