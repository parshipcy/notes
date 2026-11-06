# Swapping | Context Switching | Orphan Process | Zombie Process

These topics connects directly with the previous topics you studied: **process states, PCB, scheduling, and context switching**.

The easiest way to understand it is to think about what happens when the OS has **too many processes, switches between processes, or a parent/child process finishes**.

---

# 1. Swapping

## What is swapping?

Sometimes there are **too many processes in memory**.

RAM is limited, so the OS may temporarily take a process **out of RAM and move it to secondary storage (disk)**.

Later, the process can be brought back into RAM and continue from where it stopped.

This is called **swapping**. 

### Simple idea

```text
RAM
│
├── Process A
├── Process B
├── Process C
└── Process D
```

Suppose RAM is getting crowded.

The OS can do:

```text
Process C
   ↓
SWAP-OUT
   ↓
Disk / Secondary Storage
```

Now RAM has space:

```text
RAM
│
├── Process A
├── Process B
└── Process D
```

Later:

```text
Disk
 ↓
SWAP-IN
 ↓
RAM
```

And Process C can continue.

---

# 2. Why do we need Swapping?

### Reason 1: Reduce the number of processes in memory

Removing a process from RAM reduces the **degree of multiprogramming**. 

Remember from Lec-10:

> **Degree of multiprogramming = number of processes in memory.**

So:

```text
More processes in RAM
        ↓
Higher degree of multiprogramming

Fewer processes in RAM
        ↓
Lower degree of multiprogramming
```

### Reason 2: Free memory

If memory requirements become too high, the OS may need to free RAM for other processes. 

---

# 3. Swap-Out and Swap-In

These two terms are very important.

### Swap-Out

Move a process:

```text
RAM → Disk
```

### Swap-In

Bring a process back:

```text
Disk → RAM
```

**Medium-Term Scheduler (MTS)** performs swap-out and swap-in. 

### Memory trick

```text
OUT → RAM → Disk
IN  → Disk → RAM
```

---

# 4. Easy Example of Swapping

Suppose your computer has:

```text
RAM = 8 GB
```

And several processes are using a lot of memory.

```text
Chrome     → 3 GB
VS Code    → 2 GB
Game       → 2 GB
Another    → 2 GB
```

That's already more than 8 GB.

The OS may temporarily move some process memory out of RAM:

```text
Game
 ↓
Swap-out
 ↓
Disk
```

Now RAM becomes available for other processes.

Later:

```text
Game
 ↓
Swap-in
 ↓
RAM
 ↓
Game continues
```

---

# 5. Context Switching

You already saw this in Lec-9.

**Context switching means switching the CPU from one process to another.** 

For example:

```text
CPU
 ↓
Process A
```

The OS decides to run B:

```text
Process A
   ↓
Save A's state in PCB
   ↓
Load B's saved state
   ↓
Process B
```

---

# 6. What is "Context"?

The **context** is basically the information needed to continue a process from where it stopped.

This includes important CPU state such as:

```text
Program Counter
Registers
Stack-related state
etc.
```

So:

> **Context = current state of the process needed to resume it.**

---

# 7. Context Switch Step-by-Step

Suppose A is running.

```text
CPU → Process A
```

### Step 1: Save A's context

The kernel saves A's current state into **A's PCB**.

```text
CPU
 ↓
Process A's current state
 ↓
PCB of A
```

### Step 2: Restore B's context

The kernel takes B's previously saved state from B's PCB.

```text
PCB of B
 ↓
CPU
```

### Step 3: B runs

```text
CPU
 ↓
Process B
```

This is exactly the save-and-restore operation. 

---

# 8. Is Context Switching Useful Work?

Context switching is **pure overhead**.

Why?

Because while the OS is doing:

```text
Save A
↓
Load B
```

the CPU is not actually executing useful instructions for A or B.

So:

```text
Context switch
= necessary
BUT
= overhead
```



---

# 9. Why Does Context-Switching Speed Differ?

It depends on things such as:

* Memory speed
* Number of registers that must be copied



So conceptually:

```text
More state to save/restore
        ↓
More work
        ↓
Potentially slower context switch
```

---

# 10. Swapping vs Context Switching

These are easy to mix up.

### Swapping

Moves a process between:

```text
RAM ↔ Disk
```

### Context Switching

Switches the CPU between:

```text
Process A ↔ Process B
```

### Very simple distinction

```text
SWAPPING
"Where is the process stored?"

Context Switching
"Which process is using the CPU?"
```

---

# 11. Orphan Process

Now we move to parent and child processes.

A **parent process** can create a **child process**.

Example:

```text
Parent
  |
  └── Child
```

An **orphan process** is a process whose **parent has terminated while the child is still running**. 

Example:

```text
Parent P
   |
   └── Child C

P terminates
   ↓
C is still running
   ↓
C becomes an ORPHAN
```

---

# 12. What Happens to an Orphan?

Orphan processes are **adopted by the init process**. 

So:

```text
Parent
   ↓
terminates

Child
   ↓
still running
   ↓
Orphan
   ↓
adopted by init
```

**init** is the first process of the OS. 

---

# 13. Zombie Process

A **zombie process**, also called a **defunct process**, is different from an orphan.

A zombie process has:

> **Finished execution, but still has an entry in the process table.** 

This is the key sentence to memorize.

---

# 14. How Does a Zombie Happen?

Suppose:

```text
Parent
   |
   └── Child
```

The child runs and finishes:

```text
Child
 ↓
Finished
```

But the parent has not yet read the child's exit status.

So the child remains in the process table as a **zombie**. 

Conceptually:

```text
Child executes
      ↓
Child exits
      ↓
Child has no more work
      ↓
But PCB/process-table entry remains
      ↓
ZOMBIE
```

---

# 15. Why doesn't the OS remove it immediately?

Because the parent still needs to know:

> **"How did my child finish?"**

The parent can use the **`wait()` system call** to read the child's exit status.

So once this happens, the zombie is removed from the process table. This is called **reaping the zombie**. 

---

# 16. What is `wait()`?

Think of the parent saying:

```text
Parent:
"Child, tell me your exit status."
```

The OS provides this through:

```c
wait();
```

The parent reads the child's termination information.

Then:

```text
Zombie
   ↓
parent calls wait()
   ↓
exit status collected
   ↓
process-table entry removed
   ↓
Zombie is reaped
```

---

# 17. Why Does the Child Become a Zombie?

The parent may call `wait()` later, while the child may have already terminated earlier. 

For example:

```text
Child finishes at 10:00:01
Parent calls wait() at 10:00:10
```

During those 9 seconds:

```text
Child = Zombie
```

Once the parent performs the required wait:

```text
Zombie → Reaped → Removed from process table
```

---

# 18. Orphan vs Zombie

This is **very important for exams**.

| Orphan                  | Zombie                         |
| ----------------------- | ------------------------------ |
| Parent has terminated   | Child has terminated           |
| Child is still running  | Child has finished             |
| Process is executing    | Process is no longer executing |
| Adopted by init         | Waiting to be reaped           |
| Parent disappears first | Child finishes first           |

### Memory trick

```text
ORPHAN
Parent dies first
Child is still alive

ZOMBIE
Child dies first
Entry is still alive
```

Or even easier:

> **Orphan = running child with no parent.**

> **Zombie = dead child whose process-table entry still exists.**
