package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"oauth-pro/github"

	UUID "github.com/google/uuid"
)

var (
	indexHTML string
)

//helper for error print
func printErr(err error) {
	fmt.Printf(err.Error())
}

//initialize
func init() {
	//read and build static html file
	indexByte, err := ioutil.ReadFile("views/index.html")
	if err != nil {
		printErr(err)
	}
	indexHTML = string(indexByte)
}

//index hook
func main() {
	http.HandleFunc("/", handleMain)
	http.HandleFunc("/login", handleLogin)
	http.HandleFunc("/callback", handleCallback)
	err := http.ListenAndServe(":"+os.Getenv("PORT"), nil)

	printErr(err)

}

//handle root path
func handleMain(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, indexHTML)
}

//handle login path
func handleLogin(w http.ResponseWriter, req *http.Request) {
	service := req.FormValue("service")
	uuid, err := UUID.NewRandom()
	if err != nil {
		printErr(err)
	}
	switch service {
	case "github":
		url := github.GithubOauthConfigs.AuthCodeURL(uuid.String())
		github.GithubOauthStore.StateUUID = uuid.String()
		http.Redirect(w, req, url, http.StatusTemporaryRedirect)
		break
	default:
		handleMain(w, req)
		break
	}
}

//handle callback path
func handleCallback(w http.ResponseWriter, req *http.Request) {
	service := req.FormValue("service")

	switch service {
	case "github":
		auth, err := github.ValidateCallback(req)
		if err != nil || !auth {
			handleLogin(w, req)
			break
		}
		content, err := github.Show()
		if err != nil {
			printErr(err)
			break
		}
		w.Header().Add("Content-Type", "application/json")
		fmt.Fprintf(w, content)
		break
	}
}
