# Backend Request Lifecycle

![Image](https://outcomeschool.com/static/images/blog/go-backend-arch-diagram.png)

This explains **what happens inside a backend server** when a request comes in and **where each piece of code lives**.

---

## High-Level Flow

> **Request → Middleware → Router → Handler → Service → Repository → Response**

---

## 1. Request Enters the Server

A client sends an HTTP request:

```http
POST /users
Content-Type: application/json
```

The Go HTTP server receives it.

---

## 2. Middleware (Runs First)

![Image](https://drstearns.github.io/tutorials/gomiddleware/img/flow.png)

![Image](https://media2.dev.to/dynamic/image/width%3D1000%2Cheight%3D420%2Cfit%3Dcover%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F18938d07sxa6bj64zr02.png)

Middleware runs **before the handler**.
It is used for logic that applies to **many routes**.

### Example: Logging Middleware (Go)

```go
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("Incoming request:", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}
```

Used for:

* Logging
* Authentication
* Rate limiting
* CORS
* Error handling

Middleware can:

* Modify request
* Stop request early
* Pass it forward

---

## 3. Routing (Find the Correct Handler)

The router decides **which handler function** should run.

Example:

```go
router.HandleFunc("/users", CreateUserHandler).Methods("POST")
```

Routing is based on:

* HTTP method
* URL path

---

## 4. Handler / Controller (HTTP Layer)

![Image](https://media.geeksforgeeks.org/wp-content/uploads/20250705152348042640/Request-and-Response-Cycle.webp)

This is the **entry point of your business code**.

### Responsibilities of a Handler

* Read request data
* Deserialize JSON
* Validate input
* Transform data
* Return HTTP response
* Call the service

### Example: Handler in Go

```go
type CreateUserRequest struct {
	Email string `json:"email"`
	Age   int    `json:"age"`
}

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	var req CreateUserRequest

	// Deserialize JSON
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid JSON", http.StatusBadRequest)
		return
	}

	// Validation
	if req.Email == "" {
		http.Error(w, "email is required", http.StatusBadRequest)
		return
	}

	// Transformation
	req.Email = strings.ToLower(req.Email)

	// Call service
	user, err := userService.CreateUser(r.Context(), req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(user)
}
```

### What handlers should NOT do

* Database queries
* Business rules
* Complex logic

---

## 5. Service Layer (Business Logic)

The service layer decides **what should happen**.

### Responsibilities

* Business rules
* Orchestration
* Calling repositories
* Calling other services

### Example: Service in Go

```go
type UserService struct {
	repo UserRepository
}

func (s *UserService) CreateUser(ctx context.Context, req CreateUserRequest) (*User, error) {
	if req.Age < 18 {
		return nil, errors.New("user must be at least 18")
	}

	return s.repo.SaveUser(ctx, req.Email, req.Age)
}
```

### Important rule

> **Services do not know about HTTP.**

No `http.ResponseWriter`, no status codes.

---

## 6. Repository Layer (Database Access)

The repository talks **only to the database**.

### Responsibilities

* Build queries
* Execute queries
* Return data

### Example: Repository in Go

```go
type UserRepository interface {
	SaveUser(ctx context.Context, email string, age int) (*User, error)
}

type PostgresUserRepo struct {
	db *sql.DB
}

func (r *PostgresUserRepo) SaveUser(ctx context.Context, email string, age int) (*User, error) {
	query := `INSERT INTO users (email, age) VALUES ($1, $2) RETURNING id`
	var id int
	err := r.db.QueryRowContext(ctx, query, email, age).Scan(&id)
	if err != nil {
		return nil, err
	}
	return &User{ID: id, Email: email, Age: age}, nil
}
```

### Important rule

> **Repository methods should do one thing only.**

---

## 7. Context (Passed Everywhere)

The `context.Context` flows through:

* Middleware
* Handler
* Service
* Repository

Used for:

* Timeouts
* Cancellation
* Request IDs
* Auth info

```go
ctx := r.Context()
```

**`context.Context` is a stop signal that travels with a request.**

If the user disconnects or a timeout happens, the context tells all parts:

> **“Stop working now.”**

Why do we need to stop?
Imagine this:
* User clicks “Send message”
* Server starts working
* User closes the app or internet drops

Without context
→ Server keeps working for nothing

With context
→ Server is told: “Stop. User is gone.”

That signal is context.

That’s all you need to know.

---

# How a Backend Server Handles a Request (real life example) (If not understood by reading the above)

Think of a backend server like a **restaurant**.

---

## Step 1: A Request Comes In

You (the client) send a request:

> “Create a new user”

This is like **a customer placing an order**.

The server receives this request.

---

## Step 2: Middleware (Security Guard)

Before your order reaches the kitchen, it passes through a **security guard**.

The guard can:

* Check who you are (auth)
* Check how many times you came (rate limit)
* Write your name in a log book

If something is wrong, the guard can stop you **before** you reach the counter.

**Middleware = security guard**

---

## Step 3: Router (Receptionist)

Now the request reaches the **receptionist**.

The receptionist looks at:

* What you want (`/users`)
* How you want it (GET, POST)

Then says:

> “This order goes to Counter 3”

**Router = receptionist**

---

## Step 4: Handler / Controller (Counter Staff)

This is the **first real person who handles your order**.

The handler:

* Reads what you sent
* Checks if it makes sense
* Fixes small things

Example:

* You said age = `"25"` → convert to `25`
* You forgot email → reject request

If something is wrong:

* Handler sends **400 Bad Request**
* Stops everything early

**Handler = counter staff**

---

## Step 5: Service (Chef)

Now the order goes to the **chef**.

The chef:

* Knows the business rules
* Decides what should happen

Example:

* “User must be at least 18”
* “Send welcome email”
* “Create user account”

The chef does **not** talk to customers directly.

**Service = chef**

---

## Step 6: Repository (Store Room)

The chef needs ingredients, so they ask the **store room**.

The store room:

* Only stores and fetches data
* Does not make decisions

Example:

* Save user to database
* Get user from database

**Repository = store room**

---

## Step 7: Response Goes Back

Once everything is done:

* The handler sends the result back
* The client gets a response

> “User created successfully”

---

## Full Flow in One Line

```
Client
  ↓
Middleware (guard)
  ↓
Router (receptionist)
  ↓
Handler (counter)
  ↓
Service (chef)
  ↓
Repository (store room)
  ↓
Response
```

---

## Why We Split Like This

Because:

* Cleaner code
* Easier to fix bugs
* Easier to test
* Easier to scale

Each part has **one simple job**.

---

## Scenario

### User wants to create an account. Flow:
* Handler:
Reads input,
Calls service
→
Service:
Checks rules
“Is age ≥ 18?”,
Needs to save user: calls repository
→
Repository:
Saves user in database
Returns result
→
Service:
Gets result,
Returns to handler.
