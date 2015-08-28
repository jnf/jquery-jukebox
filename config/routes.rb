Rails.application.routes.draw do
  root "api#index"
  get "/search", to: "api#search", as: "search"
  get "/popular", to: "api#popular", as: "popular"
  get "/random", to: "api#random", as: "random"
end
