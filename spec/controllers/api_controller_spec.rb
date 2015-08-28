require 'rails_helper'
require "support/shared_controller_examples"


TIMJ_SEARCH = { cassette_name: "TIMJ_search", record: :new_episodes }
TIMJ_SEARCH_EMPTY = { cassette_name: "TIMJ_no_content", record: :new_episodes }
TIMJ_POPULAR = { cassette_name: "TIMJ_popular", record: :new_episodes }
TIMJ_RANDOM = { cassette_name: "TIMJ_random_one", record: :new_episodes }

RSpec.describe ApiController, type: :controller do
  describe "#search (searching for jams)", vcr: TIMJ_SEARCH do
    context "search query returns one or more jams" do
      before :each do
        get :search, artist: "the knife"
      end

      it_behaves_like "TIMJ API response"
    end

    context "no results returned", vcr: TIMJ_SEARCH_EMPTY do
      it "tells me I've got a 204" do
        get :search, artist: "lololololololol"
        expect(response.status).to eq 204
      end
    end
  end


  describe "#popular jams", vcr: TIMJ_POPULAR do
    context "the results" do
      before :each do
        get :popular
      end

      it_behaves_like "TIMJ API response"
    end
  end

  describe "#random jams", vcr: TIMJ_RANDOM do
    context "the results" do
      before :each do
        get :random
      end

      it_behaves_like "TIMJ API response"
    end
  end
end
