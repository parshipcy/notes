# REST API Design

![Image](https://www.altexsoft.com/media/2021/03/rest_api_works.png)

This explains **what REST APIs are**, **why we use them**, and **how to design them properly** as a backend engineer.

---

## 1. What Is a REST API?

A **REST API** is a **set of rules** for how a client (frontend/app) talks to a server (backend).

In simple words:

> **REST is a standard way to send and receive data over HTTP.**

Example:

```http
GET /users
```

Means:

> “Give me the list of users.”

---

## 2. Why API Design Matters

Bad API design causes:

* Confusion
* Bugs
* Rewrites

Good API design:

* Is easy to understand
* Is predictable
* Saves time

That’s why we follow **REST standards**.

---

## 3. Very Short History (Why REST Exists)

* Web was invented using **HTTP + URLs**
* As traffic grew, systems needed rules to scale
* **Roy Fielding** defined these rules
* He named them **REST**

REST is about **scaling systems cleanly**.

---

## 4. Core REST Principles

### Client–Server

* Client shows UI
* Server stores data and logic
* They are independent

---

### Stateless

* Server does not remember past requests
* Each request must contain all info

Example:

* Auth token sent on every request

---

### Cacheable

* Responses can be cached
* Improves speed

---

### Uniform Interface

* Same rules everywhere
* Same HTTP methods
* Same patterns

---

### Layered System

* Requests may pass through:

  * Load balancers
  * Proxies
  * Gateways

Client doesn’t care.

---

## 5. What “REST” Actually Means

REST = **Representational State Transfer**

### Representation

Data is sent as:

* JSON
* XML
* HTML

Mostly JSON today.

---

### State

The data itself:

* User
* Order
* Message

---

### Transfer

Moving that data using:

* GET
* POST
* PUT
* PATCH
* DELETE

---

## 6. Resource-Based URLs (Most Important)

![Image](https://substackcdn.com/image/fetch/%24s_%21HDP0%21%2Cf_auto%2Cq_auto%3Agood%2Cfl_progressive%3Asteep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1fe69fe9-1e79-45b8-abc3-1d5ce8af280c_2250x2624.heic)

### Rule 1: Use nouns, not verbs

❌ `/getUsers`
✅ `/users`

---

### Rule 2: Use plural resources

✅ `/books`
✅ `/users/123`

---

### Rule 3: Use hierarchy

```http
/organizations/123/projects
```

Means:

> Projects that belong to organization 123

---

### Rule 4: Use hyphens, not underscores

✅ `/harry-potter`
❌ `/harry_potter`

---

## 7. HTTP Methods (What Action You Want)

| Method | Meaning |
| ------ | ------- |
| GET    | Read    |
| POST   | Create  |
| PUT    | Replace |
| PATCH  | Update  |
| DELETE | Remove  |

---

## 8. Idempotency

Idempotent means:

> **Doing the same request multiple times gives the same result.**

---

### Idempotent

* GET
* PUT
* PATCH
* DELETE

Calling them again does not create extra side effects.

---

### Not Idempotent

* POST

Calling POST twice creates two resources.

---

## 9. When to Use POST (Important Tip)

Use POST for:

* Creating resources
* Custom actions

Example:

```http
POST /users/123/reset-password
```

POST is fine for non-CRUD actions.

---

## 10. How to Design an API (Practical Workflow)

![Image](https://i.imgur.com/wvwkvae.png)

![Image](https://substackcdn.com/image/fetch/f_auto%2Cq_auto%3Agood%2Cfl_progressive%3Asteep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F2af32cb2-0c1d-4bc8-aca9-c8543a137db2_5544x1694.png)

### Step 1: Start from UI

* Look at screens
* See what data is needed

---

### Step 2: Identify resources

* users
* organizations
* messages

---

### Step 3: Design URLs

```http
GET /organizations
POST /organizations
```

---

### Step 4: Design database later

* Tables come after API clarity

---

## 11. Pagination (Why It Exists)

![Image](https://media.geeksforgeeks.org/wp-content/uploads/20220309113947/SpringRESTPagination.png)

Problem:

* Too much data
* Slow responses

Solution:

* Send data in pages

Example:

```http
GET /users?page=1&limit=10
```

Response:

```json
{
  "data": [...],
  "page": 1,
  "totalPages": 5,
  "total": 50
}
```

---

## API Design Guidelines

### 1. Interactive documentation

Your API should be easy to explore and test.

* Developers should be able to see endpoints
* Try requests
* See responses

This reduces confusion and speeds up development.

---

### 2. Make it intuitive and consistent

APIs should behave in a predictable way.

* Similar endpoints should look similar
* Same rules everywhere
* Same naming patterns

This helps developers **guess how your API works** without reading everything.

---

### 3. Provide sane defaults

Your API should work even with minimal input.

* Default page size
* Default sorting
* Optional fields should truly be optional

This makes the API easier to use.

---

### 4. Avoid abbreviations

Full words are clearer than short forms.

* `organization` instead of `org`
* `description` instead of `desc`

Clarity is more important than saving a few characters.

---

### 5. Follow standards and design for developers

Do not invent new rules unless necessary.

* Follow REST conventions
* Use common HTTP methods
* Return standard status codes

Always think:

> “Would this API feel natural to someone using it for the first time?”
