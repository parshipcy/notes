# Caching

Use this for revision, blogging, or interview prep. Use the **Glossary** when a term is new.

---

## What is Caching?

Caching is a technique used to **store frequently accessed data in a faster storage layer** so that future requests can be served quicker.

### Simple idea

Instead of fetching data from a slow source every time (like a database or server), we **store a copy in a fast place (cache)**.

### Example

- First request → fetch from database (slow)
- Store result in cache
- Next request → fetch from cache (fast)

---

## Importance of Caching

Caching improves:

- **Performance** → Faster responses  
- **Latency** → Reduced delay  
- **Scalability** → Handle more users  
- **Cost efficiency** → Less load on servers/databases  

### Without caching

Every request hits the database → slow + expensive.

### With caching

Most requests served from cache → fast + efficient.

---

## Google Search Example

When you search something on Google:

1. Google checks if results are already cached (or precomputed indexes).
2. If yes → returns quickly (**cache hit**).
3. If no → computes or fetches results (**cache miss**) and may store them.

### Key concepts

- **Cache hit** → Data found in cache.  
- **Cache miss** → Data not found → fetch from source + often store for next time.

---

## Netflix (CDN) Example

Netflix uses **Content Delivery Networks (CDNs)** heavily for video and metadata.

### How it works

1. Video stored on **origin** (or object storage).
2. Copies distributed to **edge servers** worldwide.
3. User requests video.
4. Served from nearest edge server when possible.

### Benefits

- Reduced buffering  
- Lower latency  
- Better streaming experience  

---

# Levels of Caching

Caching exists at multiple levels:

## 1. Network level

- CDN  
- DNS caching  
- HTTP/browser caches  

## 2. Hardware level

- CPU cache (L1, L2, L3)  
- RAM  
- Disk  

## 3. Software / application level

- Redis, Memcached  
- Application in-process caches  
- ORM / query result caches  

---

# Network Caching: CDN

## What is a CDN?

A **Content Delivery Network (CDN)** is a distributed set of servers that deliver content from a location **geographically close** to the user.

### Key components

- **Origin server** → Authoritative source of content.  
- **Edge servers** → Cached copies at the “edge” of the network.  
- **PoP (Point of Presence)** → Data center or site grouping edge capacity.  

### Flow

```text
User → CDN edge → (hit) → user
User → CDN edge → (miss) → origin → populate edge → user
```

### Benefits

- Low latency  
- High availability (many edges)  
- Reduced load on origin  

---

# Network Caching: DNS

## What is DNS?

DNS translates human-readable names to IPs, e.g.:

```text
google.com → 142.250.x.x
```

### DNS caching levels (conceptual)

1. Browser cache  
2. OS stub resolver cache  
3. Recursive resolver / ISP cache  

### TTL (Time To Live)

TTL on DNS records controls **how long** resolvers may cache an answer before re-querying upstream.

---

# Hardware Level Caching

## Memory hierarchy (fast → slow)

```text
L1 → L2 → L3 → RAM → Disk (SSD/HDD)
```

## CPU cache (L1, L2, L3)

- **L1** - Smallest, fastest, per-core.  
- **L2** - Larger, still very fast.  
- **L3** - Often shared across cores on a CPU package.  

## RAM

- Fast, volatile (typically lost on power loss unless battery-backed / special hardware).  

## Disk (SSD/HDD)

- Persistent, much slower than RAM for random access.  

---

# Software-Based Caching

## In-memory key-value stores

Examples: **Redis**, **Memcached**.

### Why they are fast

- Data primarily in RAM.  
- Simple key → value access model.  
- Optional persistence (Redis) vs pure RAM focus (Memcached, classically).  

### Example

```text
key:   user:101
value: { "name": "Parship", "age": 23 }
```

---

# Caching Strategies

## 1. Lazy caching (cache-aside)

### Flow

1. App checks cache.  
2. On miss → read from DB (or source).  
3. App writes result into cache.  

### Pros / cons

- **Pros:** Only caches what is actually requested; cache failures can degrade gracefully.  
- **Cons:** First request after expiry/miss pays full source latency; risk of **stale data** if invalidation is wrong.  

## 2. Write-through

### Flow

1. Write to primary store (DB).  
2. **Simultaneously** (or in same logical transaction path) update cache.  

### Pros / cons

- **Pros:** Cache tends to stay consistent with DB for those writes.  
- **Cons:** Higher write latency; every write touches two systems.   

---

# Eviction Policies

When the cache is full (or over budget), something must be removed.

## 1. No eviction (unbounded)

- Rare in production; memory risk.  

## 2. LRU (Least Recently Used)

- Evict the item that has not been accessed for the longest time.  

## 3. LFU (Least Frequently Used)

- Evict the item with the lowest access count (often with aging to avoid “forever hot” keys).  

## 4. TTL (Time To Live)

- Each entry expires after a fixed time; can combine with LRU as **maxmemory + eviction** in Redis.  

## 5. Random / FIFO

- Simpler, used in some specialized cases.  

---

# Use Cases for In-Memory Databases

## 1. Database query caching

Cache hot query results, e.g.:

```sql
SELECT * FROM users WHERE id = 1;
```

## 2. Session storage

```text
session_id → serialized user/session payload
```

## 3. API response caching

Cache `GET /products?category=shoes` responses with a versioned key and TTL.

## 4. Rate limiting

Example: **100 requests / minute / user**.

- Store counters in Redis with **INCR** + **EXPIRE** or sliding-window structures.  
- Reject when over threshold.  

## 5. Leaderboards, real-time counters, pub/sub

- Sorted sets, counters, and messaging patterns in Redis-class systems.  

---

# Key takeaways

- Caching is central to **scalability and performance**, not a minor tweak.  
- It appears at **every layer**: CPU, app, CDN, DNS, browser.  
- Core trade-off: **freshness vs speed vs complexity** (invalidation, consistency).  
- **Redis**, **CDNs**, and **HTTP caching** are industry-standard tools.  

---

# Glossary

Short definitions for terms used in this guide. Read top to bottom once, then use as a reference.

### Latency

**What it means:**  
How long you wait to get a response.

👉 **Example:**

- Click a button → result in 0.1 sec = low latency  
- Result in 3 sec = high latency  

**Goal:** reduce latency where it matters for users and cost.

---

### Precompute

**Idea:** Do heavy work *before* users ask for it.

👉 **Example:**  
Instead of calculating "trending topics" on every request:

- Calculate every 5 minutes  
- Store result in cache  
- Serve instantly  

---

### Stream pipeline

**Idea:** Continuous data processing.

👉 **Example:**

- New tweets, likes keep coming  
- System processes them in near real time  
- Updates feeds / trending  

Think: **data flowing like a stream, not only in big batches.**

---

### Volatile memory

**What it means:**  
Data goes away when power is lost (for normal RAM).

👉 **Example:**

- RAM → volatile  
- Hard disk / SSD → **persistent** (not volatile in the same way)  

---

### CPU cache (L1, L2, L3)

Tiny, ultra-fast memory **next to the CPU**.

👉 **Why needed?**  
The CPU is very fast; RAM is slower → cache **cuts waiting**.

#### Levels

- **L1** → smallest, fastest  
- **L2** → bigger, slower  
- **L3** → shared across cores, even bigger  

👉 You don't configure these in software like Redis—**the hardware** manages them.

---

### CDN (Content Delivery Network)

**Idea:** Keep **copies** of content **near users**.

👉 **Example:**

- Same image cached in India, US, Europe  
- User in India → served from a nearby region  

👉 **Result:**

- Faster loading  
- Less load on your main server (**origin**)  

---

### Buffering

**What it means:**  
Loading playback **ahead** while video or audio runs.

👉 **Example:**

- YouTube loads the next few seconds  
- Playback doesn't stutter on small network blips  

---

### Origin server

**Main source of truth** for the asset (before CDN copies it).

👉 **Example:**

- Original video (or API) lives here  
- CDN **pulls** from here on a cache miss  

---

### Edge server

**Server close to the user** at the "edge" of the network.

👉 **Example:**

- You request a video  
- Often served from a **nearby edge** instead of crossing the world  

---

### PoP (Point of Presence)

**A site with many edge servers** in one geographic area.

👉 **Example:**

- A data center in Delhi with a **cluster** of CDN machines  

---

### DNS (Domain Name System)

**Internet phonebook.**

👉 Converts:

```text
google.com → 142.250.xxx.xxx
```

---

### IP address

**Numeric address of a machine** on a network.

👉 Like:

```text
192.168.1.1
```

---

### Resolver / ISP cache

**Temporarily stores DNS answers** so repeat lookups are faster.

👉 **Example:**

- First lookup → may be slower  
- Next lookup → often **cached** (browser, OS, or ISP)  

---

### Redis

**Fast in-memory data store** (often called a database; many use it as a cache).

👉 **Used for:**

- Caching  
- Sessions  
- Rate limiting  

👉 Data is primarily in **RAM** → very fast reads/writes.

---

### Memcached

**Simpler in-memory cache** focused on **key → blob** storage.

👉 Fewer features than Redis  
👉 Very fast, lightweight, common for **plain caching**  

---

### maxmemory (Redis)

**Cap on how much RAM** Redis may use.

👉 When full: Redis **evicts** entries (e.g. LRU-style rules) to make room.

---

### ORM (Object-Relational Mapping)

**Connects your application code to relational tables.**

👉 **Example:**  
Instead of writing SQL by hand:

```js
User.find(1)
```

👉 The ORM generates SQL and maps rows to objects.

---

### Session

**Remembers a logged-in user** for a period.

👉 **Example:**

```text
session_id → user info
```

Often stored in **Redis** or similar.

---

### Rate limiting

**Caps how many requests** a user or client can make in a window.

👉 **Example:**

- Max 100 requests / minute  
- After that → blocked or throttled  

---

### Sliding window

**Counts activity in the last N seconds/minutes** as time moves—not only "this calendar minute."

👉 **Example:**

- "Last 60 seconds" rolling window  
- Often **fairer** than a counter that resets on the clock  

---

### HTTP / browser cache

**Browser (or proxy) stores past responses.**

👉 **Example:**

- First visit → full download  
- Reload → may use **cached** copy  

Controlled by headers such as:

```text
Cache-Control: max-age=3600
```

---

### Cache hit

Data **found** in cache → **fast** path.

---

### Cache miss

Data **not** in cache → fetch from DB or origin → **slower** path (then often **fill** cache).

---

### Write-through

Write to **cache** and **database** together (same logical flow).

👉 Safer alignment, **slower writes**.

---

### Write-behind (write-back)

Write to **cache first**; database **later** (async).

👉 **Faster** writes; **risk** if cache dies before the DB catches up.

---

### Read-through

The **cache layer** loads from the source on a miss; your app may not write cache-fill logic itself.

---

### Hot key

**One key** gets a huge share of traffic.

👉 **Example:**  
Celebrity profile, viral post ID.

👉 **Problem:**  
Can overload **one shard**, replica, or process.

---

*End of guide.*
