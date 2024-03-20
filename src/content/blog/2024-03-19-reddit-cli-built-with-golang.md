---
title: Reddit Cli built with Golang
description: A step by step guide
pubDate: 03 19 2024
heroImage: public/golang.jpeg
---
Overview: You will lean how to get json data form the reddit api and open the Reddit post in your default web browser.

Prerequisites:

*   Go run time
    

To download the go runtime visit this [link.](https://go.dev/doc/install)

## Getting started

Start by creating a new directory for your project

`mkdir RedditCLI`

Next let enable dependency tracking by generating our `go.mod` file.

run `go mod init redditcli/reddit`

In development the module path will typically be the place you store your source code for me it would be github.com/goredditcli the above is ok for now.

now create a `main.go` file.

In the command line run `touch main.go`.

In the file write the follwing code.

```go

package main

import "fmt"

func main () {
  fmt.Println("hello, world")
}
```

*   In the code above we declare a package name this is go's way of grouping functions in a file.
    
*   we also import import the "fmt" package, this has functions for formatting text, as well as ways of printing to the console.
    
*   finally, the main function uses the `Println` function to print "hello, world" to the console.
    

To run go code execute `go run main.go` in the command line.

**Create a Struct for our Reddit data**

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

The struct is a type that simply holds a collection of fields. I know the json to be returned will be in this format. To view how this will be returned visit this link [https://www.reddit.com/.json](https://www.reddit.com/.json) this gives you an idea of what the data will look like. Instally structure json to a valied struct type use this tool.

**Fetching json data from reddit**

Add a new package

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

*   The `net/http` adds go package to allow us to make a get request.
    
*   The `log` package will be used to for logging.

*   `math/rand` will be used to generate a random number.

*   `encoding/json` allows us to implement encoding and decoding of JSON.
    

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
The above code allows to make a HTTP GET request for the reddit post data, `http.Get()` either returns a response with the the JSON data or throws an error with is `resp, err` is there. If the err variable is not nil then we log the error.

d

**Set up a flag to print Reddit post title and URL**