package main

import (
	"net/http"
)

func handleDefault(w http.ResponseWriter, req *http.Request) {
	if req.URL.Path == "/" {
		http.ServeFile(w, req, "www/index.htm")
		return
	}

	// serve as file server  (other files won't be loaded, such as view.js in index.htm)
	wwwServer.ServeHTTP(w, req)

}

var (
	wwwServer = http.FileServer(http.Dir("www"))
)

func main() {
	http.HandleFunc("/", handleDefault)
	http.ListenAndServe(":8888", nil)
}
