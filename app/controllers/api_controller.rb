class ApiController < ApplicationController
  JAM = "http://api.thisismyjam.com/1/search/jam.json"
  JAM_EXPLORE = "http://api.thisismyjam.com/1/explore/"

  def index

  end

  # TO DO - refactor code to not repeat
  def search
    begin
      response = HTTParty.get(JAM, query: { "by" => "artist", "q" => params[:artist] })
      data = setup_data(response)
      code = :ok
    rescue
      data = {}
      code = :no_content
    end

    render json: data.as_json, code: code
  end

  def popular
    data = api_call("popular.json")

    render json: data[0].as_json, code: data[1]
  end

  def rando
    data = api_call("chance.json")

    render json: data[0].as_json, code: data[1]
  end


  private

  def api_call(url)
    begin
      response = HTTParty.get(JAM_EXPLORE + "chance.json")
      data = setup_data(response)
      data = data.sample(5)
      code = :ok
    rescue
      data = {}
      code = :no_content
    end
    return [data, code]
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
end
