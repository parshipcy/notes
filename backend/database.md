# Databases

This explains **what databases are**, **why we need them**, and **why Postgres is often recommended** for backend beginners.

---

## 1. Why Databases Are Needed

### The main reason: **data should not disappear**

Imagine a **to-do app**.

* You add tasks
* You close the app
* You open it again

If there is **no database**:

* All tasks are gone

That is bad.

So we need **persistence**.

> **Persistence means data stays even after the program stops.**

Databases give us persistence.

---

## 2. What Is a Database?

A database is:

> **A place where data is stored permanently and in an organized way.**

Examples of databases (loosely):

* Phone contacts
* Browser storage
* A text file
* A real database like Postgres

In backend development, when we say “database”, we usually mean:

* **Disk-based storage**
* Stored on **HDD or SSD**

Why disk?

* Cheap
* Large storage
* Data survives restarts

Even though disks are slower than RAM, they are reliable.

---

## 3. What Can a Database Do?

A database mainly supports **CRUD operations**:

* **Create** data
* **Read** data
* **Update** data
* **Delete** data

Every backend app needs these.

---

## 4. What Is a DBMS?

Just storing data is not enough.

We also need:

* Fast searching
* Safe updates
* Multiple users at the same time

That’s why we use a **DBMS (Database Management System)**.

A DBMS:

* Stores data
* Organizes data
* Lets apps read/write data safely

Examples:

* PostgreSQL
* MySQL
* MongoDB

---

## 5. Why Not Just Use Text Files?

At first, it sounds easy:

* Save data in a `.txt` file

But problems appear quickly.

### Problem 1: Parsing

* App must manually read and parse text
* Slow and error-prone

### Problem 2: No structure

* Anyone can write anything
* No rules
* Data becomes messy

### Problem 3: Concurrency

* Two users write at the same time
* Data gets corrupted

Databases solve all of this.

---

## 6. Types of Databases

### 1. Relational Databases (SQL)

These store data in:

* **Tables**
* **Rows and columns**

Rules are strict:

* Fixed schema
* Relationships between tables
* Strong data integrity

They use **SQL**.

Examples:

* PostgreSQL
* MySQL
* SQL Server

Good for:

* Banking
* CRM systems
* Structured data

---

### 2. Non-Relational Databases (NoSQL)

These are more flexible.

* No strict schema
* Data can look different for each record
* Often store JSON-like data

Example:

* MongoDB

Good for:

* Rapid prototyping
* Content systems

But downside:

* Database does not enforce rules
* Easier to create inconsistent data

---

## 7. Why Postgres Is Recommended

Postgres is a **relational database**, but very powerful.

Reasons people recommend it:

### Open source

* Free
* Large community

### SQL compliant

* Easy to move to other SQL databases later

### Reliable and scalable

* Used in production systems

### Very strong JSON support

* Can store and query JSON
* Solves many NoSQL use cases

Postgres gives:

> **Structure + flexibility**

---

## 8. Common Postgres Data Types

### Numbers

* `integer`, `bigint` → whole numbers
* `decimal / numeric` → money (accurate)
* `float / double` → fast math, less precise

### Strings

* `text` → recommended for most cases
* `varchar` → text with a limit
* `char` → fixed length (rarely needed)

In Postgres:

> **TEXT is usually the best choice**

---

### Boolean

* `true` / `false`

---

### Date and Time

* `date`
* `timestamp`
* `timestamptz` (with timezone)

---

### IDs

* `serial / bigserial` → auto-increment numbers
* `uuid` → unique random IDs

---

### JSON

* `json` → raw JSON
* `jsonb` → faster, better JSON (recommended)

Postgres JSONB is a big reason people choose Postgres.
