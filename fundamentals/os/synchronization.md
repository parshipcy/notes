# Conditional Variables and Semaphores for Threads synchronization

This builds directly on the previous topic of **critical sections, mutexes, race conditions, and busy waiting**.

The big improvement is:

> **Instead of repeatedly checking "Is the resource available?", a thread can sleep until the resource becomes available.**

> **Synchronization means coordinating multiple processes/threads so they access shared data or resources in a safe and controlled way.**

That is the main idea behind **condition variables** and **blocking semaphores**. 

---

# 1. First, What Was the Problem With a Lock/Mutex?

From the previous topic, suppose we have:

```text
Thread A → has the lock
Thread B → wants the lock
```

Thread B cannot enter the critical section.

A simple approach is:

```js
while (locked) {
    // keep checking
}
```

This is called **busy waiting**.

The thread is basically saying:

```text
"Is the lock free?"
"Is the lock free?"
"Is the lock free?"
"Is the lock free?"
...
```

It keeps consuming CPU time while accomplishing nothing useful as it is repeatedly executing instructions like while(locked){}.

---

# 2. Busy Waiting vs Blocking

### Busy waiting

```text
Thread B
   ↓
Check
   ↓
Locked?
   ↓
YES
   ↓
Check again
   ↓
Check again
   ↓
Check again
```

The thread remains actively running.

### Blocking

Instead:

```text
Thread B
   ↓
Check
   ↓
Locked?
   ↓
YES
   ↓
Go to WAITING state
```

Now the CPU can run another thread.

```text
Thread B
   ↓
WAITING
   ↓
CPU is available for another thread
```

This is the major improvement discussed in the current material. The semaphore section explicitly describes blocking the process, putting it into a waiting queue, and giving the CPU to another process. 

---

# 3. Conditional Variable

A **condition variable** allows a thread to **wait until some condition becomes true**. 

It works together with a **lock**. 

Think of:

```text
Lock
+
Condition Variable
```

The lock protects the shared data.

The condition variable lets a thread **sleep until it has a reason to continue**.

---

# 4. Easy Example: Producer and Consumer

Imagine a queue:

```text
Queue
[       ]
```

There are two threads:

```text
Producer → puts data into queue
Consumer → removes data from queue
```

Suppose the queue is empty.

The consumer cannot remove anything.

Without a condition variable:

```text
Consumer:
"Is there data?"
"No."
"Is there data?"
"No."
"Is there data?"
"No."
...
```

That's busy waiting.

With a condition variable:

```text
Consumer
   ↓
Queue empty?
   ↓
YES
   ↓
WAIT
```

Now the consumer sleeps.

Later, the producer adds an item:

```text
Producer
   ↓
Add item
   ↓
Notify consumer
```

Consumer wakes up:

```text
WAITING
   ↓
WAKE UP
   ↓
Acquire lock
   ↓
Read item
```

That is the basic idea of a condition variable. 

---

# 5. Why Does the Condition Variable Need a Lock?

This is important.

A condition variable is used **with a lock**.

Conceptually:

```text
lock()

while (condition is false) {
    wait()
}

use shared data

unlock()
```

The lock protects the shared state.

The condition variable handles:

> "I need to sleep until something changes."

---

# 6. What Happens When `wait()` Is Called?

This is the most important part.

Suppose:

```text
Thread A has the lock
Condition = false
```

A calls `wait()`.

```text
Thread A
   ↓
wait()
   ↓
Release lock
   ↓
Enter WAITING state
```

So **waiting does not mean holding the lock while sleeping**.

It releases the lock so another thread can make the condition become true. 

Then:

```text
Thread B
   ↓
acquires lock
   ↓
changes shared data
   ↓
notifies A
```

A wakes up:

```text
A
↓
WAITING
↓
RUNNING
↓
re-acquires lock
↓
continues
```

---

# 7. Why Is This Better Than Busy Waiting?

This directly answers your question.

### Busy waiting

```text
Thread B
   ↓
while (condition is false)
    keep checking
```

CPU is being used just to check the condition.

### Condition variable

```text
Thread B
   ↓
condition false
   ↓
WAIT
   ↓
CPU runs something else
```

When the condition changes:

```text
Thread A
   ↓
notify
   ↓
Thread B wakes up
```

So:

```text
Busy waiting
→ keep CPU busy while waiting

Condition variable
→ sleep while waiting
```

So, condition variables are used **to avoid busy waiting**. 

---

# 8. What Does "No Contention" Mean Here?

The idea is that a thread waiting on the condition isn't constantly competing for CPU time just to repeatedly check the condition.

It is **blocked/sleeping**, rather than spinning.

---

# 9. Now Semaphores

A **semaphore** is another synchronization mechanism. 

The easiest way to understand it is:

> **A semaphore is a counter that represents how many resource slots are available.**

For example:

```text
Semaphore = 3
```

means:

```text
3 resource slots are available
```

So up to 3 threads can access that resource concurrently, depending on how the semaphore is being used.

## Let's say just 2 threads

Suppose we have one process:

```text
Process
├── Thread A
└── Thread B
```

Both threads can run perfectly fine:

```text
CPU
 ↓
A
 ↓
B
 ↓
A
 ↓
B
```

**No semaphore is needed just to make threads run.**

## Then where does the semaphore come in?

Suppose A and B both want to use **one shared resource**.

For example:

```text
Shared resource = 1 printer
```

Both want the printer:

```text
A ──┐
    ├──→ Printer
B ──┘
```

We don't want:

```text
A and B
   ↓
using printer
at the exact same time
```

So we need some mechanism to control access.

A semaphore can do that:

```text
Semaphore = 1
```

Think of it as:

> **1 = one permission available**

### A gets permission

```text
Semaphore = 1

A → takes permission

Semaphore = 0
A → uses printer
```

B tries:

```text
B → wants printer
B → semaphore = 0
B → waits
```

When A finishes:

```text
A → releases permission

Semaphore = 1

B → wakes up
B → uses printer
```

### Without shared resources

```text
Thread A ────────>
Thread B ────────>

Both can run.
No semaphore required.
```

### With a shared resource

```text
Thread A ──┐
           ├──→ Shared Resource
Thread B ──┘
           ↓
      Need synchronization
           ↓
       Semaphore
```

### Why did we talk about semaphores after race conditions?

Because of this problem:

```text
Thread A ──┐
           ├──→ shared variable
Thread B ──┘
```

Both modify the same thing.

That can cause a **race condition**.

So we use synchronization mechanisms:

```text
Race condition
     ↓
Need synchronization
     ↓
Mutex / Lock
Semaphore
Condition Variable
```

They solve **different coordination problems**.

### Example

Suppose you have **3 database connections**:

```text
Semaphore = 3
```

Then:

```text
Thread A → connection 1
Thread B → connection 2
Thread C → connection 3
Thread D → waits
```

Thread D waits because **all 3 resource slots are occupied**.

---

# 10. Why Is a Semaphore Different From a Mutex/Locks?

This is extremely important.

### Mutex/Locks

Think:

```text
1 key
```

Only one thread can have it.

```text
Thread A → 🔑
Thread B → waits
Thread C → waits
```

### Counting semaphore

Think:

```text
3 tickets
```

Three threads can use the resource simultaneously.

```text
Thread A → Ticket 1
Thread B → Ticket 2
Thread C → Ticket 3

Thread D → waits
```

---

# 11. Types of Semaphores

There are two important types here.

## Binary Semaphore

Value is:

```text
0 or 1
```

It is also treated as mutex-style locking. 

Think:

```text
1 → available
0 → unavailable
```

Example:

```text
1 → Thread can enter
0 → Thread must wait
```

---

## Counting Semaphore

A counting semaphore can represent multiple resource instances.

For example:

```text
Semaphore = 5
```

means 5 units/resources are available.

Counting semaphores can control access to a finite number of resource instances. 

Example:

```text
5 database connections
5 parking spaces
5 worker slots
```

---

# 12. Semaphore Operations: `wait()` and `signal()`

These two names are very important.

### `wait()`

A thread asks:

> "Can I take one resource?"

Conceptually:

```text
wait(S)
```

decreases the available count when a resource is available.

### `signal()`

A thread says:

> "I'm done. One resource is available again."

Conceptually:

```text
signal(S)
```

increases the available count / wakes a waiting thread.

---

# 13. Semaphore Example

Suppose:

```text
S = 2
```

Two resources exist.

### Thread A

```text
wait(S)
S = 1
```

### Thread B

```text
wait(S)
S = 0
```

### Thread C

```text
wait(S)
S = 0
↓
C must wait
```

Then A finishes:

```text
signal(S)
S = 1
↓
wake a waiting thread
```

C can now continue.

---

# 14. The Big Improvement: No Busy Waiting

This is probably the most important part of the current material.

A naive semaphore could behave like:

```text
while (S <= 0) {
    // keep checking
}
```

That's busy waiting.

Instead, the source describes a **blocking semaphore**:

```text
wait(S)

If S is not positive:
    block the process
```

The blocked process:

```text
→ goes into a waiting queue
→ enters Waiting state
→ CPU scheduler runs another process
```

So, both the synchronization mechanisms: conditional variable and semaphores can block, but they block for different reasons.

1. Condition Variable → blocking is the core behavior.
2. Semaphore → can block when no resource is available.
