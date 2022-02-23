(ns metabase.bootstrap
  (:gen-class))

;; This has to be done BEFORE any logging happens! VERY IMPORTANT!!!!!
(System/setProperty "java.util.logging.manager" "org.apache.logging.log4j.jul.LogManager")

(defn -main
  [& args]
  (require 'metabase.core)
  (apply (resolve 'metabase.core/-main) args))
