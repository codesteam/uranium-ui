require File.expand_path(File.dirname(__FILE__))+'/capistrano_env'

set :application, 'Uranium UI'
set :repository,  'git@github.com:codesteam/uranium-ui.git'
set :app_dir,     ENV_CONFIG['APP_DIR']

set :scm, :git
set :branch, 'master'
set :normalize_asset_timestamps, false

set :deploy_via, :remote_cache
set :keep_releases, 2

set :deploy_to, "#{app_dir}"
set :use_sudo, false
role :web, ENV_CONFIG['APP_ROLE_WEB']
role :app, ENV_CONFIG['APP_ROLE_APP']

after 'deploy:create_symlink' do
  # install all needed gems
  set :default_shell, 'bash -l'
  run "( cd #{current_path} ; bundle install)"
end

after 'deploy:update', 'deploy:cleanup'