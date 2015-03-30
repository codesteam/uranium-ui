Rails.application.routes.draw do
  get 'doc'    => 'site#doc',    as: :site_doc
  get 'editor' => 'site#editor', as: :site_editor
  post 'decay' => 'site#decay',  as: :site_decay

  root 'site#index'
end