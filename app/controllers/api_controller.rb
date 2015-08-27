class ApiController < ApplicationController
  JAM = "http://api.thisismyjam.com/1/search/jam.json"

  def search
    begin
      response = HTTParty.get(JAM, query: { "by" => "artist", "q" => params[:artist] })
      data = setup_data(response)
      data.empty? ? code = :no_content : code = :ok
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
