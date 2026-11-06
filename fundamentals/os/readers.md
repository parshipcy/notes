# Reader-Writer Problem

The **Reader-Writer problem** is about safely sharing the same data between **reader threads** and **writer threads**.

### 1. Reader vs Writer

```text
Reader → only reads data
Writer → changes/updates data
```

Example:

```text
Shared data = User account

Reader → views account
Writer → updates account
```

### 2. Multiple Readers Are Fine

If multiple readers are reading at the same time:

```text
Reader 1 ─┐
Reader 2 ─┼──→ Shared Data
Reader 3 ─┘
```

No problem because they are **not modifying** the data.

But:

```text
Writer → Shared Data
Reader → Shared Data
```

at the same time can cause inconsistent data/race conditions. Multiple writers are also unsafe.

---

# Semaphore Solution

The solution uses **3 things**:

```text
mutex
wrt
readCount
```

### `mutex`

```text
Binary semaphore
```

Used to safely update `readCount`.

### `wrt`

```text
Binary semaphore
```

Controls access to the actual shared data.

### `readCount`

```text
Integer
```

Keeps track of:

> **How many readers are currently reading?**

---

# Writer

The writer is simple:

```text
wait(wrt)

    WRITE / UPDATE DATA

signal(wrt)
```

Meaning:

```text
Writer gets wrt
      ↓
Writer changes data
      ↓
Writer releases wrt
```

So while a writer is writing, another writer or reader cannot enter.

---

# Reader

The reader is slightly more complicated.

```text
wait(mutex)

readCount++

if readCount == 1:
    wait(wrt)

signal(mutex)

    READ DATA

wait(mutex)

readCount--

if readCount == 0:
    signal(wrt)

signal(mutex)
```

### Why?

The **first reader** blocks writers:

```text
First reader enters
      ↓
readCount = 1
      ↓
wait(wrt)
      ↓
Writer cannot enter
```

Now other readers can join:

```text
Reader 1 ─┐
Reader 2 ─┼──→ READ
Reader 3 ─┘
```

They can all read simultaneously.

The reader flow and the first-reader/last-reader logic are shown on page 6. Lec-19_iPad

---

# When the Last Reader Leaves

Suppose:

```text
readCount = 3
```

Three readers are reading.

Then:

```text
Reader 1 leaves → 2
Reader 2 leaves → 1
Reader 3 leaves → 0
```

When:

```text
readCount == 0
```

the last reader does:

```text
signal(wrt)
```

Now a writer can enter.

So:

```text
First reader
→ blocks writers

Last reader
→ allows writers
```

This is the **most important idea** in this solution.

---

# Easy Example

Think of a document:

```text
             Document
                ↓
      ┌─────────┴─────────┐
      ↓                   ↓
   Readers              Writer
```

### Multiple readers

```text
R1 → reading
R2 → reading
R3 → reading
```

Allowed.

### Writer arrives

```text
R1 → reading
R2 → reading
W  → WAITING
```

Writer waits because readers are currently reading.

### Last reader leaves

```text
R1 → leaves
R2 → leaves
      ↓
readCount = 0
      ↓
Writer can enter
```

---

# Why `mutex` Is Needed

You might ask:

> "If readers are allowed together, why do we need a mutex?"

Because `readCount` itself is **shared data**.

For example:

```text
readCount = 2
```

Two readers might simultaneously do:

```text
readCount++
```

That could cause a race condition.

So:

```text
mutex
→ protects readCount
```

While:

```text
wrt
→ protects the actual shared data from writers
```
