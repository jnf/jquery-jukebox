require 'rails_helper'

TIMJ_SEARCH = { cassette_name: "TIMJ_search", record: :new_episodes }

RSpec.describe ApiController, type: :controller do
  describe "interacting with the This Is My Jam API", vcr: TIMJ_SEARCH do
    before :each do
      get :search, artist: "the knife"
    end

    it "should be successful" do
      expect(response).to be_ok
    end

    it "should return a json response object" do
      expect(response.header['Content-Type']).to include 'application/json'
    end

    context "the returned json object" do
      it "has the right keys" do
        data = JSON.parse response.body

        %w(title artist url).each do |key|
          expect(data.map(&:keys).flatten.uniq).to include key
        end
      end
    end
  end
end
