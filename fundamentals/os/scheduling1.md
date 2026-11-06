# Process Scheduling | FCFS | Convoy Effect

This is about **how the OS decides which process gets the CPU next**.

The most important concepts here are:

```text
Process Scheduling
CPU Scheduler
Non-Preemptive Scheduling
Preemptive Scheduling
Scheduling Terms
FCFS
Convoy Effect
Gantt Chart
```

---

# 1. What is Process Scheduling?

Suppose several processes are waiting for the CPU:

```text
Ready Queue

[P1] [P2] [P3] [P4]
```

But a CPU core can execute only one process at a time.

So the OS has to decide:

> **Which process should get the CPU first?**

This decision is called **process scheduling**.

```text
Ready Queue
     ↓
CPU Scheduler
     ↓
Select one process
     ↓
CPU
```

Process scheduling helps the OS use the CPU efficiently by switching the CPU between processes.

---

# 2. CPU Scheduler

The **CPU Scheduler** selects a process from the **Ready Queue** to execute.

This was previously called:

```text
CPU Scheduler = Short-Term Scheduler (STS)
```

So:

```text
Ready Queue
     ↓
STS / CPU Scheduler
     ↓
Select process
     ↓
Dispatcher
     ↓
CPU
```

### Remember

> **Scheduler chooses. Dispatcher gives CPU.**

---

# 3. Why Do We Need Scheduling?

Imagine:

```text
P1 → needs CPU for 20 seconds
P2 → needs CPU for 2 seconds
P3 → needs CPU for 2 seconds
```

If P1 runs first:

```text
P1 → 20 sec
P2 → 2 sec
P3 → 2 sec
```

P2 and P3 have to wait a long time.

But if we choose a better order:

```text
P2 → 2 sec
P3 → 2 sec
P1 → 20 sec
```

P2 and P3 finish much earlier.

This is why **scheduling algorithms matter**.

---

# 4. Non-Preemptive Scheduling

This is very important.

In **non-preemptive scheduling**, once a process gets the CPU:

> **The OS does not take the CPU away until that process finishes or moves to a waiting state.**

For example:

```text
P1 gets CPU
     ↓
P1 keeps CPU
     ↓
P1 finishes
     ↓
P2 gets CPU
```

Or:

```text
P1 gets CPU
     ↓
P1 requests I/O
     ↓
P1 goes to Waiting
     ↓
Another process gets CPU
```

### Easy definition

> **Non-preemptive = Once you get the CPU, you keep it until you finish or voluntarily leave it.**

So it has two disadvantages:

### Starvation

A short process may keep waiting behind a long process.

### Lower CPU utilization

Depending on workload, the CPU can sometimes become idle when the running process blocks and no ready process is available.

---

# 5. Preemptive Scheduling

In **preemptive scheduling**, the OS can take the CPU away from a running process.

For example:

```text
P1 is running
     ↓
Time quantum expires
     ↓
OS stops P1
     ↓
P2 gets CPU
```

This allows the OS to switch more frequently between processes.

### Easy definition

> **Preemptive = OS can interrupt a running process and give the CPU to another process.**

Advantages:

```text
Less starvation
Higher CPU utilization
```

---

# 6. Goals of CPU Scheduling

What makes a scheduling algorithm "good"?

### 1. Maximum CPU Utilization

Keep the CPU busy as much as possible.

```text
Bad:
CPU → idle → idle → idle

Good:
CPU → P1 → P2 → P3 → P4
```

---

### 2. Minimum Turnaround Time

A process should finish as quickly as possible after arriving.

---

### 3. Minimum Waiting Time

A process should spend as little time as possible waiting in the Ready Queue.

---

### 4. Minimum Response Time

The process should get its **first CPU response quickly**.

This is especially important for interactive programs.

---

### 5. Maximum Throughput

Complete as many processes as possible per unit of time.

For example:

```text
10 processes completed in 1 second
```

is higher throughput than:

```text
5 processes completed in 1 second
```

---

# 7. Important Scheduling Terms

This is probably the most important part for solving scheduling questions.

Suppose we have:

```text
Process P1

Arrival Time = 0
Burst Time   = 5
```

Now let's understand the terms.

---

## Arrival Time (AT)

**Arrival Time = when the process enters the Ready Queue.**

Example:

```text
P1 arrives at time 0
```

Then:

```text
AT = 0
```

If P2 arrives at time 3:

```text
P2 → AT = 3
```

### Easy definition

> **AT = When did the process arrive?**

---

## Burst Time (BT)

**Burst Time = amount of CPU time required by the process.**

Example:

```text
P1 needs CPU for 5 seconds
```

Then:

```text
BT = 5
```

Think:

> **BT = How much CPU time does the process need?**

---

## Completion Time (CT)

**Completion Time = time when the process finishes execution.**

Example:

```text
P1 runs from 0 → 5
```

Therefore:

```text
CT = 5
```

Think:

> **CT = When did the process finish?**

---

## Turnaround Time (TAT)

Turnaround time is:

```text
TAT = CT - AT
```

It tells us:

> **How long the process stayed in the system from arrival until completion.**

### Example

```text
AT = 2
CT = 10
```

Then:

```text
TAT = 10 - 2
    = 8
```

So the process took **8 seconds from arrival to completion**.

---

## Waiting Time (WT)

Waiting time is:

```text
WT = TAT - BT
```

Since:

```text
TAT = Waiting Time + CPU Time
```

therefore:

```text
WT = TAT - BT
```

### Example

```text
AT = 2
CT = 10
BT = 5
```

First:

```text
TAT = CT - AT
    = 10 - 2
    = 8
```

Then:

```text
WT = TAT - BT
   = 8 - 5
   = 3
```

So the process spent **3 seconds waiting**.

---

## Response Time (RT)

Response time means:

> **How long did the process wait before getting the CPU for the first time?**

Formula:

```text
RT = First CPU Start Time - Arrival Time
```

### Example

Suppose:

```text
P1 arrives at 2
P1 first gets CPU at 7
```

Then:

```text
RT = 7 - 2
   = 5
```

So P1 waited **5 seconds before getting its first CPU time**.

---

# 8. Very Important Difference: WT vs RT

These two are often confused.

### Waiting Time

Total time spent waiting in the Ready Queue.

```text
WT = TAT - BT
```

### Response Time

Only the time until the process gets CPU **for the first time**.

```text
RT = First CPU Start - AT
```

In some simple non-preemptive FCFS examples, they may happen to be equal, but conceptually they are different.

---

# 9. What is FCFS?

**FCFS = First Come, First Serve**

It is one of the simplest CPU scheduling algorithms.

The rule is:

> **The process that arrives first gets the CPU first.**

Just like a queue at a shop.

```text
Person 1
   ↓
Person 2
   ↓
Person 3
```

The first person gets served first.

Same thing:

```text
Ready Queue

P1 → P2 → P3
```

CPU executes:

```text
P1 → P2 → P3
```

FCFS is **non-preemptive**.

---

# 10. FCFS Example

The first example:

| Process | AT | BT |
| ------- | -: | -: |
| P1      |  0 | 20 |
| P2      |  1 |  2 |
| P3      |  2 |  2 |

Since FCFS uses arrival order:

```text
P1 → P2 → P3
```

So the Gantt chart is:

```text
0        20      22      24
|--------|-------|-------|
   P1       P2      P3
```

---

## Final Table

```text
Process    AT    BT    CT    TAT    WT
-----------------------------------------
P1          0    20    20     20     0
P2          1     2    22     21    19
P3          2     2    24     22    20
```

Average waiting time:

```text
Average WT = (0 + 19 + 20) / 3
           = 39 / 3
           = 13
```

So:

```text
Average Waiting Time = 13
```

This is exactly why the example is useful for explaining **convoy effect**.

---

# What is the Convoy Effect?

This is the main concept demonstrated by the first example.

Imagine:

```text
P1 → Long process
P2 → Short process
P3 → Short process
```

FCFS says:

```text
P1 → P2 → P3
```

But P1 needs **20 seconds**.

So:

```text
P1
████████████████████
0                    20

P2
                     ██
                     20 22

P3
                       ██
                       22 24
```

P2 and P3 are short, but they are stuck behind the long P1.

This is called the:

> **Convoy Effect**

---

# What Does Convoy Mean?

A **convoy** is basically a group of short processes following behind a long process.

Imagine a road:

```text
🚗 🚗 🚗 🚗
```

A very slow truck is at the front:

```text
🚚 🚗 🚗 🚗
```

Everyone behind it has to move slowly.

Similarly:

```text
Long Process
     ↓
Short Process
     ↓
Short Process
```

The short processes are forced to wait because of the long one.

---

# Why is Convoy Effect Bad?

Because it creates **large waiting times**.

In the example:

```text
P1 WT = 0
P2 WT = 19
P3 WT = 20
```

Average:

```text
13
```

P2 only needs **2 seconds of CPU time**, but waits **19 seconds**.

P3 also needs only **2 seconds**, but waits **20 seconds**.

That's poor resource utilization from the perspective of response/waiting.

---

# 11. Second Example

It's different FCFS ordering:

```text
P2 → P3 → P1
```

with:

| Process | AT | BT |
| ------- | -: | -: |
| P2      |  0 |  2 |
| P3      |  1 |  2 |
| P1      |  2 | 20 |

Gantt chart:

```text
0       2       4                    24
|-------|-------|---------------------|
   P2      P3             P1
```


## Final Table

```text
Process    AT    BT    CT    TAT    WT
-----------------------------------------
P2          0     2     2      2     0
P3          1     2     4      3     1
P1          2    20    24     22     2
```

Average waiting time:

```text
Average WT = (0 + 1 + 2) / 3
           = 1
```

So:

```text
Average WT = 1
```

This is much better than the previous example's average waiting time of **13**.

---

# Why Does the Order Matter So Much?

Compare:

### Long process first

```text
P1 → P2 → P3
```

Average WT:

```text
13
```

### Short processes first in this example

```text
P2 → P3 → P1
```

Average WT:

```text
1
```

Same basic processes, but **different order → dramatically different waiting time**.

That's why CPU scheduling algorithms matter.

---

# Important: FCFS is Non-Preemptive

Suppose:

```text
P1 starts at time 0
```

and:

```text
P2 arrives at time 1
```

P2 does **not** interrupt P1.

Why?

Because FCFS is **non-preemptive**.

```text
P1: 0 ─────────────────── 20
P2:                  waits
```

P2 has to wait until P1 finishes.

---

# How to Solve FCFS Questions

When you get an exam question, follow this order.

### Step 1: Look at AT

Determine which process arrives first.

### Step 2: Arrange by arrival time

```text
Earliest AT → Latest AT
```

### Step 3: Draw Gantt chart

Example:

```text
0    5    8    12
|----|----|-----|
 P1   P2    P3
```

### Step 4: Calculate CT

The right end of each process's execution.

### Step 5: Calculate TAT

```text
TAT = CT - AT
```

### Step 6: Calculate WT

```text
WT = TAT - BT
```

### Step 7: Calculate averages

```text
Average WT
Average TAT
```

---

# One Important Case: CPU Idle

Suppose:

```text
P1: AT = 3
```

There is no process from:

```text
0 → 3
```

Then the CPU is idle.

Gantt chart:

```text
0      3      8
|------|------|
 IDLE    P1
```

So don't assume the first process always starts at time `0`.

The CPU starts it when the process actually arrives.
