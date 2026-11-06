## Validations and Transformations

This topic answers one simple question:

> **How do we make sure the data coming into our backend is correct and safe?**

---

## Typical Backend Structure

<img width="640" height="261" alt="image" src="https://github.com/user-attachments/assets/792da0d8-3ae6-4d48-8d9c-56bc4c262e16" />

Most backend apps are divided into layers:

### 1. Controller Layer

This is the **entry point** of the server.

It:

* Receives HTTP requests
* Reads body, query params, headers, path params
* Sends HTTP responses and status codes
* **Starts validation**

Think of it as the **gatekeeper**.

---

### 2. Service Layer

This is where **business logic** lives.

It:

* Applies rules like “can this user do this?”
* Coordinates different operations
* Calls the repository

---

### 3. Repository Layer

This talks to the **database**.

It:

* Saves data
* Reads data
* Should assume data is already valid

---

## Where Validation Should Happen (Very Important)

> **Validation should happen as early as possible — in the controller layer.**

Why?

* Bad data should be rejected immediately
* Business logic should never see invalid data
* Database errors should be avoided

---

## Why Early Validation Matters

### Bad approach (late validation)

* Invalid data reaches database
* Database throws an error
* User gets **500 Internal Server Error**
* User has no idea what went wrong

### Good approach (early validation)

* Invalid data is caught early
* User gets **400 Bad Request**
* Clear message like:

  * “Email is invalid”
  * “Age must be greater than 18”

This is better for:

* User experience
* System stability
* Security

---

## What Needs to Be Validated

Everything coming from the client:

* JSON body
* Query parameters
* URL path parameters
* Headers

Never trust client input.

---

## Types of Validation (Easy Categories)

### 1. Type Validation

Checks **data type**.

Examples:

* Is age a number?
* Is name a string?
* Is roles an array?

---

### 2. Syntactic Validation

Checks **format**.

Examples:

* Is email in valid email format?
* Is date in correct format?
* Is phone number structured correctly?

---

### 3. Semantic Validation

Checks **logical meaning**.

Examples:

* Date of birth is not in the future
* Age is between 0 and 120
* Start date is before end date

---

### 4. Complex Validation

Checks **relationships between fields**.

Examples:

* Password and confirm password match
* Field A is required only if field B is present

---

## What Are Transformations?

**Transformations change data into the format you want.**

They usually happen:

* Before validation
* Or together with validation

Examples:

* Convert `"25"` → `25`
* Convert email to lowercase
* Trim spaces from strings
* Parse query params into numbers

Transformations make data **consistent**.

---

## Validation + Transformation Pipeline

Best practice:

* Transform data
* Validate data
* Pass clean data to service layer

This keeps code:

* Clean
* Predictable
* Easy to maintain

---

## Frontend vs Backend Validation (Very Important)

### Frontend Validation

* For user experience
* Faster feedback
* Can be bypassed

Example:

* “Please enter a valid email”

---

### Backend Validation

* For security and correctness
* **Must always exist**
* Never trust the frontend

Even if frontend validates:

> **Backend must validate again.**

---
