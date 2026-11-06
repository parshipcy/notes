Authentication and Authorization
=================================================================

This topic answers two very basic questions for any backend system:

1.  **Who are you?**   
2.  **What are you allowed to do?**
    
Everything else builds on these two questions.

---

## How HTTP Is Connected to Authentication

* **HTTP is stateless**. Each request is independent.
* **Authentication needs memory** (who the user is).
* So we attach identity info to **every HTTP request**.

How we attach it:

* **Session-based auth** → HTTP **cookies** carry a session ID
* **JWT-based auth** → HTTP **headers** carry the token

HTTP itself does not authenticate users.
It only **transports cookies or headers** that auth systems use.

#### so basically,

> **Authentication exists because HTTP forgets everything between requests.**

---

1\. Authentication vs Authorization
---------------------------------------------------------------

### Authentication (Who are you?)

Authentication is about **identity**.

Examples:
*   Login with username and password
*   Login with Google
*   Login with fingerprint

Question it answers:

> “Are you really who you claim to be?”

### Authorization (What can you do?)

Authorization is about **permissions**.

Examples:
*   Can you view this page?
*   Can you delete this record?
*   Are you an admin or a normal user?
    
Question it answers:

> “Now that we know who you are, what are you allowed to do?”

### Simple Rule to Remember
*   **Authentication comes first**
*   **Authorization comes after**

You cannot authorize someone you have not authenticated.

2\. How Authentication Started (Very Simple History)
----------------------------------------------------

Authentication did not start with computers.

### Early Human Society (Trust-Based)

In small villages:
*   Everyone knew everyone
*   A trusted elder could vouch for you

Authentication was:
*   Based on **human trust**
*   Worked only in small groups
    

Problem:
*   Does not scale
    

### Seals, Tokens, and Possession

Later societies used:
*   Wax seals
*   Rings
*   Physical marks

Authentication became:
*   “Something you have”
    
Problem:
*   Can be stolen or forged

### Passwords and Shared Secrets

With telegraphs and early communication:
*   People agreed on secret phrases
*   Only trusted parties knew them

Authentication became:
*   “Something you know”
    
Problem:
*   Can be guessed or leaked

### Computers and Password Storage

Early computers:
*   Stored passwords in plain text
*   Anyone could read them

This caused security incidents.

Solution:
*   Hash passwords
*   Never store raw passwords

This is still true today.

### Modern Cryptography

Breakthroughs like:
*   Public-key cryptography
*   Secure key exchange

Enabled:
*   Secure login over the internet
*   Encrypted communication

This is the foundation of modern auth systems.

### Internet Scale Problems

As the internet grew:
*   Millions of users
*   Attacks became common

Result:
*   Passwords alone were not enough

Solution:
*   MFA (Multi-Factor Authentication)

### Modern Era (What We Use Today)

Modern systems use:
*   OAuth
*   JWT
*   Passwordless login
*   Zero-trust security
*   External auth providers

The goal:
*   Secure
*   Scalable
*   User-friendly

3\. Why Sessions Exist
----------------------

### The Problem

HTTP is **stateless**.

That means:
*   Server forgets everything after each request
    
But real apps need:
*   Logged-in users
*   Shopping carts
*   Dashboards

### What Is a Session?
A **session** is how the server remembers you.

Simple flow:
1.  You log in
2.  Server creates a session ID
3.  Session ID is stored on server
4.  Session ID is sent to browser (cookie)
5.  Browser sends it back on every request

Now the server knows:
*   This request belongs to this user

### Where Sessions Are Stored
Over time, storage evolved:
*   Files
*   Databases
*   In-memory stores (Redis)

Sessions are **stateful**:
*   Server stores data

4\. JWT (JSON Web Token) – Why It Exists
----------------------------------------

### The Problem with Sessions at Scale

In large systems:
*   Many servers
*   Many regions
*   Sessions need syncing

This becomes:
*   Expensive
*   Complex

### What Is a JWT?

A JWT is a **self-contained token**.

It contains:
*   User ID
*   Role
*   Expiry time
*   Signature

The server does **not** store it.

### How JWT Works (Simple)

1.  User logs in
2.  Server creates a JWT
3.  Server signs it
4.  Client stores it
5.  Client sends it with every request
6.  Server verifies signature

No database lookup needed.

### Pros of JWT

*   Stateless: The server does not store session data. All required information is inside the token, which reduces server memory usage and simplifies backend design.
*   Scales well: Any server can validate the token using the signing key. This works very well in distributed systems and multi-region deployments.
*   Great for microservices: Multiple services can independently verify the same token without calling a central auth service, making inter-service communication faster and simpler.
*   Easy to share across services: The same token can be used across different APIs and services, as long as they trust the issuer and share the verification key.

### Cons of JWT
*   Hard to revoke: Once a JWT is issued, the server does not store it. Because of this, the server cannot invalidate a specific token on demand without adding extra state like a blacklist.
*   Valid until expiry: A JWT remains usable until its expiration time. Even if a user’s access should be removed, the token continues to work until it naturally expires.
*   Logout is not instant: Logging out only removes the token from the client. If the token is copied or stolen, it can still be used until expiry, unlike session-based auth where logout immediately disables access.

Once issued, it lives until it expires.

### Hybrid Approach

Some systems:
*   Use JWT
*   Maintain a blacklist for revoked tokens

This fixes revocation but adds state again.

5\. Cookies (How Tokens Are Sent Automatically)
-----------------------------------------------

Cookies are:
*   Small data stored in the browser
*   Automatically sent with requests

Why they matter:
*   Browser handles auth automatically
*   No manual header management

Cookies are often used to store:
*   Session IDs
*   JWTs

Browsers also enforce:
*   Domain isolation
*   Security flags

#### What actually happens when you log in

* You type username + password
* (Chrome may auto-fill this)
* Server verifies credentials
* Server sends a cookie to your browser
* Browser sends that cookie with every request

The cookie proves you are logged in.
The password is not sent again.

Key point (easy to remember)
> Passwords log you in. Cookies keep you logged in.

6\. Types of Authentication
----------------------------------------------

### Stateful Authentication (Sessions)

How it works:
*   Server stores session data
*   Client sends session ID

Pros:
*   Easy logout
*   Easy revocation
*   Clear active sessions

Cons:
*   Harder to scale
*   Needs shared storage

Best for:
*   Traditional web apps

### Stateless Authentication (JWT)

How it works:
*   Server issues token
*   No server-side storage

Pros:
*   Scales very well
*   Great for APIs
*   Microservice friendly

Cons:
*   Token revocation is hard

Best for:
*   APIs
*   Mobile apps
*   Distributed systems

### API Key Authentication

Used when:
*   Machines talk to machines
*   No human UI involved

How it works:
*   Generate a long random key
*   Send it with each request

Pros:
*   Simple
*   Easy to rotate

Cons:
*   No user context
*   If leaked, full access

Best for:
*   Developer APIs
*   Internal services

7\. Practical Advice
-----------------------------------

For real systems:
* Authentication is hard to implement correctly
* Mistakes can lead to serious security issues
* Use OAuth-based authentication instead of rolling your own auth system.

---

#### **OAuth (Open Authorization)** is a standard that lets you **give an application limited access to your data without sharing your password**.

In short:
* You approve **what the app can do** (for example, view files)
* The app gets a **token**, not your password
* Access is **scoped and controlled**

Example: allowing an app to view your Google Drive files without giving it your Google password.

#### What Is Delegation? (In Auth / OAuth Context)

Delegation means:
* You let another system act on your behalf, but only within limits you approve.
Simple example
* You trust Google with your account
* You allow an app to view your Google Drive files
* Google gives the app limited permission

You did not give:
* Your password
* Full control

That is delegation.

---

### OAuth 1 vs OAuth 2 (plain words)

Think of **how much work you must do**.

#### OAuth 1

* Every request needs special cryptographic signing
* Very hard to implement
* Easy to make mistakes
* Almost nobody uses it now

#### OAuth 2

* Just send a token over **HTTPS**
* Much easier to use
* Much easier to scale
* Everyone uses this today

### One sentence
> **OAuth 1 was complicated and hard; OAuth 2 is simple and practical.**

#### What OAuth 2.0 Lacks
OAuth 2.0 is only about authorization.

Meaning:
* It lets an app access your data
* It does not reliably tell the app who you are

OAuth 2.0 does not define:
* A standard way to identify the user
* A standard user profile format
* A standard login flow

So OAuth alone is not a login system.

---

What OIDC Adds (OpenID Connect)?:
**OIDC adds identity on top of OAuth 2.0.**

It provides:
* A standard login flow
* A verified user identity
* An ID token with user information
* Standard claims (user ID, email, name)

Now the app can safely know:
> “This is user X.”

---

#### OIDC Example (Login with Google)

#### Scenario:
You open a new app and click **“Login with Google”**.

#### What happens step by step
1. The app redirects you to **Google**
2. You enter your Google email and password **on Google’s page**
3. Google verifies you
4. Google sends the app an **ID token**
5. The app reads the token and knows:
   * This is you
   * Your email
   * Your Google user ID
6. You are logged into the app

#### Important points

* The app **never sees your Google password**
* Google is the **identity provider**
* The app trusts Google’s verification
* You can revoke the app’s access anytime from Google settings

#### Why this is OIDC

* OAuth → gives access
* **OIDC → confirms identity (login)**

#### One-line summary
> **“Login with Google” is the most common example of OIDC.**

#### One simple mapping (easy to remember)
* Web apps → Sessions (stateful)
* APIs → JWT (stateless)
* Third-party login → OAuth / OIDC
* Service-to-service → API keys

---

#### RBAC (Role-Based Access Control) – Very Simple Explanation
**RBAC** stands for **Role-Based Access Control**.

In simple words:
> **You give permissions to roles, and roles to users.**

#### Why RBAC Exists
You don’t want to decide permissions **for every user separately**.

Instead:
* Group users by role
* Assign permissions once

This makes systems easier to manage.

#### How RBAC Works (Step by Step)
1. Define **roles**
   * admin
   * editor
   * viewer

2. Define **permissions** for each role
   * admin → create, update, delete
   * editor → create, update
   * viewer → read only

3. Assign roles to users
   * Alice → admin
   * Bob → viewer

When a request comes in:
* System checks user’s role
* Allows or denies action

#### Simple Real-Life Example
Company access:

* Manager → approve leave
* Employee → request leave
* HR → edit records

You don’t give permissions person by person.
You give them by role.

#### RBAC in Backend Terms
RBAC info is usually stored as:
* Role in session (session-based auth)
* Role in JWT claims (JWT-based auth)

Example claim:
```json
{
  "role": "admin"
}
```

#### Pros of RBAC
* Simple
* Easy to understand
* Easy to scale
* Good for most apps

#### Cons of RBAC
* Not flexible for very complex rules
* Role explosion if not designed well

#### One-Line Summary
> **RBAC controls access by assigning permissions to roles instead of individual users.**
