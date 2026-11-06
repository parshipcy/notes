# Producer-Consumer Problem (Bounded Buffer)

This topic combines the **mutex and counting semaphore concepts** you just learned.

The problem is:

> **One or more producers put data into a limited-size buffer, while consumers remove data from it.**

We need to make sure:

```text
Producer → does NOT add when buffer is FULL
Consumer → does NOT remove when buffer is EMPTY
```

---

# 1. What is a Buffer?

A **buffer** is a temporary storage area used to hold data between a producer and a consumer. It's the critical section here.

Example:

```text
Producer
   ↓
[ Buffer ]
   ↓
Consumer
```

Suppose the buffer can store only 3 items:

```text
+---+---+---+
|   |   |   |
+---+---+---+
```

It is called a **bounded buffer** because its size is limited.

---

# 2. Who is the Producer?

The **producer creates/adds data**.

Examples:

```text
Thread → generates messages
Thread → downloads data
Thread → creates jobs
```

Why did I say "Thread → downloads data"?

Because a thread can be responsible for that job:

```text
Chrome Process
├── Thread A → receives data → PRODUCER
└── Thread B → takes data from buffer → CONSUMER
```

Then:

```text
Thread A
   ↓
[A] [B] [C]   ← Buffer
             ↓
          Thread B
```

So the word producer describes the role of the thread/process in the producer-consumer problem.

---

# 3. Who is the Consumer?

The **consumer takes/removes data** from the buffer.

```text
Buffer
   ↓
Consumer
```

Example:

```text
Buffer = [A, B, C]

Consumer removes A

Buffer = [B, C]
```

Let's say Chrome, here the consumer could conceptually be the part of the browser that takes received data chunks from the buffer and processes or writes them. This is just an analogy to understand the producer-consumer pattern, not Chrome's exact internal architecture.

---

# 4. What's the Problem?

Imagine the buffer has capacity 3.

```text
Buffer:
[A] [B] [C]
```

It is full.

Now the producer wants to add `D`.

It must **wait**.

Similarly:

```text
Buffer:
[ ] [ ] [ ]
```

It is empty.

Now the consumer wants to remove something.

It must **wait**.

So we need synchronization.

---

# 5. Three Semaphores

The solution uses:

```text
mutex or we can say Binary Semaphore (in real operating systems/programming libraries, a mutex and a binary semaphore are not always identical)
empty → Counting Semaphore
full  → Counting Semaphore
```

### Their jobs

```text
mutex
→ Protects the buffer itself

empty
→ Counts how many empty slots are available

full
→ Counts how many filled slots are available
```

This is the most important thing to understand.

---

# 6. Why Do We Need `mutex`?

Suppose two producers access the buffer at the same time:

```text
Producer A ──┐
             ├──→ Buffer
Producer B ──┘
```

They might modify the buffer simultaneously.

That can cause a race condition.

So we use:

```text
mutex = 1
```

Only one producer/consumer can enter the critical section at a time.

```text
Thread A → gets mutex → enters buffer
Thread B → waits
```

The source describes `mutex` as ensuring exclusive access to the buffer.

---

# 7. Why Do We Need `empty`?

Suppose buffer capacity is:

```text
3
```

Initially:

```text
[A] [ ] [ ]
```

There are 2 empty slots.

So:

```text
empty = 2
```

`empty` answers:

> **"How many more items can the buffer hold?"**

---

# 8. Why Do We Need `full`?

Suppose:

```text
[A] [B] [ ]
```

There are 2 filled slots.

So:

```text
full = 2
```

`full` answers:

> **"How many items are currently available for the consumer?"**

So:

```text
empty → available spaces

full → available items
```

---

# 9. Initial Values

Suppose buffer capacity is 3.

Initially:

```text
Buffer = [ ] [ ] [ ]

mutex = 1
empty = 3
full  = 0
```

Why?

```text
3 empty spaces
0 filled spaces
1 mutex permission
```

---

# 10. Producer Flow

The producer code is:

```text
wait(empty)
wait(mutex)

    Add data to buffer

signal(mutex)
signal(full)
```

Let's understand **why the order is like this**.

---

# 11. Producer: `wait(empty)`

The producer first asks:

> **"Is there an empty slot?"**

```text
wait(empty)
```

Suppose:

```text
empty = 3
```

Producer gets one slot:

```text
empty = 2
```

Now it can add data.

But suppose:

```text
empty = 0
```

That means:

```text
Buffer is full
```

So:

```text
Producer
   ↓
wait(empty)
   ↓
BLOCK / WAIT
```

This prevents the producer from putting data into a full buffer.

---

# 12. Producer: `wait(mutex)`

Now the producer needs exclusive access to the buffer.

```text
wait(mutex)
```

If:

```text
mutex = 1
```

producer takes it:

```text
mutex = 0
```

Now:

> **The producer owns the buffer lock.**

Other producers/consumers cannot enter the critical section at the same time.

---

# 13. Producer: Critical Section

Now the producer adds data:

```text
Add item to buffer
```

Example:

```text
Before:

[A] [B] [ ]

After:

[A] [B] [C]
```

This is the **critical section** because the shared buffer is being modified.

---

# 14. Producer: `signal(mutex)`

Producer is finished using the buffer.

```text
signal(mutex)
```

This releases the mutex:

```text
mutex = 1
```

Another thread can now access the buffer.

---

# 15. Producer: `signal(full)`

We just added one item.

Therefore, the number of filled slots increases.

```text
signal(full)
```

For example:

```text
full = 2
```

becomes:

```text
full = 3
```

So `full` is updated to tell consumers:

> **"There is now one more item available."**

---

# 16. Producer Flow to Memorize

```text
Producer

wait(empty)
      ↓
Get an empty slot
      ↓
wait(mutex)
      ↓
Lock buffer
      ↓
Add item
      ↓
signal(mutex)
      ↓
Unlock buffer
      ↓
signal(full)
      ↓
Tell system there is one more filled slot
```

---

# 17. Consumer Flow

The consumer does almost the opposite:

```text
wait(full)
wait(mutex)

    Remove data from buffer

signal(mutex)
signal(empty)
```

Let's understand it.

---

# 18. Consumer: `wait(full)`

First the consumer asks:

> **"Is there an item available?"**

```text
wait(full)
```

Suppose:

```text
full = 2
```

Consumer takes one available item:

```text
full = 1
```

Now it can remove data.

But if:

```text
full = 0
```

then:

```text
Buffer is empty
```

So the consumer waits.

```text
Consumer
   ↓
wait(full)
   ↓
BLOCK / WAIT
```

This prevents the consumer from removing data from an empty buffer.

---

# 19. Consumer: `wait(mutex)`

Now the consumer wants exclusive access to the buffer:

```text
wait(mutex)
```

If it gets the lock:

```text
mutex = 0
```

Now it can safely modify the buffer.

---

# 20. Consumer: Critical Section

The consumer removes an item.

Example:

```text
Before:

[A] [B] [C]

After:

[A] [B] [ ]
```

The consumer has removed `C`.

---

# 21. Consumer: `signal(mutex)`

Consumer finishes accessing the buffer:

```text
signal(mutex)
```

The lock is released.

```text
mutex = 1
```

Another thread can access the buffer.

---

# 22. Consumer: `signal(empty)`

One slot has become empty.

Therefore:

```text
signal(empty)
```

For example:

```text
empty = 0
```

becomes:

```text
empty = 1
```

This tells producers:

> **"There is now one more empty slot available."**

---

# 23. Consumer Flow to Memorize

```text
Consumer

wait(full)
      ↓
Get one filled slot
      ↓
wait(mutex)
      ↓
Lock buffer
      ↓
Remove item
      ↓
signal(mutex)
      ↓
Unlock buffer
      ↓
signal(empty)
      ↓
Tell system there is one more empty slot
```

---

# 24. The Relationship Between `empty` and `full`

For a buffer of capacity 3:

```text
empty + full = 3
```

For example:

```text
empty = 3
full  = 0

3 + 0 = 3
```

After adding two items:

```text
empty = 1
full  = 2

1 + 2 = 3
```

After consuming one:

```text
empty = 2
full  = 1

2 + 1 = 3
```

This is a very useful way to visualize them.

---

# 25. Why Can't We Use Only `mutex`?

This is an important question.

Suppose we only have:

```text
mutex
```

Mutex can tell us:

> "Only one thread can access the buffer at a time."

But it **doesn't tell us whether the buffer is full or empty**.

So:

```text
mutex
→ protects the buffer
```

while:

```text
empty
→ protects against "buffer full"

full
→ protects against "buffer empty"
```

You need all three for this solution.

---

# 26. Why `empty` and `full` Are Counting Semaphores

Suppose:

```text
Buffer capacity = 5
```

Then:

```text
empty = 5
```

can become:

```text
4
3
2
1
0
```

That's more than just `0` or `1`.

Therefore they are **counting semaphores**.

---

# 27. Why `mutex` Is Binary

`mutex` only needs:

```text
1 → available
0 → locked
```

So:

```text
mutex = binary semaphore
```

The source identifies the binary semaphore as having values `0` or `1` and relates it to mutex-style locking. 

---

# 28. Why Does This Avoid Busy Waiting?

Mutex is helping here.

Suppose the buffer is full:

```text
[A] [B] [C]
```
Producer arrives.

Instead of doing:

```text
"Is there space?"
"No."

"Is there space?"
"No."

"Is there space?"
"No."
...
```

it does:

```text
wait(empty)
   ↓
empty = 0
   ↓
BLOCK
   ↓
WAITING
```

The CPU can run something else.

When the consumer removes an item:

```text
signal(empty)
   ↓
wake waiting producer
```
