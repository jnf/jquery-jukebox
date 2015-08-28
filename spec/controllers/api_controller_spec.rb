require 'rails_helper'

TIMJ_SEARCH = { cassette_name: "TIMJ_search", record: :new_episodes }
TIMJ_SEARCH_EMPTY = { cassette_name: "TIMJ_no_content", record: :new_episodes }

TIMJ_POPULAR = { cassette_name: "TIMJ_POPULAR", record: :new_episodes }
TIMJ_UNPOPULAR = { cassette_name: "TIMJ_UNPOPULAR", record: :new_episodes }
TIMJ_RANDO = { cassette_name: "TIMJ_RANDO", record: :new_episodes }
TIMJ_BREAKING = { cassette_name: "TIMJ_BREAKING", record: :new_episodes }

RSpec.describe ApiController, type: :controller do
  describe "Searching for JAMS", vcr: TIMJ_SEARCH do
    context "Got many results" do
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

    describe "no results returned", vcr: TIMJ_SEARCH_EMPTY do
      it "tells me I've got a 204" do
        get :search, artist: "lololololololol"
        expect(response.status).to eq 204
      end
    end
  end

  describe "Requesting POPULAR jams", vcr: TIMJ_POPULAR do
    context "Got many results" do
      before :each do
        get :popular
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

  describe "Requesting UNPOPULAR jams", vcr: TIMJ_UNPOPULAR do
    context "Got many results" do
      before :each do
        get :unpopular
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

  describe "Requesting RANDO jams", vcr: TIMJ_RANDO do
    context "Got many results" do
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
        end
      end
    end
  end

describe "Requesting BREAKING jams", vcr: TIMJ_BREAKING do
    context "Got many results" do
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
        end
      end
    end
  end
end
