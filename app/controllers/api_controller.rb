class ApiController < ApplicationController
  JAM = "http://api.thisismyjam.com/1/search/jam.json"
  BREAKING = "http://api.thisismyjam.com/1/explore/breaking.json"

  def home
  end

  def search
    begin
      response = HTTParty.get(JAM, query: { "by" => "artist", "q" => params[:artist] })
      data = setup_data(response)[0..20] # limiting to first 20
      code = :ok
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
