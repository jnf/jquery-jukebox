Rails.application.routes.draw do
  root "api#index"
  get '/search'  => 'api#search',  as: 'search'
  get '/popular' => 'api#popular', as: 'popular'
  get '/chance'  => 'api#chance',  as: 'chance'
  get '/rare'    => 'api#rare',    as: 'rare'
end
