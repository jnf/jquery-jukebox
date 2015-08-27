class ApiController < ApplicationController
  JAM = "http://api.thisismyjam.com/1/search/jam.json"
  POPULAR = "http://api.thisismyjam.com/1/explore/popular.json"
  CHANCE = "http://api.thisismyjam.com/1/explore/chance.json"

  def index; end

  def search
    begin
      if params[:artist] == ""
        response = HTTParty.get(CHANCE)
        data = setup_data(response)
        code = :ok
      else
        response = HTTParty.get(JAM, query: { "by" => "artist", "q" => params[:artist] })
        data = setup_data(response)
        if data == []
          response = HTTParty.get(CHANCE)
          data = setup_data(response)
        else
          data
        end
        code = :ok
      end
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, code: code
  end

  def popular
    begin
      response = HTTParty.get(POPULAR)
      data = setup_data(response)
      code = :ok
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, code: code
  end

  private

  def setup_data(response)
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
end
