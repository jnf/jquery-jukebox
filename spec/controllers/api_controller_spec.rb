require 'rails_helper'

TIMJ_SEARCH = { cassette_name: "TIMJ_search", record: :new_episodes }
TIMJ_SEARCH_NO = { cassette_name: "TIMJ_search_no", record: :new_episodes }
TIMJ_RANDOM = { cassette_name: "TIMJ_random", record: :new_episodes }

RSpec.describe ApiController, type: :controller do
  describe "interacting with the This Is My Jam API search", vcr: TIMJ_SEARCH do
    context "#search" do
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

          %w(title artist via url).each do |key|
            expect(data.map(&:keys).flatten.uniq).to include key
          end
        end
      end
    end
  end

  describe "interacting with the This Is My Jam API search no results", vcr: TIMJ_SEARCH_NO do
    context "#search (no results)" do
      before :each do
        get :search, artist: "398572938doijfw"
      end

      it "should be successful" do
        expect(response.status).to eq 204
      end
      
      context "the returned json object" do
        it "is empty" do
          data = JSON.parse response.body
          expect(data).to eq []
        end
      end
    end
  end

  describe "interacting with the This Is My Jam API random", vcr: TIMJ_RANDOM do
    context "#random" do
      before :each do
        get :random
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

          %w(title artist via url).each do |key|
            expect(data.map(&:keys).flatten.uniq).to include key
          end
        end
      end
    end
  end
end
