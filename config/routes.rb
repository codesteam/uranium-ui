Rails.application.routes.draw do
  get 'doc' => 'site#doc',  as: :site_doc

  root 'site#index'
end