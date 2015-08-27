class ApiController < ApplicationController
  SEARCH =  "http://api.thisismyjam.com/1/search/jam.json"
  POPULAR = "http://api.thisismyjam.com/1/explore/popular.json"
  SOUNDCLOUD_OEMBED_URI = "http://soundcloud.com/oembed?url="

  def search
    begin
      response = HTTParty.get(SEARCH, query: { "by" => "artist", "q" => params[:artist] })
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
      response = HTTParty.get(POPULAR)
      data = setup_data(response)
      code = data.any? ? :ok : :no_content
      data = data[0..9] if code == :ok
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, status: code
  end

  # def soundcloud_embed_html
  #   link = params[:link]
  #   response = HTTParty.get(SOUNDCLOUD_OEMBED_URI + link)
  #   return response["html"]
  # end

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
