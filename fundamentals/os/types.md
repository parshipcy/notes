# Types of Operating Systems

## OS Goals

1. **Maximum CPU Utilization**
   → Keep the CPU busy as much as possible.

2. **Less Process Starvation**
   → No process should wait for CPU for an unnecessarily long time.

3. **Higher Priority Job Execution**
   → Higher-priority jobs should get CPU before lower-priority jobs.

---

## 1. Single Process Operating System

* Only **1 process executes at a time**.
* It is the oldest type of OS.

### Goals

* **CPU utilization:** ❌ Not maximum
* **Process starvation:** ✅ No starvation
* **Priority execution:** ❌ Not supported

### Example: MS-DOS

```text
P1 → Execute → Finish
P2 → Execute → Finish
P3 → Execute → Finish
```

Only one process is handled at a time.

---

## 2. Batch Processing Operating System

* Jobs are collected from different users.
* Similar jobs are grouped into **batches**.
* Batches are submitted to the processor **one by one**.
* All jobs in a batch are executed together.

### Problems

* ❌ Priority cannot easily be set.
* ❌ May lead to starvation because a batch may take a long time.
* ❌ CPU may become idle during I/O operations.

### Example: ATLAS

```text
User 1 → Job 1 ─┐
User 2 → Job 2 ─┼→ Operator → Batch → CPU
User 3 → Job 3 ─┘
```

Example:

```text
Batch 1:
    Job 1
    Job 2
    Job 3

       ↓

      CPU
```

The next batch waits until the current batch is completed.

---

## 3. Multiprogramming Operating System

* Uses **1 CPU**.
* Multiple jobs are kept in **memory**.
* If one process is busy with **I/O**, the CPU executes another process.
* Uses **context switching**.
* Switching happens when the current process goes into the **waiting state**.
* Reduces CPU idle time.

### Example

Suppose:

```text
P1 → Waiting for I/O
P2 → Ready
P3 → Ready
```

Instead of keeping the CPU idle:

```text
CPU → P2
```

If P2 also waits for I/O:

```text
CPU → P3
```

So, the CPU always has another job to execute.

### Main Idea

> Keep multiple jobs in memory so that the CPU always has something to execute when another job is busy with I/O.

**Example:** THE operating system

---

## 4. Multitasking Operating System

* A **logical extension of multiprogramming**.
* Uses **1 CPU**.
* Can run more than one task seemingly at the same time.
* Uses:

  * **Context switching**
  * **Time sharing**
* Increases responsiveness.
* Further reduces CPU idle time.

### Example

You are:

```text
Listening to music
       +
Browsing Chrome
       +
Writing code
```

The CPU rapidly switches between these tasks:

```text
P1 → P2 → P3 → P1 → P2 → P3 → ...
```

Each process gets a small amount of CPU time.

### Multiprogramming vs Multitasking

```text
Multiprogramming:
Switch mainly when the current process waits for I/O.

Multitasking:
Uses time sharing + context switching
to give processes regular CPU time.
```

**Example:** CTSS

---

## 5. Multiprocessing Operating System

* Has **more than 1 CPU in a single computer**.
* Multiple processes can execute at the same time.
* Provides better **throughput**.
* Increases **reliability**.
* Can reduce process starvation.

### Example

Suppose a computer has 4 CPUs:

```text
CPU 1 → P1
CPU 2 → P2
CPU 3 → P3
CPU 4 → P4
```

All four processes can execute at the same time.

### Reliability

If one CPU fails:

```text
CPU 1 → ❌ Failed

CPU 2 → Still working
CPU 3 → Still working
CPU 4 → Still working
```

The other CPUs can continue working.

**Example:** Windows NT

---

## 6. Distributed Operating System

A distributed OS manages resources across multiple interconnected computers.

* Can manage multiple:

  * CPUs
  * Memories
  * GPUs
  * Other resources
* Computers are **loosely connected**.
* Each computer is **autonomous**.
* Computers are physically separate but connected through a network.
* They communicate and work together.

### Example

```text
Computer A ─┐
Computer B ─┤
Computer C ─┼── Network
Computer D ─┘
```

Each computer has its own resources:

```text
Computer A → CPU + Memory
Computer B → CPU + Memory
Computer C → CPU + Memory
Computer D → CPU + Memory
```

Together, they can work on distributed tasks.

**Example:** LOCUS

---

## 7. Real-Time Operating System (RTOS)

* Designed for **real-time computation**.
* Computations must be completed within **tight time boundaries**.
* The system must respond within the required time.
* Used where a delayed response can cause serious problems.

### Example: Air Traffic Control

```text
Aircraft detected
       ↓
Process information
       ↓
Make decision
       ↓
Respond within required time
```

### Another Example: Robot

```text
Sensor detects obstacle
       ↓
RTOS processes information
       ↓
Robot reacts quickly
```

**Examples:** Air traffic control systems, robots

---

# Quick Comparison

| OS Type          |     CPU | Main Idea                                  |
| ---------------- | ------: | ------------------------------------------ |
| Single Process   |       1 | One process at a time                      |
| Batch Processing |       1 | Jobs grouped into batches                  |
| Multiprogramming |       1 | Switch when process waits for I/O          |
| Multitasking     |       1 | Time sharing + context switching           |
| Multiprocessing  |      >1 | Multiple CPUs in one computer              |
| Distributed      |    Many | Multiple networked computers work together |
| RTOS             | Depends | Response within tight time boundaries      |

---

# Easy Way to Remember

```text
Single Process
      ↓
One process at a time

Batch Processing
      ↓
Jobs → Batches → CPU

Multiprogramming
      ↓
I/O wait → Run another process

Multitasking
      ↓
Time sharing → Switch between tasks

Multiprocessing
      ↓
Multiple CPUs → Parallel execution

Distributed
      ↓
Multiple computers → Network → Work together

RTOS
      ↓
Must respond within required time
```
