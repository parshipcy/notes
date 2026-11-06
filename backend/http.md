## What is HTTP?

HTTP stands for **HyperText Transfer Protocol**.

In simple words:

> **HTTP is the language that browsers and servers use to talk to each other.**

When you:

* Open a website
* Submit a form
* Call an API from frontend

You are using HTTP.

---

## 1. How HTTP Works (Big Picture)

![Image](https://substackcdn.com/image/fetch/%24s_%21g3db%21%2Cw_1200%2Ch_600%2Cc_fill%2Cf_jpg%2Cq_auto%3Agood%2Cfl_progressive%3Asteep%2Cg_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4a38175b-11e8-40ae-879c-ab3ce2027089_2008x1252.png)

### Client and Server

* **Client**: Browser, mobile app, Postman, frontend code
* **Server**: Backend application, API server

Flow:

1. Client sends a **request**
2. Server processes it
3. Server sends a **response**

This always happens in this order.

---

## 2. Stateless Nature of HTTP (Very Important)

### What does stateless mean?

Stateless means:

> The server does **not remember** anything about previous requests.

Example:

* You log in
* You send another request
* Server does not remember you logged in

So how does login work?

Answer:

* Client sends extra data every time. Examples:

  * Cookies
  * JWT tokens
  * Authorization headers

That is how “state” is maintained manually.

---

## 3. Transport Layer (How data moves)

TCP(Transmission Control Protocol) is a low-level network protocol that controls how data is sent reliably over the internet.

You usually do not use TCP directly in application code, but HTTP, HTTPS, and many other protocols depend on TCP.

* What Problem Does TCP Solve?

  * The internet is unreliable by nature:
     * Data can be lost
     * Data can arrive out of order
     * Data can be duplicated

  * TCP solves this by making communication:
    * Reliable
    * Ordered
    * Error-checked

HTTP uses **TCP** underneath.

You do not need to manage TCP directly, but TCP ensures:

* Data arrives correctly
* Data arrives in order
* Lost data is re-sent

Think of TCP as a **reliable delivery system**.

---

## 4. Evolution of HTTP (Why versions exist)

![Image](https://substackcdn.com/image/fetch/f_auto%2Cq_auto%3Agood%2Cfl_progressive%3Asteep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ea2cf88-f4a3-4135-8801-dcaa1eacadcc_2250x2624.png)

### HTTP/1.0

* One request → one connection
* Very slow
* Connection opened and closed every time

### HTTP/1.1

* Same connection reused
* Much faster
* Still requests handled one by one

### HTTP/2

* Single connection
* Multiple requests at the same time
* Faster loading
* Headers are compressed

### HTTP/3

* Uses QUIC (over UDP) (UDP is a transport layer protocol used when speed is more important than reliability && QUIC gives TCP-like reliability with UDP-like speed) 
* Faster connection setup
* Better on poor networks
* Used by modern browsers

You do not choose these manually. Browsers and servers handle this.

---

## 5. HTTP Messages (Requests and Responses)

HTTP communication happens using **messages**.

### Request Message (Client → Server)

Contains:

1. **Method** (what you want)
2. **URL** (where)
3. **Headers** (extra info)
4. **Body** (data, optional)

Example:

```http
GET /users HTTP/1.1
Host: example.com
Authorization: Bearer token
```

This means:

* GET → I want data
* /users → from users route
* Authorization → who I am

---

### Response Message (Server → Client)

Contains:

1. **Status code** (result)
2. **Headers**
3. **Body** (data)

Example:

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

This means:

* 200 → success
* `application/json` means JSON data is coming

---

## 6. What are HTTP Headers?

Headers are **extra information** sent with requests and responses.

Think of headers as:

> Instructions and labels attached to the message

Why headers are needed:

* Authentication
* Caching
* Security
* Content type
* Compression

They help without reading the full body.

---

## 7. Types of Headers (Simple)

### Request Headers

Tell server about the client.

Examples:

* `Authorization` → who you are
* `User-Agent` → browser info
* `Accept` → what response you want

### Response Headers

Tell client about the response.

Examples:

* `Content-Type`
* `Set-Cookie`

### Security Headers

Protect users.

Examples:

* Prevent clickjacking
* Force HTTPS

You will mostly **read** headers at first, not write many.

---

## 8. HTTP Methods (Actions)

HTTP methods tell the server **what you want to do**.

| Method | Meaning               |
|--------|-----------------------|
| GET    | Read data             |
| POST   | Create new data       |
| PUT    | Replace existing data |
| PATCH  | Update part of data   |
| DELETE | Remove data           |

Example:

* GET /users → get users
* POST /users → create user

---

## 9. OPTIONS Method and CORS (Browser security)

### Same-Origin Policy

Browsers block requests to other domains by default.

This prevents malicious websites from stealing data.

---

### What is CORS?

CORS allows servers to say:

> “Yes browser, this domain is allowed”

Only browsers enforce CORS. Servers do not care.

---

### OPTIONS Request (Preflight)

Before some requests, browser asks:

* Is this allowed?
* Which methods?
* Which headers?

Server answers.
Only then actual request is sent.
This protects users.

Common Beginner Confusion:
“My API works in Postman but not in browser”
- Reason:
  - Postman ignores CORS
  - Browser enforces preflight

---

## 10. Status Codes (Server Response Meaning)

Status codes tell **what happened**.

### 2xx – Success

* 200 OK → success
* 201 Created → new resource created
* 204 No Content → success, no body

### 3xx – Redirect

* 301 → permanent redirect
* 302 → temporary redirect
* 304 → cached version is valid

### 4xx – Client Mistakes

* 400 → bad request
* 401 → not logged in
* 403 → logged in but not allowed
* 404 → not found
* 429 → too many requests

### 5xx – Server Problems

* 500 → Internal Server Error
* 502 → Bad Gateway
* 503 → Service Unavailable
* 504 → Gateway Timeout

---

## 11. HTTP Caching (Speed optimization)

Caching means:
> Save response so you don’t ask server again

Benefits:
* Faster response
* Less server load

Headers used:
* `Cache-Control`
* `ETag`

Browser asks:
> “Has this changed?”

If not, server says:
> “Use old version”

How It Works (Simple Flow)
* Browser requests a page or API
* Server sends response with cache rules
* Browser saves it

Next request:
* If still valid → use cached copy
* If not sure → ask server to confirm

Where Caching Happens
* Browser cache (most common)
* CDN / proxy cache
* Server-side cache

Key HTTP Cache Headers

* Cache-Control:
Tells how long something can be cached
Example: max-age=60 (cache for 60 seconds)

* ETag:
A version tag for the response
Browser asks: “Has this changed?”

* If-None-Match:
Browser sends ETag back to check freshness

If unchanged, server replies:
> 304 Not Modified (use cache)

---

## 12. HTTP Compression

Large responses are compressed.

Why?

* Smaller size
* Faster network transfer

Common:

* gzip
* brotli

Browser automatically decompresses.

---

## 13. Multipart and Chunked Data

### Multipart Data

Used for:

* File uploads
* Form submissions with files

Example:

* Upload image + text together

---

### Chunked Transfer

Used for:

* Streaming
* Large responses

Data sent in parts.
Client reads as it arrives.

---

## 14. HTTPS, TLS, Security

### HTTPS = HTTP + Security

TLS provides:

* Encryption (no one can read data)
* Integrity (data not modified)
* Authentication (real server)

HTTPS protects from:

* Hackers
* WiFi spying
* Data tampering

Always use HTTPS.

---

## Final Summary (One Read)

* HTTP is how web communication works
* Client sends request, server sends response
* HTTP is stateless
* Headers carry extra instructions
* Methods define action
* Status codes explain result
* CORS protects browsers
* Caching and compression improve speed
* HTTPS secures data

If you understand this, you already understand **how the web works at a backend level**.
