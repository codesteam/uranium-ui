class SiteController < ApplicationController
  def index
  end

  def doc
  end

  def decay
    begin
      raise "invalid template" if !request.post? || params[:template].nil?
      result = Uranium::Core.new(params[:template]).decay false
    rescue Exception => e
      result = e.message
    end

    respond_to do |format|
      format.html { render nothing: true }
      format.json { render :json => result }
    end
  end
end
