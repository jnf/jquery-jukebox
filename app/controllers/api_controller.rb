class ApiController < ApplicationController
  JAM_API = "http://api.thisismyjam.com/1/"
  JAM_ARTIST = JAM_API + "search/jam.json"
  JAM_POPULAR = JAM_API + "explore/popular.json"
  JAM_RANDOM = JAM_API + "explore/chance.json"

  def index; end

  def search
    begin
      response = HTTParty.get(JAM_ARTIST, query: { "by" => "artist", "q" => params[:artist] })
      data = setup_data(response)
      code = data.any? ? :ok : :no_content
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, status: code
  end

  def popular
    begin
      response = HTTParty.get(JAM_POPULAR)
      data = setup_data(response)
      data = data[0, 20] if data.length > 20
      code = data.any? ? :ok : :no_content
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, status: code
  end

  def random
    begin
      response = HTTParty.get(JAM_RANDOM)
      data = setup_data(response)
      data = data.slice(0, 20) if data.length > 20
      code = data.any? ? :ok : :no_content
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, status: code
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
