class ApiController < ApplicationController
  JAM_SEARCH = "http://api.thisismyjam.com/1/search/jam.json"
  JAM_RANDOM = "http://api.thisismyjam.com/1/explore/chance.json"

  def search
    begin
      response = HTTParty.get(JAM_SEARCH, query: { "by" => "artist", "q" => params[:artist] })
      data = setup_data(response)
      status = data.any? ? :ok : :no_content
    rescue
      data = {}
      status = :no_content
    end

    render json: data.as_json, status: status
  end

  def random
    begin
      response = HTTParty.get(JAM_RANDOM)
      data = setup_data(response)
      status = data.any? ? :ok : :no_content
    rescue
      data = {}
      status = :no_content
    end

    render json: data.as_json, status: status
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
