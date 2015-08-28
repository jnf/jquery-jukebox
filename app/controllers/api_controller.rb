class ApiController < ApplicationController
  SEARCH_URI = "http://api.thisismyjam.com/1/search/jam.json"
  RANDO_URI = "http://api.thisismyjam.com/1/explore/chance.json"

  def index


  end

  def search
    # at = params[:search][:artist]
    # raise
    begin
      response = HTTParty.get(SEARCH_URI, query: { "by" => "artist", "q" => params[:artist] })
      data = setup_data(response)
      code = :ok
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, code: code
  end

  def rando
    begin
      response = HTTParty.get(RANDO_URI)
      formated_data = setup_data(response)
      data = formated_data.sample(10)
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
