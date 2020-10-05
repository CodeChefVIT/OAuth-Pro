package github

import (
	"context"
	"io/ioutil"
	"net/http"
	"os"

	"golang.org/x/oauth2/github"

	"golang.org/x/oauth2"
)

var (
	//GithubOauthConfigs ... Github OAuth service configs
	GithubOauthConfigs = &oauth2.Config{
		RedirectURL:  os.Getenv("GITHUB_CALLBACK_URL") + "?service=github",
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		Endpoint:     github.Endpoint,
	}
	//GithubOauthStore ... Store access token
	GithubOauthStore struct {
		token     *oauth2.Token
		StateUUID string
	}
)

// ValidateCallback ... To validate all github login callbacks
func ValidateCallback(req *http.Request) (bool, error) {
	state := req.FormValue("state")
	token := req.FormValue("code")
	if state != GithubOauthStore.StateUUID {
		return false, nil
	}

	if token != "" {
		accessToken, err := GithubOauthConfigs.Exchange(context.Background(), token)
		if err != nil {
			return false, err
		}
		GithubOauthStore.token = accessToken
		return true, nil
	}
	return false, nil

}

//Show ... To show authorized information
func Show() (string, error) {
	req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
	if err != nil {
		return "", err
	}
	req.Header.Add("Authorization", "token "+GithubOauthStore.token.AccessToken)
	response, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}

	defer response.Body.Close()
	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return "", err
	}
	return string(responseData), nil

}
