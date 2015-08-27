class ApiController < ApplicationController
  JAM = "http://api.thisismyjam.com/1/"

  def index; end

  def search
    begin
      response = HTTParty.get(JAM + "search/jam.json", 
        query: { "by" => "artist", "q" => params[:artist] })
      @search = get_data(response)
      code = :ok
    rescue
      @search = {}
      code = :no_content
    end
    render json: @search.as_json, code: code
  end

  def popular
    begin
      response = HTTParty.get(JAM + "explore/popular.json")
      @popular = get_data(response)
      code = :ok
    rescue
      @popular = {}
      code = :no_content
    end
    render json: @popular.as_json, code: code
  end

  def random
    begin
      response = HTTParty.get(JAM + "explore/chance.json")
      @random = get_data(response)
      code = :ok
    rescue
      @random = {}
      code = :no_content
    end
    render json: @random.as_json, code: code
  end

  private

  def get_data(response)
    jams = response.fetch "jams", {}
    jams.map do |jam|
      {
        via: jam.fetch("via", ""),
        url: jam.fetch("viaUrl", ""),
        title: jam.fetch("title", ""),
        artist: jam.fetch("artist", "")
      }
    end
  end

end # class
