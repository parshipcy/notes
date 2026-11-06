# MLQ | MLFQ

This section covers two more CPU scheduling methods:

```text
MLQ  → Multi-Level Queue
MLFQ → Multi-Level Feedback Queue
```

The names look similar, but the **main difference is very important**:

> **MLQ: a process stays in one queue.**
> **MLFQ: a process can move between queues.** 

---

# 1. First, Why Do We Need Multiple Queues?

Previously, we had one Ready Queue:

```text
Ready Queue
-------------------------
P1  P2  P3  P4  P5
-------------------------
```

But not every process behaves the same way.

For example:

```text
System process       → OS-related
Interactive process  → Needs user input
Batch process        → Runs in background
```

So instead of putting everything into one queue, we can create **different queues for different types of processes**.

```text
                Ready Queue
                     |
        +------------+------------+
        |            |            |
      Queue 1      Queue 2      Queue 3
```

That is the basic idea behind **Multi-Level Queue scheduling**. 

---

# 2. MLQ = Multi-Level Queue

## Basic idea

In MLQ, the Ready Queue is divided into **multiple separate queues** according to some property of the process.

For example:

```text
Queue 1 → System processes
Queue 2 → Interactive processes
Queue 3 → Batch processes
```

The process is **permanently assigned** to one queue. 

So:

```text
P1 → Queue 1
P2 → Queue 2
P3 → Queue 3
```

P1 cannot simply decide:

> "I want to move to Queue 2."

That's why MLQ is called **inflexible**. 

---

# 3. Why Are There Different Queues?

Examples of process types:

## System Process

Created by the OS.

Usually has the **highest priority** in this model. 

```text
System Process
     ↓
Highest priority
```

---

## Interactive Process

Also called a **foreground process**.

It needs user input / I/O.

Examples conceptually:

```text
Editor
Terminal
Interactive application
```

The important point is:

> **Interactive processes need user input.** 

---

## Batch Process

Also called a **background process**.

It runs without requiring user interaction.

```text
Batch Process
     ↓
Runs silently
     ↓
No user input required
```



---

# 4. Each MLQ Queue Can Have Its Own Algorithm

This is an important point.

Each queue can use a different scheduling algorithm. 

For example:

```text
System Process     → RR
Interactive        → RR
Batch              → FCFS
```

So it might look like:

```text
          Ready Queue
               |
       +-------+-------+
       |               |
System / Interactive   Batch
       |               |
      RR              FCFS
```

This means different types of processes can be scheduled differently.

---

# 5. Scheduling Between the Queues

Now an important question:

> What if several queues have processes waiting?

Scheduling **between the queues** is done using **fixed-priority preemptive scheduling**. 

For example:

```text
Queue 1 → Foreground
Queue 2 → Background
```

And:

```text
Foreground > Background
```

So the foreground queue has **absolute priority** over the background queue. 

---

# 6. Example: Foreground vs Background

Suppose:

```text
Foreground Queue
[P1]

Background Queue
[P2]
```

Currently:

```text
P2 is running
```

Then a foreground process P1 arrives.

Because:

```text
Foreground > Background
```

P2 gets preempted.

```text
P2 running
   ↓
P1 arrives
   ↓
P2 is preempted
   ↓
P1 runs
```

---

# 7. Main Problem With MLQ: Starvation

Here's the problem.

Suppose:

```text
High-priority queue
P1 P2 P3 P4 ...
```

and:

```text
Low-priority queue
P5
```

If the upper queue always has processes:

```text
P1 → P2 → P3 → P4 → P1 → P2 → ...
```

then P5 may keep waiting.

Lower-level queues are scheduled only after the processes in higher-level queues are completed, which can cause **starvation** for lower-priority processes. 

### Easy idea

```text
High Priority
████████████████████████

Low Priority
           P5 waits...
```

So:

> **MLQ can cause starvation.**

---

# 8. MLQ Also Has Convoy Effect

> **Convoy effect is present in MLQ.** 

So MLQ has two important problems to remember:

```text
MLQ
├── Starvation
└── Convoy Effect
```

---

# 9. MLQ in One Picture

```text
                    READY QUEUE
                         |
          +--------------+--------------+
          |              |              |
      System         Interactive       Batch
          |              |              |
         RR             RR             FCFS
          |              |              |
          +--------------+--------------+
                         |
                Fixed Priority
                Preemptive
                         |
                        CPU
```

And remember:

```text
Process assigned to queue
          ↓
Stays there permanently
```

---

# 10. MLFQ = Multi-Level Feedback Queue

Now we make MLQ **more flexible**.

The main difference:

> **Processes can move between queues.** 

That's why it is called **Feedback Queue**.

The process's behavior affects where it goes.

---

# 11. Why Does MLFQ Move Processes?

The queues are used to separate processes based on their **CPU burst characteristics**.

The basic idea is:

```text
Process uses little CPU
      ↓
Can stay in higher-priority queue
```

But:

```text
Process uses too much CPU
      ↓
Move to lower-priority queue
```



So MLFQ tries to favor processes that need shorter CPU bursts and interactive/I/O-bound behavior.

---

# 12. Example of MLFQ

Suppose we have:

```text
High Priority Queue
        ↓
      TQ = 2

Middle Priority Queue
        ↓
      TQ = 4

Lower Priority Queue
        ↓
      TQ = 8

Lowest Queue
        ↓
      FCFS
```

Visually:

```text
+-------------------+
| TQ = 2            |  ← Highest
+-------------------+
          ↓
+-------------------+
| TQ = 4            |
+-------------------+
          ↓
+-------------------+
| TQ = 8            |
+-------------------+
          ↓
+-------------------+
| FCFS              |  ← Lowest
+-------------------+
```

---

# 13. How Does a Process Move Down?

Imagine:

```text
P1 enters TQ = 2 queue
```

P1 gets 2 CPU units.

But P1 still needs more CPU.

So:

```text
P1
 ↓
Uses full TQ = 2
 ↓
Still not finished
 ↓
Move to lower queue
```

Now perhaps:

```text
TQ = 4
```

It gets another opportunity.

If it again uses the whole quantum and still needs CPU:

```text
P1
 ↓
Move lower
 ↓
TQ = 8
```

Eventually it may reach:

```text
FCFS
```

This matches the rule that a process using too much CPU is moved to a lower-priority queue. 

---

# 14. What Happens to Interactive Processes?

**I/O-bound and interactive processes remain in higher-priority queues**. 

Why?

Because such processes typically don't continuously consume CPU time.

Conceptually:

```text
Interactive process
      ↓
Uses CPU briefly
      ↓
Requests I/O
      ↓
Doesn't consume huge CPU bursts
      ↓
Stays higher
```

While:

```text
CPU-heavy process
      ↓
Uses entire quantum repeatedly
      ↓
Moves downward
```

This is the central idea of MLFQ.

---

# 15. Can a Process Move Back Up?

**Yes.**

This is another major difference from MLQ.

Suppose a process has been stuck in a lower-priority queue for a long time:

```text
Low Queue
    ↓
waiting...
    ↓
waiting...
    ↓
waiting...
```

MLFQ can move it upward.

This is a form of **aging** that prevents starvation. 

```text
Low Queue
   ↓
waits too long
   ↓
Higher Queue
```

So MLFQ can move processes:

```text
UP ↑
DOWN ↓
```

---

# 16. Why Is MLFQ Better Than MLQ?

MLFQ has:

```text
Less starvation
More flexibility
Can be configured for specific system requirements
```



The important reason is:

```text
MLQ
→ Process stuck in one queue

MLFQ
→ Process can move
```

---

# 17. MLQ vs MLFQ

This is the most important comparison.

| Feature                          | MLQ                        | MLFQ                                  |
| -------------------------------- | -------------------------- | ------------------------------------- |
| Multiple queues                  | Yes                        | Yes                                   |
| Can process move between queues? | No                         | Yes                                   |
| Flexible?                        | No                         | Yes                                   |
| Queue assignment                 | Permanent                  | Can change                            |
| Based on                         | Process properties         | Process behavior / CPU usage          |
| Starvation                       | Can happen                 | Less starvation                       |
| Aging                            | Not mentioned as mechanism | Used to move waiting processes upward |
| Convoy effect                    | Present                    | Present                               |

MLQ is inflexible and MLFQ is flexible, with less starvation in MLFQ.  

---

# 18. The Easiest Way to Remember MLQ

Think about **different classrooms**.

```text
Class A → High priority
Class B → Medium priority
Class C → Low priority
```

A student is assigned to one classroom:

```text
Student → Class A
```

and cannot move.

That's **MLQ**.

```text
MLQ
= fixed queue
= no movement
```

---

# 19. The Easiest Way to Remember MLFQ

Now imagine students can move based on behavior.

```text
Uses little CPU
      ↓
Higher queue

Uses lots of CPU
      ↓
Lower queue
```

If someone waits too long:

```text
Waits too long
      ↓
Move upward
```

That's **MLFQ**.

```text
MLFQ
= queues + feedback
= processes can move
```

---

# 20. Why Is It Called "Feedback"?

Because the process's **behavior affects its future queue**.

For example:

```text
Process uses a lot of CPU
          ↓
Feedback
          ↓
Move to lower queue
```

or:

```text
Process waits too long
          ↓
Feedback
          ↓
Move to higher queue
```

That's the idea behind the name **Multi-Level Feedback Queue**.

---

# 21. Comparison With Previous Algorithms

You have now learned:

```text
FCFS
SJF
PSJF
Priority
Preemptive Priority
RR
MLQ
MLFQ
```

The comparison table summarizes them by **design complexity, preemption, convoy effect, and overhead**. 

According to the table:

| Algorithm  | Design  | Preemption | Convoy Effect | Overhead |
| ---------- | ------- | ---------- | ------------- | -------- |
| FCFS       | Simple  | No         | Yes           | No       |
| SJF        | Complex | No         | Yes           | No       |
| PSJF       | Complex | Yes        | No            | Yes      |
| Priority   | Complex | No         | Yes           | No       |
| P-Priority | Complex | Yes        | Yes           | Yes      |
| RR         | Simple  | Yes        | No            | Yes      |
| MLQ        | Complex | Yes        | Yes           | Yes      |
| MLFQ       | Complex | Yes        | Yes           | Yes      |

This table is a useful reference for comparing the algorithms. 

---

# 22. One Important Meaning of "Overhead"

You already learned about context switching.

When the scheduler has to switch processes:

```text
Save current process
        ↓
Load another process
        ↓
Continue execution
```

that switching work is **overhead**.

So algorithms with frequent preemption can involve additional overhead.

The comparison table marks overhead accordingly. 

---

# 23. Easy MLQ Example

Suppose:

```text
Queue 1 → System
Queue 2 → Interactive
Queue 3 → Batch
```

And:

```text
Q1 → RR
Q2 → RR
Q3 → FCFS
```

Now:

```text
Q1: P1
Q2: P2 P3
Q3: P4 P5
```

Because Q1 has the highest priority:

```text
P1 gets CPU first
```

If P1 is running and an interactive process arrives:

```text
Q2 process arrives
```

The high-priority rule between queues determines whether it can preempt the lower queue's running process. In the foreground/background example, the higher-priority foreground queue preempts the background queue. 

---

# 24. Easy MLFQ Example

Let's use:

```text
Q1 → TQ = 2
Q2 → TQ = 4
Q3 → TQ = 8
Q4 → FCFS
```

Suppose P1 needs a lot of CPU.

```text
P1 enters Q1
   ↓
uses 2 units
   ↓
not finished
   ↓
Q2
   ↓
uses 4 units
   ↓
not finished
   ↓
Q3
   ↓
uses 8 units
   ↓
...
```

So:

```text
Q1
 ↓
Q2
 ↓
Q3
 ↓
Q4
```

A CPU-heavy process gradually moves downward.

---

# 25. But What About a Process Waiting Too Long?

Suppose P5 is stuck in Q4:

```text
Q4
 ↓
P5 waits
 ↓
P5 waits
 ↓
P5 waits...
```

MLFQ can apply aging:

```text
P5
 ↓
Waits too long
 ↓
Move up
 ↓
Q3 / Q2 / Q1
```

The exact mechanism can vary by implementation, but the core idea is that waiting too long can move a process toward a higher-priority queue. 

---

# 26. MLQ vs MLFQ: The One Question You Must Know

### Question:

**What is the main difference between MLQ and MLFQ?**

### Answer:

> In **MLQ**, a process is permanently assigned to one queue and cannot move between queues.

> In **MLFQ**, a process can move between queues based on its CPU behavior and waiting time.

 

---

# 27. Final Mental Model

```text
                MLQ
                 |
      +----------+----------+
      |          |          |
    Queue 1    Queue 2    Queue 3
      |          |          |
     RR         RR         FCFS

Process enters
      ↓
STAYS in that queue
```

Whereas:

```text
               MLFQ
                 |
      +----------+----------+
      |          |          |
     Q1         Q2         Q3
      |          |          |
     TQ2        TQ4        TQ8
      |          |          |
      +----------+----------+
                 ↓
               FCFS

Process
  ↓
uses lots of CPU
  ↓
moves DOWN

Waits too long
  ↓
moves UP
```
