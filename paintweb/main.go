package main

import(
	"net/http"
)


func handleDefault(w http.ResponseWriter, req *http.Request){
	if req.URL.Path == "/"{
		http.ServeFile(w, req, "www/index.htm")
		return
	}

}

func main(){
	http.HandleFunc("/", handleDefault)
	http.ListenAndServe(":8888", nil)
}