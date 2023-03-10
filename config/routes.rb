Rails.application.routes.draw do
  
  resources :reqteams
  resources :recruiterteams
  resources :reqs
  resources :teams, only: [:create, :show, :destroy]
  resources :recruiters
  resources :companies

  post "/login", to: "sessions#create"
  delete "/logout", to:"sessions#destroy"
  post "/signup", to: "recruiters#create"

  # STAY LOGGED IN & GET RECRUITER INFO: 
  get "/me", to: "recruiters#show"

  #DELETE REQ FROM UNIQUE TEAM:
  post "/reqteamdestroy", to: "reqteams#destroy_req_from_team"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
