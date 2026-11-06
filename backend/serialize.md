# Serialization and Deserialization in Go

This document explains serialization and deserialization in Go in a simple, practical, and beginner friendly way. These concepts are fundamental in backend development and are used heavily in APIs, file handling, and distributed systems.

---

## What is Serialization?

Serialization is the process of converting a Go data structure (such as a struct) into a format that can be stored or transmitted.

Common serialization formats include:

- JSON
- XML
- Binary formats (Protobuf, Gob)

### In simple terms

Go struct → JSON or bytes

---

## What is Deserialization?

Deserialization is the reverse process. It converts data from a transferable format (JSON or bytes) back into a Go data structure so the program can use it.

### In simple terms

JSON or bytes → Go struct

---

## Why Serialization and Deserialization Are Needed

Go programs cannot directly send structs over:

- HTTP
- network connections
- files
- message queues

Only bytes or text can be transmitted. Serialization converts in-memory Go objects into transferable formats. Deserialization converts those formats back into usable Go objects.

---

## Example Go Struct

```go
type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}
```

Serialization in Go (Go → JSON)
-------------------------------

Serialization converts a Go struct into JSON.

```go
user := User{
    ID:    1,
    Name:  "Parship",
    Email: "parship@example.com",
}
jsonBytes, err := json.Marshal(user)
if err != nil {
    panic(err)
}
fmt.Println(string(jsonBytes))
```

### Output

```json
{"id":1,"name":"Parship","email":"parship@example.com"}
```

### Explanation

*   json.Marshal reads the struct fields
*   Converts them into JSON key-value pairs
*   Returns a byte slice (\[\]byte)
    

This process is called serialization.

Deserialization in Go (JSON → Go)
---------------------------------

Deserialization converts JSON back into a Go struct.

```go
jsonData := []byte(`{"id":2,"name":"Amit","email":"amit@example.com"}`)
var user User
err := json.Unmarshal(jsonData, &user)
if err != nil {
    panic(err)
}
fmt.Println(user)
```

### Output

```plaintext
{2 Amit amit@example.com}
```

Why a Pointer Is Required
-------------------------

```go
json.Unmarshal(data, &user)
```

Unmarshal needs a pointer so it can modify the original struct. Without a pointer, Go would pass a copy and the data would not be written back.

Serialization in HTTP Responses
-------------------------------

```go
func getUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    user := User{
        ID:    1,
        Name:  "Parship",
        Email: "parship@example.com",
    }
    json.NewEncoder(w).Encode(user)
}
```

*   Converts the struct to JSON
*   Writes JSON to the HTTP response body
    

Deserialization from HTTP Requests
----------------------------------

```go
func createUser(w http.ResponseWriter, r *http.Request) {
    var user User
    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }
    fmt.Println(user)
}
```

*   Reads JSON from the request body
*   Converts it into a Go struct
    

Formats Other Than JSON
-----------------------

Serialization is not limited to JSON. Other formats include:

*   Protobuf (used in gRPC)
*   XML
*   MessagePack
*   Gob (Go-specific)
    
The concept remains the same regardless of format.

Interview One-Liner
-------------------

Serialization converts a Go data structure into a transferable format like JSON or bytes, and deserialization converts that format back into a Go data structure.

Summary
-------

*   Serialization means struct to JSON or bytes
*   Deserialization means JSON or bytes to struct
*   Required for APIs, files, databases, and messaging systems
*   Core concept in backend development
