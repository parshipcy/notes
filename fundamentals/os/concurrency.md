# Introduction to Concurrency

The main idea here is **how one process can do multiple things using threads**.

The most important concepts are:

```text
Concurrency
Thread
Thread Scheduling
Thread Context Switching
Thread Control Block (TCB)
Multithreading
Benefits of Multithreading
```

---

# 1. What is Concurrency?

**Concurrency** means dealing with multiple instruction sequences during the same period of time.

In an operating system, this happens when multiple threads are running and the OS schedules them for execution. 

### Easy example

Think about a browser:

```text
Browser
├── Tab 1
├── Tab 2
├── Tab 3
└── Tab 4
```

At the same time, different work may be happening:

```text
Download something
Play a video
Render a page
Check input
```

The OS and browser can organize this work using multiple threads.

### Simple definition

> **Concurrency = multiple tasks making progress during the same period.**

---

# 2. What is a Thread?

A **thread** is a single sequence of execution inside a process. It is also described as an independent execution path and a lightweight process. 

Think:

```text
Process
   |
   +---- Thread 1
   +---- Thread 2
   +---- Thread 3
```

A process can contain multiple threads.

---

# 3. Process vs Thread

This is very important.

### Process

A process is a running program.

```text
Process
├── Memory
├── Resources
└── Threads
```

### Thread

A thread is one execution path within that process.

```text
Process A
├── Thread 1
├── Thread 2
└── Thread 3
```

So:

> **Process = container for the work**

> **Thread = actual execution path doing the work**

---

# 4. Why Do We Need Multiple Threads?

Suppose you're using a text editor.

You are typing:

```text
"Hello World"
```

At the same time, the application can also:

```text
Thread 1 → Handle typing
Thread 2 → Check spelling
Thread 3 → Format/display text
Thread 4 → Save the document
```

Your source specifically gives this example: while typing, **spell checking, formatting, and saving** can be handled concurrently by multiple threads. 

Without concurrency, everything would have to wait for one task to finish before another could progress.

---

# 5. What is Multithreading?

**Multithreading** means using multiple threads within a process.

Example:

```text
Process
│
├── Thread 1 → User input
├── Thread 2 → Spell checking
├── Thread 3 → Saving
└── Thread 4 → Formatting
```

The purpose is to divide a process's independent tasks into separate execution paths. 

---

# 6. Thread Scheduling

Threads also need CPU time.

The OS schedules threads for execution based on scheduling rules such as priority. 

Imagine:

```text
Ready Threads

T1
T2
T3
T4
```

The OS decides which thread gets processor time.

```text
T1 → CPU
T2 → CPU
T3 → CPU
...
```

The important point from the source is:

> Even though threads belong to a process, the **operating system still assigns processor time slices to threads**. 

---

# 7. How Does a Thread Get the CPU?

Every thread has its **own Program Counter (PC)**. 

Remember:

```text
PC = address of the next instruction to execute
```

So:

```text
Thread A
PC → instruction 100

Thread B
PC → instruction 500
```

When the OS schedules Thread A:

```text
Thread A's PC
     ↓
CPU gets the corresponding instruction
     ↓
CPU executes it
```

When Thread B gets scheduled:

```text
Thread B's PC
     ↓
CPU gets B's instruction
     ↓
CPU executes it
```

Your source describes this as the OS fetching the instruction corresponding to the thread's PC and executing it. 

---

# 8. Thread Context Switching

You already learned about **process context switching**.

The same idea exists for threads.

Suppose:

```text
Thread A is running
```

The OS wants to run:

```text
Thread B
```

So it does:

```text
Thread A
   ↓
Save A's current state
   ↓
Load B's saved state
   ↓
Thread B runs
```

The OS saves the current thread state and switches to another thread **within the same process**. 

---

# 9. What Gets Saved During Thread Switching?

```text
Program Counter
Registers
Stack
```

These are part of the thread's state. 

So:

```text
Thread A
├── PC
├── Registers
└── Stack
```

When A is switched out, this state must be preserved.

---

# 10. Important Difference: Thread vs Process Switching

This is one of the most important points.

### Process switching

Switching:

```text
Process A → Process B
```

The memory address space also changes.

### Thread switching within the same process

Switching:

```text
Thread A → Thread B
```

Both threads belong to the same process, so they share the process's memory address space.

Thread switching **doesn't include switching the memory address space**. It still involves the PC, registers, and stack. 

### Think of it this way

```text
Process
┌─────────────────────────────┐
│ Same memory address space   │
│                             │
│ Thread A                    │
│ Thread B                    │
│ Thread C                    │
└─────────────────────────────┘
```

Switching between A and B:

```text
A → B
```

The memory environment stays the same because both are inside the same process.

---

# 11. Why Is Thread Switching Faster?

The basic reason is:

```text
Process switch
→ switch process state
→ switch memory address space

Thread switch
→ switch thread state
→ same process memory space
```

So less state needs to change.

---

# 12. What About CPU Cache?

> **CPU's cache state is preserved** during thread context switching. 

The simple idea is:

```text
Thread A → Thread B
```

Since both threads belong to the same process, the memory address space does not change, so the cache state can be retained.

---

# 13. I/O and Time Quantum Can Also Cause Thread Switching

Thread switching can happen due to things such as:

```text
I/O
Time Quantum expiration
```

For example:

```text
Thread A running
      ↓
Time quantum expires
      ↓
Switch to Thread B
```

Or:

```text
Thread A running
      ↓
Requests I/O
      ↓
Thread A waits
      ↓
Run Thread B
```

---

# 14. TCB: Thread Control Block

You already learned about the **PCB**.

For threads, there is a similar structure called:

> **TCB = Thread Control Block**

A TCB is used for state storage and management during thread context switching. 

Think:

```text
Process
   ↓
PCB → information about process

Thread
   ↓
TCB → information about thread
```

A simple picture:

```text
Process A
│
├── TCB of Thread 1
├── TCB of Thread 2
└── TCB of Thread 3
```

The TCB can hold the thread's execution state needed when switching between threads.

---

# 15. Single CPU + Multithreading

> A single CPU system would not gain from multithreading. 

Why?

Suppose you have:

```text
1 CPU
2 threads
```

The CPU can execute only one thread at a time.

So:

```text
T1
 ↓
context switch
 ↓
T2
 ↓
context switch
 ↓
T1
```

There is switching overhead.

Therefore a single CPU, two threads have to context switch and there is no gain according to this framing. 

For your study material, remember the statement as given:

```text
Single CPU
→ threads cannot execute simultaneously on separate CPUs
→ switching is required
```

---

# 16. Multicore / Multiprocessor System

With multiple processors/cores, multiple threads can actually execute at the same time.

For example:

```text
CPU 1 → Thread A
CPU 2 → Thread B
CPU 3 → Thread C
```

Now actual parallel execution becomes possible.

This is why the source says threads allow better utilization of **multiprocessor architectures**. 

---

# 17. Concurrency vs Parallelism

These two words are often confused.

### Concurrency

Multiple tasks are making progress during the same period.

Example:

```text
T1 → run
T2 → run
T1 → run
T3 → run
```

They may be sharing one CPU through scheduling.

### Parallelism

Multiple tasks are **actually executing at the same time** on multiple CPU cores.

```text
Core 1 → T1
Core 2 → T2
```

A simple way to remember:

```text
Concurrency  → dealing with multiple tasks
Parallelism   → executing multiple tasks simultaneously
```

---

# 18. Benefits of Multithreading

## A. Responsiveness

One thread can handle one task while another thread handles another task.

Example:

```text
Thread 1 → User input
Thread 2 → Background work
```

So the application can remain responsive.

The source lists **responsiveness** as a benefit. 

---

# 19. Resource Sharing

Threads belonging to the same process can efficiently share process resources. 

Think:

```text
Process
│
├── Thread A
├── Thread B
└── Thread C

All belong to the same process
↓
Can share process resources
```

This is one reason threads are useful for breaking a process into multiple tasks.

---

# 20. Economy

Creating a new process can be expensive because the OS has to allocate memory and resources.

Creating and switching threads is generally more economical. 

So instead of:

```text
Create Process A
Create Process B
Create Process C
```

we can sometimes do:

```text
One Process
├── Thread A
├── Thread B
└── Thread C
```

Allocating memory and resources for process creation is costly, so dividing tasks into threads of the same process can be preferable. 

---

# 21. Complete Picture

Now connect everything:

```text
                    PROCESS
                       |
          +------------+------------+
          |            |            |
       Thread 1     Thread 2     Thread 3
          |            |            |
         TCB          TCB          TCB
          |            |            |
          +------------+------------+
                       |
                Shared process
                    resources
```

Each thread has its own execution state, including:

```text
PC
Registers
Stack
```

But threads of the same process share the process's memory address space. 

---

# 22. Process Context Switch vs Thread Context Switch

```text
PROCESS SWITCH

Process A
   ↓
Save state in PCB
   ↓
Switch memory address space
   ↓
Process B
```

```text
THREAD SWITCH

Thread A
   ↓
Save thread state in TCB
   ↓
No memory address-space switch
   ↓
Thread B
```

That's why the thread switch is faster according to the source. 

---

# 23. Example: Browser

Imagine a browser process:

```text
Browser Process
│
├── Thread 1 → Render webpage
├── Thread 2 → Handle user input
├── Thread 3 → Download data
└── Thread 4 → Background work
```

Each thread can have:

```text
Thread 1 → PC + Registers + Stack
Thread 2 → PC + Registers + Stack
Thread 3 → PC + Registers + Stack
Thread 4 → PC + Registers + Stack
```

But they belong to the same process.

So they can share the process's resources.

---

# 24. Important Differences

| Concept        | Meaning                                          |
| -------------- | ------------------------------------------------ |
| Process        | Running program                                  |
| Thread         | Execution path inside a process                  |
| Concurrency    | Multiple tasks making progress                   |
| Multithreading | Multiple threads inside a process                |
| PC             | Each thread has its own next-instruction address |
| TCB            | Stores/manages thread state                      |
| Thread switch  | Switch between threads of a process              |
| Process switch | Switch between different processes               |
