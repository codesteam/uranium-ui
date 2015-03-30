class SiteController < ApplicationController
  def index
  end

  def doc
  end

  def decay
    begin
      raise "Invalid template" if !request.post? || params[:template].empty?
      result = Uranium::Core.new(params[:template]).decay(false)
    rescue Exception => e
      result = "Render error: " + e.message
    end

    respond_to do |format|
      format.html { render nothing: true }
      format.json { render :json => {'data' => result} }
    end
  end
end
