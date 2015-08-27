class ApiController < ApplicationController
  JAM = "http://api.thisismyjam.com/1/search/jam.json"
  BREAKING = "http://api.thisismyjam.com/1/explore/breaking.json"
  RANDO = "http://api.thisismyjam.com/1/explore/chance.json"
  # Popular GET http://api.thisismyjam.com/1/explore/popular.json Today’s most-loved jams.
  # Rare GET http://api.thisismyjam.com/1/explore/rare.json Tracks we don’t hear that often.

  def home
  end

  def search
    begin
      response = HTTParty.get(JAM, query: { "by" => "artist", "q" => params[:artist] })
      data = setup_data(response)
      code = data.any? ? :ok : :no_content
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, code: code
  end

  def breaking
    begin
      response = HTTParty.get(BREAKING)
      data = setup_data(response)[0..20] # taking the first 20 results
      code = :ok
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, code: code
  end

  def rando
    begin
      response = HTTParty.get(RANDO)
      data = setup_data(response)[0..20] # taking the first 20 results
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
