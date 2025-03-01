(ns metabase.api.bookmark-test
  "Tests for /api/bookmark endpoints."
  (:require [clojure.test :refer :all]
            [metabase.models.card :refer [Card]]
            [metabase.models.collection :refer [Collection]]
            [metabase.models.dashboard :refer [Dashboard]]
            [metabase.test :as mt]
            [metabase.util :as u]))

(deftest bookmarks-test
  (testing "POST /api/bookmark/:model/:model-id"
    (mt/with-temp* [Collection [collection {:name "Test Collection"}]
                    Card       [card {:name "Test Card"}]
                    Dashboard   [dashboard {:name "Test Dashboard"}]]
      (testing "check that we can bookmark a Collection"
        (is (= (u/the-id collection)
               (->> (mt/user-http-request :rasta :post 200 (str "bookmark/collection/" (u/the-id collection)))
                    :collection_id))))
      (testing "check that we can bookmark a Card"
        (is (= (u/the-id card)
               (->> (mt/user-http-request :rasta :post 200 (str "bookmark/card/" (u/the-id card)))
                    :card_id))))
      (testing "check that we can bookmark a Dashboard"
        (is (= (u/the-id dashboard)
               (->> (mt/user-http-request :rasta :post 200 (str "bookmark/dashboard/" (u/the-id dashboard)))
                    :dashboard_id))))
      (testing "check that we can retreive the user's bookmarks"
        (is (= #{"card" "collection" "dashboard"}
               (->> (mt/user-http-request :rasta :get 200 "bookmark")
                    (map :type)
                    set))))
      (testing "check that we can delete bookmarks"
        (mt/user-http-request :rasta :delete 204 (str "bookmark/card/" (u/the-id card)))
        (is (= #{"collection" "dashboard"}
               (->> (mt/user-http-request :rasta :get 200 "bookmark")
                    (map :type)
                    set)))
        (mt/user-http-request :rasta :delete 204 (str "bookmark/collection/" (u/the-id collection)))
        (mt/user-http-request :rasta :delete 204 (str "bookmark/dashboard/" (u/the-id dashboard)))
        (is (= #{}
               (->> (mt/user-http-request :rasta :get 200 "bookmark")
                    (map :type)
                    set)))))))
