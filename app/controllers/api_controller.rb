class ApiController < ApplicationController
  JAM = "http://api.thisismyjam.com/1/search/jam.json"
  GOLD = "http://api.thisismyjam.com/1/explore/rare.json"
  def home
  end
  
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

  def mine
    begin
      response = HTTParty.get(GOLD)
      data = rare_gold(response)
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
        artist: jam.fetch("artist", ""),
        jamPhoto:  jam.fetch("jamvatarSmall","")
      }
    end
  end

  def rare_gold(response)
    jams = response.fetch "jams", {}
    jams.map do |jam|
      { nameTitle: jam.fetch("combinedTruncated",""),
        postedBy:  jam.fetch("from",""),
        caption:   jam.fetch("caption",""),
        via:       jam.fetch("via",""),
        url:       jam.fetch("url",""),
        jamPhoto:  jam.fetch("jamvatarSmall","")
      }
  end
end
end
