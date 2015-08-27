Rails.application.routes.draw do
  root "api#index"
  get "/search", to: "api#search", as: "search"
end
