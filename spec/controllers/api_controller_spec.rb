require 'rails_helper'

TIMJ_SEARCH   = { cassette_name: "TIMJ_search", record: :new_episodes }
TIMJ_BREAKING = { cassette_name: "TIMJ_breaking", record: :new_episodes }
TIMJ_RANDO = { cassette_name: "TIMJ_rando", record: :new_episodes }


RSpec.describe ApiController, type: :controller do
  describe "interacting with the This Is My Jam API", vcr: TIMJ_SEARCH do
    context "API Search" do
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
        end # it
      end # context json
    end
  end # describe

  describe "API Breaking", vcr: TIMJ_BREAKING do
    before :each do
      get :breaking
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
      end # it
    end # context json
  end

  describe "API Random", vcr: TIMJ_RANDO do
    before :each do
      get :rando
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
      end # it
    end # context json
  end
end # describe
