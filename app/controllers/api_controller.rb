class ApiController < ApplicationController
  SEARCH =  "http://api.thisismyjam.com/1/search/jam.json"
  POPULAR = "http://api.thisismyjam.com/1/explore/popular.json"
  UNPOPULAR = "http://api.thisismyjam.com/1/explore/rare.json"
  RANDO = "http://api.thisismyjam.com/1/explore/chance.json"
  BREAKING = "http://api.thisismyjam.com/1/explore/breaking.json"

  def search
    options_hash = { query: { "by" => "artist", "q" => params[:artist] } }
    makeApiCall(SEARCH, options_hash)
  end

  def popular
    makeApiCall(POPULAR)
  end

  def unpopular
    makeApiCall(UNPOPULAR)
  end

  def rando
    makeApiCall(RANDO)
  end

  def breaking
    makeApiCall(BREAKING)
  end

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

  def makeApiCall(url, options_hash={})
    begin
      response = HTTParty.get(url, options_hash)
      data = setup_data(response)
      code = data.any? ? :ok : :no_content
      data = data[0..9] if code == :ok
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, status: code
  end
end
