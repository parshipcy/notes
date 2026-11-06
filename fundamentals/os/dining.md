# Dining Philosophers Problem

## 1. Basic Idea

There are **5 philosophers** sitting around a circular table.

Each philosopher can be in 2 states:

```text
Thinking
   ↓
Eating
```

There are also **5 forks**, one between each pair of philosophers.

---

## 2. To Eat, a Philosopher Needs 2 Forks

Each philosopher needs:

```text
Left fork + Right fork
```

They can pick up **one fork at a time**.

A fork cannot be picked up if another philosopher already has it.

Example:

```text
                P1
          F1           F2
     P5                     P2
         F5             F3
             P4      P3
                 F4
```

P1 needs:

```text
F1 + F2
```

---

# 3. Semaphore Solution

Each fork is represented using a **binary semaphore**:

```text
fork[5] = {1, 1, 1, 1, 1}
```

Meaning:

```text
1 → fork available
0 → fork being used
```

To pick up a fork:

```text
wait(fork)
```

To release it:

```text
signal(fork)
```

---

# 4. The Problem: Deadlock

Even though the semaphore prevents two neighboring philosophers from using the **same fork**, it can still create **deadlock**.

Imagine all 5 become hungry at exactly the same time.

Each philosopher picks up their **left fork**:

```text
P1 → gets left fork
P2 → gets left fork
P3 → gets left fork
P4 → gets left fork
P5 → gets left fork
```

Now:

```text
All 5 forks are taken.
```

Each philosopher then tries to get their right fork:

```text
P1 → waiting for right fork
P2 → waiting for right fork
P3 → waiting for right fork
P4 → waiting for right fork
P5 → waiting for right fork
```

But nobody can get the second fork!

```text
P1 → has F1 → waiting for F2
P2 → has F2 → waiting for F3
P3 → has F3 → waiting for F4
P4 → has F4 → waiting for F5
P5 → has F5 → waiting for F1
```

Everyone waits forever.

**That's deadlock.**

---

# 5. How Can We Avoid Deadlock?

There are **3 approaches**.

### Method 1: Allow only 4 philosophers

Instead of allowing all 5 to try at once:

```text
Maximum = 4 philosophers
```

At least one fork will always remain available, helping prevent the circular deadlock.

---

### Method 2: Pick Both Forks Atomically

Don't allow:

```text
pick left
↓
wait
↓
pick right
```

Instead:

```text
Check BOTH forks
       ↓
Both available?
       ↓ YES
Pick both together
```

The check-and-pick operation happens inside a **critical section**, so another philosopher cannot interfere halfway through.

---

### Method 3: Odd-Even Rule

Give philosophers different fork orders.

```text
Odd philosopher:
Left → Right

Even philosopher:
Right → Left
```

For example:

```text
P1 → Left → Right
P2 → Right → Left
P3 → Left → Right
P4 → Right → Left
P5 → Left → Right
```

This breaks the circular waiting pattern.

---

# 6. The Main Lesson

Semaphore alone:

```text
Semaphore
    ↓
Prevents two neighboring philosophers
from using the same fork
```

But:

```text
Semaphore
    ↓
does NOT automatically prevent
every possible deadlock
```

The final point is:

> **Semaphores alone are not enough. We need additional rules to make the solution deadlock-free.**

### One sentence to remember

> **The Dining Philosophers problem shows that synchronization can prevent conflicts but can still create deadlock.**
> 