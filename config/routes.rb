Rails.application.routes.draw do
  get 'welcome/index'
  get 'editor/index'

  root 'welcome#index'
end