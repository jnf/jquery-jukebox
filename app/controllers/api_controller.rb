class ApiController < ApplicationController
  JAM = "http://api.thisismyjam.com/1/search/jam.json"
  BREAKING_JAM = "http://api.thisismyjam.com/1/explore/breaking.json"

  def search
    begin
      response = HTTParty.get(JAM, query: { "by" => "artist", "q" => params[:artist] })
      data = setup_data(response)
      code = data.any? ? :ok : :no_content
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, status: code
  end

  def get_breaking_jams
    begin
      response = HTTParty.get(BREAKING_JAM)
      data = setup_data(response)
      data = data.sample(5);
      code = data.any? ? :ok : :no_content
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, status: code
  end

###############################################
  private

  def setup_data(response)
    jams = response.fetch "jams", {}
    jams.map do |jam|
      {
        via: jam.fetch("via", ""),
        url: jam.fetch("viaUrl", ""),
        combinedTruncated: jam.fetch("combinedTruncated", ""),
        image: jam.fetch("jamvatarLarge", "")
      }
    end
  end
end
