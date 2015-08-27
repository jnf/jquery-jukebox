class ApiController < ApplicationController
  SEARCH_JAMS = "http://api.thisismyjam.com/1/search/jam.json"
  RANDOM_JAMS = "http://api.thisismyjam.com/1/explore/chance.json"

  def search
    begin
      response = HTTParty.get(SEARCH_JAMS, query: { "by" => "artist", "q" => params[:artist] })
      data = setup_data(response)
      code = :ok
    rescue
      data = {}
      code = :no_content
    end
    render json: data.as_json, code: code
  end

  def random
    begin
      response = HTTParty.get(RANDOM_JAMS)
      data = setup_data(response)
      code = :ok
    rescue
      data = {}
      code = :no_content
    end
    # limit to 10 jams
    data = data[0..9]
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
