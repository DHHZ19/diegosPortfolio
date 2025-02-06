---
title: Reddit CLI Built With Golang
description: A step by step guide
pubDate: 3 19 2024
heroImage: https://diegohdev.com/golang.png
---

**Overview:** You will learn how to get json data form the reddit api and open the Reddit post in your default web browser.

**Prerequisites:**

- Go runtime

To download the go runtime visit this [link.](https://go.dev/doc/install)

## Getting started

Start by creating a new directory for your project

In the command line `mkdir RedditCLI`

Next let enable dependency tracking by generating a `go.mod` file.

run `go mod init redditcli/reddit`

In development the module path will typically be the place you store your source code for me it would be github.com/goredditcli the above is ok for now.

now create a `main.go` file.

In the command line `touch main.go`.

In the `main.go` file write the following code.

```go
package main

import "fmt"

func main () {
  fmt.Println("hello, world")
}
```

- In the code above we declare a package name this is go's way of grouping functions in a file.
- we also import import the `"fmt"` package, this has functions for formatting text, as well as ways of printing to the console.
- finally, the main `Println` function to prints "hello, world" to the console.

To run go code run `go run main.go` in the command line.

## Create a Struct for our Reddit data

write the following code

```go
package main

import "fmt"

type RedditPostData struct {
    Data struct {
        After    string `json:"after"`
        Children []struct {
            Kind string `json:"kind"`
            Data struct {
                Title     string `json:"title"`
                Permalink string `json:"permalink"`
            } `json:"data,omitempty"`
        } `json:"children"`
    } `json:"data"`
}


func main () {
  fmt.Println("hello, world")
}
```

The `struct` is a type that simply holds a collection of fields. I know the json to be returned will be in this format, to view the json data for yourself visit this link [https://www.reddit.com/.json](https://www.reddit.com/.json). To structure any json to a valid struct type use this [tool](https://mholt.github.io/json-to-go/).

## Fetching json data from reddit

replace `import "fmt"` with the following:

```go
import (
  "fmt"
  "net/http"
  "log"
  "math/rand"
  "encoding/json"
)
```

- The `net/http` adds go package to allow us to make a get request.
- The `log` package will be used to for logging.
- `math/rand` will be used to generate a random number.
- `encoding/json` allows us to implement encoding and decoding of JSON.

Delete everything within the main function and write the following code

```go
func main() {
    resp, err := http.Get("https://www.reddit.com/.json")
    if err != nil {
        log.Fatalln(err)
    }

    defer resp.Body.Close()
    bodyBytes, _ := io.ReadAll(resp.Body)

    // Convert response body to RedditPostData struct
    var data RedditPostData
    err = json.Unmarshal([]byte(bodyBytes), &data)
    if err != nil {
        fmt.Println(err)
        return
    }
}

randomIndex := rand.Intn(len(data.Data.Children))
```

The `http.Get()` code above allows to make a HTTP GET request for the reddit post data, it either returns a response with the the JSON data or returns an error which is why `resp, err` is there. If the err variable is not nil then we log the error.

The next line `defer resp.Body.Close()` closes the response body when we're **finished** using it which is why the `defer` keyword is used.

`io.ReadAll(resp.Body)` reads the data from the response body and returns it.

`err = json.Unmarshal([]byte(bodyBytes), &data)` decodes the json data and point the decoded json to the `data` RedditPostData struct.

## Set up a CLI flag

To your imports add `"flag"` package

```go
    printPtr := flag.Bool("print", false, "a bool")
    flag.Parse()
```

Here we declare a print flag boolean with a default value "print" and a short description. The `flag.Bool` function returns a boolean pointer not a boolean value.

## Finally open the post in your web browser or print the title and url to the console

To your imports add `"github.com/pkg/f"` package this package will allow us to open a file in your default web browser.

The full package list should now look like

```go
import (
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"

	"github.com/pkg/browser"
)
```

```go
    // if -print flag is passed log the reddit post title and URL
    if *printPtr {
        fmt.Printf("The Reddit Post Title is:  %v\n The permalink is https://reddit.com%v\n", data.Data.Children[randomIndex].Data.Title, data.Data.Children[randomIndex].Data.Permalink)
    } else {
        randomPostPermaLink := data.Data.Children[randomIndex].Data.Permalink
        postURL := fmt.Sprintf("%s%s", "https://reddit.com", randomPostPermaLink)
        browser.OpenURL(postURL)
    }
```

The above code checks the the `printPtr` if its true it prints the reddit post title and url. Otherwise it constructs the post URL using the `Sprintf` function and uses the `OpenURL` function to open the Reddit post in your default web browser.

## Final steps

run `go mod tidy`

run `go install`

run `export PATH=$PATH:$(dirname $(go list -f '{{.Target}}' .))` this will make running binaries easy see go [docs](https://go.dev/doc/code)

now you should be able to run `reddit` in you cli and it will run the program in any directory. Note: if this doesn't work it the command will be what is in your `go.mod` file.

run `go run main.go`

All done! View the full source code [here](https://github.com/DHHZ19/goRedditCLI/blob/main/main.go).
