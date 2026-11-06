# Routing in Backend Systems

Routing is a core backend concept that determines **how incoming HTTP requests are mapped to server-side logic**. It defines **where a request should go** and **what action should be performed** on a specific resource.

In simple terms, routing answers:

- Which function should handle this request?
- What resource is being accessed?
- What operation is being performed?

---

## What is Routing?

Routing maps:

- **HTTP method** (GET, POST, PUT, DELETE, etc.)
- **URL path** (such as `/api/users/123`)

to:

- A **handler**, **controller**, or **function** on the server

Example:

```http
GET /api/users → getAllUsers()
POST /api/users → createUser()
```

The same URL path can behave differently based on the HTTP method.

---

## Static Routes

Static routes have **fixed, unchanging paths**.

They do not contain any variable segments.

### Characteristics

- Path is constant
- Always returns the same type of resource
- Easy to cache and reason about

### Example

```http
GET /api/books
```

Meaning:

- Fetch a list of all books
- No parameters involved in the path

Static routes are commonly used for:

- Listing resources
- Health checks
- Fixed operations

---

## Dynamic Routes (Path Parameters)

Dynamic routes contain **variable values inside the URL path**.

These values are called **path parameters**.

### Purpose

- Fetch or modify a specific resource
- Identify resources by ID or unique key

### Example

```http
GET /api/users/123
```

Here:

- `123` is a dynamic value
- It represents the user ID

### Route Definition Convention

Many frameworks use a placeholder syntax like:

```plaintext
/api/users/:id
```

The server extracts `id` from the path and uses it in logic.

---

## Query Parameters

Query parameters are **key-value pairs appended to the URL** after a question mark (`?`).

### Syntax

```http
/api/books?author=tolkien&page=2&limit=10
```

### Characteristics

- Mostly used with GET requests
- Do not change the identity of the resource
- Used for additional data or instructions

### Common Use Cases

- Searching
- Pagination
- Filtering
- Sorting

Examples:

- `?page=2`
- `?limit=20`
- `?sort=asc`
- `?search=backend`

---

## Difference: Path Parameters vs Query Parameters

| Aspect | Path Parameter | Query Parameter |
|--------|----------------|-----------------|
| Purpose | Identify a resource | Modify or filter results |
| Mandatory | Usually required | Usually optional |
| Semantic meaning | Strong | Weak |
| Example | `/users/123` | `/users?page=2` |

---

## Nested Routes

Nested routes express **relationships between resources** in REST APIs.

### Example

```http
/api/users/123/posts/456
```

Meaning:

- Fetch post `456`
- That belongs to user `123`

### Why Use Nested Routes?

- Clear semantic meaning
- Represents ownership or hierarchy
- Improves API readability

### Common Use Cases

- User → Posts
- Order → Items
- Blog → Comments

Each level of nesting typically maps to a different handler.

---

## Route Versioning and Deprecation

Route versioning allows APIs to **evolve safely** without breaking existing clients.

### Example

```http
/api/v1/products
/api/v2/products
```

### Why Version APIs?

- Introduce breaking changes
- Change response formats
- Modify behavior
- Add or remove fields

### Benefits

- Older clients keep working
- New clients use improved versions
- Clear migration path

Versioning also enables **controlled deprecation**, where older versions are phased out gradually.

---

## Catch-All Routes

Catch-all routes handle **requests that do not match any defined route**.

### Example

```plaintext
/*
```

### Purpose

- Prevent generic server errors
- Return user-friendly messages
- Improve developer experience

### Typical Response

```http
404 - Route not found
```

Catch-all routes act as a final safety net in routing logic.

---

## How Routing Works Internally (High Level)

1. Server receives an HTTP request
2. Router checks:
   - HTTP method
   - URL path
3. Matches against defined routes
4. Calls the corresponding handler
5. Returns a response

If no match is found:

- Catch-all route is triggered
- Or a 404 response is returned

---

## Summary

- Routing maps HTTP requests to server-side logic
- Static routes use fixed paths
- Dynamic routes use path parameters
- Query parameters provide optional instructions
- Nested routes express resource relationships
- Versioning supports API evolution
- Catch-all routes handle unknown paths
