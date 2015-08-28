class ApiController < ApplicationController
  JAM = "http://api.thisismyjam.com/1/search/jam.json"

  def index; end

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

  def random
    begin
      response = HTTParty.get("http://api.thisismyjam.com/1/explore/chance.json")
      data = select_random(response)
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

  def select_random(response)
    jams = response.fetch "jams", []
    # prevents selecting a jam the js doesn't support
    sources = ["soundcloud", "youtube", "vimeo"]
    jams.delete_if { |jam| !sources.include?(jam["via"]) }

    random = jams.sample

    # has to be in an array 'cause the js function
    # will assume it is and we want that function to work for errythang
    jam = [{
      via: random.fetch("via", ""),
      url: random.fetch("viaUrl", ""),
      title: random.fetch("title", ""),
      artist: random.fetch("artist", "")
    }]
  end
end
