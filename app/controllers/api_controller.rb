require 'HTTParty'
class ApiController < ApplicationController
  JAM = "http://api.thisismyjam.com/1/search/jam.json"
  RANDOM = "http://api.thisismyjam.com/1/explore/chance.json"
  POPULAR = "http://api.thisismyjam.com/1/explore/popular.json"

  def search
    begin
      response = HTTParty.get(JAM, query: { "by" => "artist", "q" => params[:artist] })
      data = setup_data(response)
      code = data.any? ? :ok: :no_content
      # code = :ok
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, status: code
  end

  def random
    begin
      response = HTTParty.get(RANDOM)

      data = setup_data(response).sample(6)
      code = data.any? ? :ok: :no_content
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, status: code
  end

  def popular
    begin
      response = HTTParty.get(POPULAR)

      data = setup_data(response).sample(6)
      code = data.any? ? :ok: :no_content
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
        artist: jam.fetch("artist", ""),
        albumArt: jam.fetch("jamvatarLarge", "")
      }
    end
  end
end
