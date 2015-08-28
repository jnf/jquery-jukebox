class ApiController < ApplicationController
  JAM = "http://api.thisismyjam.com/1/search/jam.json"
  GOLD = "http://api.thisismyjam.com/1/explore/rare.json"
  def home
  end
  
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
        artist: jam.fetch("artist", "")
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

# "jams":[{"id":"afvy4mo",
#   "from":"simonp","title":"Menton",
#   "artist":"Palace Winter",
#   "combinedTruncated":"Menton by Palace Winter",
#   "caption":"I was going to make #450 my final Jam. 
#   But I'm having way too much fun to stop 
#   (they're gonna drag me away kicking and screaming). 
#   So here's something new, from an 
#   Aussie singer\/songwriter and a Danish producer.",
#   "jamvatarLarge":"http:\/\/static03.thisismyjam.com\/i\/59c542270070c87504246ff205948236_395.jpg?1440666495",
#   "jamvatarMedium":"http:\/\/static02.thisismyjam.com\/i\/59c542270070c87504246ff205948236_185.jpg?1440666495",
#   "jamvatarSmall":"http:\/\/static02.thisismyjam.com\/i\/59c542270070c87504246ff205948236_80.jpg?1440666495",
#   "creationDate":"Thu, 27 Aug 2015 09:11:52 +0000",
#   "endDate":"Thu, 03 Sep 2015 09:11:52 +0000",
#   "playCount":22,"likesCount":19,
#   "likes":"http:\/\/api.thisismyjam.com\/1\/jams\/afvy4mo\/likes.json",
#   "commentsCount":8,"comments":"http:\/\/api.thisismyjam.com\/1\/jams\/afvy4mo\/comments.json",
#   "current":true,"apiUrl":"http:\/\/api.thisismyjam.com\/1\/jams\/afvy4mo.json",
#   "via":"soundcloud","viaUrl":"http:\/\/soundcloud.com\/palace-winter\/menton",
#   "url":"http:\/\/www.thisismyjam.com\/simonp\/_afvy4mo",
#   "background":"http:\/\/static02.thisismyjam.com\/bg\/aad9542681596787792d2a3f102a36972122693669.jpg",
#   "rejamsCount":0}
