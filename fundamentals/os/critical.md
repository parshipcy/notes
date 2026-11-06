# Critical Section Problem and How to Address It

The main idea is simple:

> **When multiple threads/processes share the same data, we must make sure they don't change that data incorrectly at the same time.**

This is where **critical sections, race conditions, locks, and semaphores** come in. 

---

# Why Do We Need Process Synchronization?

Suppose two threads are using the same variable:

```text id="6l6v0q"
Thread A ──┐
           ├──→ shared data
Thread B ──┘
```

Both threads can access the same data.

The problem is that they may access or modify it at nearly the same time.

So we need **synchronization** to keep the shared data consistent. 

---

# What is a Critical Section?

A **critical section** is the part of a program where a process/thread accesses a **shared resource**, especially when it performs write operations. 

For example:

```c
counter = counter + 1;
```

Suppose `counter` is shared by two threads.

That code is part of the **critical section** because both threads are trying to modify shared data.

Think:

```text id="7v1v9p"
Program

┌──────────────────────────────┐
│ Normal code                  │
│                              │
│ Critical Section             │ ← shared data access
│                              │
│ Normal code                  │
└──────────────────────────────┘
```

### Easy definition

> **Critical section = code that accesses shared data/resources and therefore must be protected.**

---

# Why is a Critical Section Dangerous?

Because threads can be interrupted or switched while they are executing.

Suppose:

```text id="4nrvyo"
counter = 5
```

Two threads both execute:

```c
counter = counter + 1;
```

We expect:

```text
5 → 6 → 7
```

so the final answer should be:

```text
counter = 7
```

But that may not happen.

The important detail is that:

```c
counter = counter + 1;
```

is not actually one indivisible operation.

Conceptually, the CPU has to do something like:

1. Read counter from memory
2. Put the value into a CPU register/temporary location
3. Add 1
4. Write the result back to counter

---

# The Problem: Race Condition

A **race condition** occurs when multiple threads access shared data and try to modify it, and the final result depends on **which thread runs first or gets interrupted first**. 

In simple words:

> **Threads are "racing" to access/change the same data.**

---

# Understanding Race Condition Step-by-Step

Suppose:

```text id="8t8u7j"
counter = 5
```

Two threads want to increase it.

```text
Thread A → counter + 1
Thread B → counter + 1
```

You might think:

```text id="wv7m4h"
5 + 1 + 1 = 7
```

But the operation is not necessarily one indivisible action.

Conceptually, it can be:

```text
READ counter
ADD 1
WRITE counter
```

Now imagine this happens:

```text id="od4f6p"
Thread A: READ counter → 5
Thread B: READ counter → 5

Thread A: ADD 1 → 6
Thread B: ADD 1 → 6

Thread A: WRITE 6
Thread B: WRITE 6
```

Final value:

```text id="q99qdu"
counter = 6
```

But we expected:

```text
counter = 7
```

The second update was effectively lost.

That's a **race condition**.

---

# Why is It Called a "Race"?

Because the result depends on **which thread gets to the shared data first**.

For example:

```text id="msns5z"
Thread A ──┐
           ├──→ Shared variable
Thread B ──┘
```

Both are racing.

If A executes first:

```text id="8d9hjp"
A → B
```

If B executes first:

```text id="8d9hjp"
B → A
```

The exact scheduling order can change the result. The source explicitly identifies this dependency on thread scheduling as the race condition problem. 

---

# Critical Section vs Race Condition

Don't confuse these.

### Critical Section

The **code region** accessing shared data.

```text id="h7u8k3"
counter = counter + 1;
```

### Race Condition

The **problem** that can happen when multiple threads access/change shared data without proper synchronization.

```text id="5g8qz8"
Shared data
   ↓
Multiple threads
   ↓
Uncontrolled access
   ↓
Race condition
```

So:

> **Critical section = where the problem can happen.**

> **Race condition = the incorrect behavior that can happen there.**

---

# How Do We Solve Race Conditions?

There are three approaches: 

```text id="7al17l"
1. Atomic operations
2. Mutual exclusion using locks
3. Semaphores
```

Let's understand each.

---

## 1. Atomic Operation

An **atomic operation** is treated as one indivisible operation.

Means making the critical code section atomic, ideally as something executed in one CPU cycle. 

The key idea is:

> **Nobody can interrupt the operation halfway through.**

For example, instead of:

```text id="q8h8ys"
READ
 ↓
ADD
 ↓
WRITE
```

we want it treated as:

```text id="1xtkbr"
INCREMENT
```

as one atomic unit.

But it's only available in C++

---

## 2. Mutual Exclusion

**Mutual exclusion** means:

> **Only one thread/process is allowed inside the critical section at a time.**

Think of a bathroom with one key:

```text id="0u82kr"
             LOCK
              ↓
Thread A → [ Critical Section ]
Thread B → waiting
Thread C → waiting
```

When A finishes:

```text id="oxd3bh"
A releases lock
       ↓
B gets lock
       ↓
B enters critical section
```

This prevents two threads from modifying the shared resource simultaneously.

### Mutex / Lock

A **mutex/lock** is a common mechanism for implementing mutual exclusion.

The locks allow only one thread/process to access the critical section at a time. 

Conceptually:

```c
lock();

critical_section();

unlock();
```

Meaning:

```text id="zwrq5u"
lock()
  ↓
"I own the shared resource"
  ↓
critical section
  ↓
unlock()
  ↓
"Others can use it now"
```

---

# Can a Simple Flag Solve Race Conditions?

> **No.** 

Why?

- Yes, we can achieve mutual exclusion.
- But Progress not possible, as it will move in fixed order. Threads are not free to make choices.

> **A normal shared flag by itself is not enough to guarantee synchronization.**

---

# Improvement of single flag: Peterson's Solution

**Peterson's solution** is a software solution that can be used to avoid race conditions. No fixed sequence, so progress possible. Mutual Exclusion is also absolutely possible.

It works for only **2 processes/threads**. 

So:

```text id="c5g3l6"
Thread A
Thread B
```

Peterson's solution can coordinate them.

But for:

```text id="w5e5mt"
Thread A
Thread B
Thread C
Thread D
```

the simple two-process version is not sufficient.

---

# Problem With Locks:

## 1. Contention

The first disadvantage listed is **contention**. 

Suppose:

```text id="td25rj"
Thread A → has lock
Thread B → waiting
Thread C → waiting
Thread D → waiting
```

The other threads are stuck waiting for the lock.

This creates **contention**.

#### Simple picture

```text id="b2q43u"
          LOCK
           ↓
          T1
      ┌──────────┐
      │ Critical │
      │ Section  │
      └──────────┘

T2 → waiting
T3 → waiting
T4 → waiting
```

---

### What If the Thread Holding the Lock Dies?

Suppose:

```text id="4o9r7x"
T1 gets lock
   ↓
T1 dies/crashes
```

But it never releases the lock.

Then:

```text id="v4e8wr"
T2 → waiting
T3 → waiting
T4 → waiting
```

They may wait indefinitely.

---

## 2. Deadlock

Another disadvantage of locks is **deadlock**. 

Deadlock means processes/threads are stuck waiting for resources that are using by other threads/processes.

---

## 3. Debugging Problem

Locks also make programs harder to debug.

Why?

Because thread execution order can change.

A bug might:

```text id="7d4x9u"
happen sometimes
↓
not happen next time
↓
happen again later
```

This makes concurrency bugs difficult to reproduce.

---

## 4. Starvation

**Starvation of high-priority threads** is a disadvantage. 

Starvation means a thread/process keeps waiting because other threads repeatedly get access to the resource.

```text id="8l3uwk"
T1 → waiting
T2 → gets lock
T3 → gets lock
T2 → gets lock
T3 → gets lock
...
T1 → still waiting
```

So even though T1 should eventually get access, it may be delayed for a very long time.

---

# Complete Picture

```text id="36q6lk"
Multiple Threads
       ↓
Shared Data
       ↓
Critical Section
       ↓
Potential Race Condition
       ↓
Synchronization Needed
       ↓
 ┌──────────────┬──────────────┐
 ↓              ↓              ↓
Atomic       Mutex/Lock    Semaphore
Operation
```

---

# Key Terms

| Term             | Easy Meaning                                     |
| ---------------- | ------------------------------------------------ |
| Shared Resource  | Data/resource used by multiple threads/processes |
| Critical Section | Code that accesses shared data/resource          |
| Race Condition   | Result depends on execution order                |
| Atomic Operation | Indivisible operation                            |
| Mutual Exclusion | Only one enters critical section                 |
| Mutex/Lock       | Mechanism for mutual exclusion                   |
| Semaphore        | Synchronization mechanism                        |
| Contention       | Multiple threads competing for a lock/resource   |
| Deadlock         | Threads permanently wait for each other          |
| Starvation       | A thread waits for a very long time              |
