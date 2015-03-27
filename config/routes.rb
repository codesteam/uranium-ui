Rails.application.routes.draw do
  get 'doc'    => 'site#doc',    as: :site_doc
  get 'editor' => 'site#editor', as: :site_editor

  root 'site#index'
end