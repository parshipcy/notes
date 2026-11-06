# CPU Scheduling | SJF | Priority | Round Robin

This continues from FCFS and introduces three important scheduling algorithms:

```text
1. SJF
2. Priority Scheduling
3. Round Robin
```

The main thing to understand is:

> **Different scheduling algorithms decide who gets the CPU next in different ways.**

It also compares **preemptive vs non-preemptive** versions. 

---

# 1. What is Scheduling?

Suppose the Ready Queue contains:

```text
P1   P2   P3   P4
```

The CPU can run only one process at a time.

So the **CPU Scheduler / STS** decides:

```text
"Which process should get the CPU now?"
```

Different algorithms answer this question differently.

```text
FCFS     → Who came first?
SJF      → Who needs the least CPU time?
Priority → Who has the highest priority?
RR       → Give everyone a small time slice
```

---

# 2. Important Terms

Before solving any scheduling question, remember:

```text
AT = Arrival Time
BT = Burst Time
CT = Completion Time
TAT = Turnaround Time
WT = Waiting Time
RT = Response Time
```

### Formulas

```text
TAT = CT - AT

WT = TAT - BT

RT = First CPU Start Time - AT
```

---

# 3. Preemptive vs Non-Preemptive

This is extremely important for Lec-13.

### Non-preemptive

Once a process gets the CPU:

```text
Process gets CPU
      ↓
Keeps CPU
      ↓
Finishes / waits
      ↓
Next process
```

The OS does **not** forcibly take the CPU away.

### Preemptive

The OS can interrupt the currently running process.

```text
P1 running
   ↓
P2 needs CPU / condition changes
   ↓
P1 is stopped
   ↓
P2 runs
```

---

# 4. SJF: Shortest Job First

## Basic idea

SJF chooses the process with the **smallest Burst Time (BT)**. 

In simple words:

> **The process that needs the least CPU time runs first.**

Example:

```text
P1 → BT = 8
P2 → BT = 3
P3 → BT = 5
```

SJF chooses:

```text
P2 → P3 → P1
```

because:

```text
3 < 5 < 8
```

---

# 5. SJF is Non-Preemptive

The first SJF is **non-preemptive**. 

That means once a process starts:

```text
P2 starts
   ↓
P2 keeps CPU
   ↓
P2 finishes
   ↓
Then choose the next shortest job
```

Even if a new shorter process arrives while P2 is running, P2 continues until it finishes.

---

# 6. SJF Example

This is an **illustrative example** to understand the algorithm.

Suppose:

| Process | AT | BT |
| ------- | -: | -: |
| P1      |  0 |  8 |
| P2      |  0 |  3 |
| P3      |  0 |  5 |

All three are available at time `0`.

SJF looks at BT:

```text
P1 = 8
P2 = 3
P3 = 5
```

Smallest:

```text
P2 → P3 → P1
```

### Gantt Chart

```text
0      3        8                16
|------|--------|----------------|
   P2      P3          P1
```

So:

```text
P2: 0 → 3
P3: 3 → 8
P1: 8 → 16
```

---

# 7. Calculate Waiting Time

### Table

```text
Process   BT   CT   TAT   WT
-----------------------------
P2         3    3    3     0
P3         5    8    8     3
P1         8   16   16     8
```

Average waiting time:

```text
(0+3+8)/3 = 11/3 = 3.67
```

---

# 8. SJF With Arrival Time

This is where things become more interesting.

The criteria for SJF involve:

```text
AT + BT
```

because you have to consider **which processes have actually arrived** and then choose the shortest available job. 

Suppose:

| Process | AT | BT |
| ------- | -: | -: |
| P1      |  0 |  8 |
| P2      |  1 |  3 |
| P3      |  2 |  2 |

At time `0`, only P1 is available.

So:

```text
0 → P1 starts
```

Because SJF is non-preemptive, P1 keeps the CPU for all 8 units.

```text
0        8       10      13
|--------|--------|-------|
   P1        P3      P2
```

Why P3 before P2?

When P1 finishes at time 8:

```text
P2 → BT 3
P3 → BT 2
```

So P3 is shorter.

Then:

```text
P3 → P2
```

---

# 9. Problem With Non-Preemptive SJF

Two important problems:

### 1. Convoy Effect

If a long process is the first one to become ready, it can run first and make many short processes wait. 

Example:

```text
P1 = 20
P2 = 2
P3 = 2
```

If P1 starts first:

```text
0                    20    22    24
|--------------------|------|------|
         P1             P2     P3
```

P2 and P3 are short, but they wait behind P1.

That's the **convoy effect**.

---

### 2. Starvation

A process can potentially wait for a very long time if shorter jobs keep getting selected before it. Process starvation might happen. 

---

# 10. SJF Preemptive

The easy way to understand it is:

> **If a newly available process has a shorter remaining CPU requirement than the currently running process, the current process can be interrupted.**

This is commonly understood as **Shortest Remaining Time First (SRTF)**.

### Example

Consider:

| Process | AT | BT |
| ------- | -: | -: |
| P1      |  0 |  8 |
| P2      |  1 |  3 |
| P3      |  2 |  2 |

At time 0:

```text
Only P1 exists
```

So:

```text
0 → P1 starts
```

At time 1:

```text
P1 remaining = 7
P2 BT = 3
```

P2 is shorter.

So P1 is preempted:

```text
0   1        4
|---|--------|
 P1    P2
```

At time 2, P3 arrives:

```text
P2 remaining = 2
P3 BT = 2
```

They are equal, so depending on the tie-breaking rule, the scheduler may keep P2 running.

Continuing one possible schedule:

```text
0   1        4      6              13
|---|--------|------|---------------|
 P1     P2      P3        P1
```

The exact result with equal remaining times can depend on the tie-breaking rule. The important concept is **preemption when a shorter job becomes available**.

---

# 11. Why is Preemptive SJF Better?

```text
Less starvation
No convoy effect
Lower average waiting time for a given set of processes
```



The reason is intuitive.

Suppose:

```text
Long process = 20
Short process = 2
```

Rather than making the short process wait behind the whole 20-unit job, the scheduler can allow the short job to run sooner.

---

# 12. Non-Preemptive SJF vs Preemptive SJF

|                                | Non-Preemptive SJF    | Preemptive SJF                      |
| ------------------------------ | --------------------- | ----------------------------------- |
| Basic idea                     | Choose shortest job   | Choose shortest remaining job       |
| Can interrupt running process? | No                    | Yes                                 |
| Convoy effect                  | Can occur             | no convoy effect          |
| Starvation                     | Possible              | less starvation           |
| Decision                       | At process completion | Can change when new process arrives |

---

# 13. Priority Scheduling

Now instead of looking primarily at BT, we give every process a **priority**.

Priority is assigned when the process is created. 

Example:

| Process | Priority |
| ------- | -------: |
| P1      |        3 |
| P2      |        1 |
| P3      |        2 |

You first need to know the convention:

```text
Smaller number = higher priority
```

or sometimes:

```text
Larger number = higher priority
```

The exact convention must be specified by the question. Do not assume it unless given.

For the example below, we'll use:

```text
1 = highest priority
```

---

# 14. Priority Scheduling: Non-Preemptive

The running process keeps the CPU until it finishes or waits.

Example:

| Process | AT | BT | Priority |
| ------- | -: | -: | -------: |
| P1      |  0 |  5 |        3 |
| P2      |  0 |  2 |        1 |
| P3      |  0 |  3 |        2 |

Priority order:

```text
P2 → P3 → P1
```

### Gantt Chart

```text
0      2        5             10
|------|--------|--------------|
   P2      P3         P1
```

Because:

```text
P2 → priority 1
P3 → priority 2
P1 → priority 3
```

---

# 15. Important SJF Connection

In short:

> **SJF is a special case of general priority scheduling where priority is inversely proportional to BT.** 

What does that mean?

Suppose:

```text
BT = 2 → high priority
BT = 5 → medium priority
BT = 10 → low priority
```

So:

```text
Smaller BT
   ↓
Higher priority
```

That's basically what SJF does.

---

# 16. Priority Scheduling: Preemptive

In preemptive priority scheduling:

> If a new process arrives with **higher priority** than the currently running process, the running process can be preempted. 

Example:

| Process | AT | BT | Priority |
| ------- | -: | -: | -------: |
| P1      |  0 |  8 |        3 |
| P2      |  2 |  3 |        1 |

Assume smaller number means higher priority.

At time `0`:

```text
P1 starts
```

```text
0     2
|-----|
  P1
```

At time `2`, P2 arrives.

```text
P1 priority = 3
P2 priority = 1
```

P2 has higher priority.

So P1 is interrupted:

```text
0     2       5       11
|-----|-------|--------|
  P1     P2       P1
```

That's preemptive priority scheduling.

---

# 17. Starvation in Priority Scheduling

## Problem:
A low-priority process may keep waiting if higher-priority processes continuously arrive. 

Example:

```text
Low priority P1
      ↓
waiting...
      ↓
High priority P2 arrives
      ↓
waiting...
      ↓
High priority P3 arrives
      ↓
waiting...
```

P1 might never get CPU.

This is **starvation**.

---

## Solution: Aging

The solution:

> **Aging**

A process that has been waiting for a long time gradually gets a higher priority. 

Example:

```text
Initial priority = 10

After waiting 15 min → priority = 9
After another 15 min → priority = 8
After another 15 min → priority = 7
```

Eventually, the process becomes important enough to run.

### Easy definition

> **Aging = Increase the priority of a waiting process over time so it does not starve.**

---

# 18. Round Robin (RR)

Now comes **Round Robin**, which is very important.

RR is:

* Popular
* Similar to FCFS, but preemptive
* Designed for time-sharing systems
* Uses **Arrival Time + Time Quantum**
* Does not depend on BT for its basic selection
* Has very low starvation
* Has no convoy effect
* Easy to implement
* Small time quantum causes more context switches 

---

# 19. What is Time Quantum?

**Time Quantum (TQ)** is the maximum amount of CPU time given to a process in one turn.

Suppose:

```text
TQ = 2 seconds
```

Then:

```text
P1 gets 2 sec
P2 gets 2 sec
P3 gets 2 sec
P1 gets 2 sec
...
```

It's basically:

> **Everyone gets a small turn.**

---

# 21. Round Robin Example

Let's use this illustrative example:

| Process | AT | BT |
| ------- | -: | -: |
| P1      |  0 |  5 |
| P2      |  0 |  3 |
| P3      |  0 |  4 |

Time Quantum:

```text
TQ = 2
```

Initial Ready Queue:

```text
P1 → P2 → P3
```

---

# 22. Round Robin Step-by-Step

### First turn: P1

P1 needs 5 units.

Quantum = 2.

So P1 runs for only 2:

```text
0      2
|------|
   P1
```

Remaining:

```text
P1 = 3
```

P1 goes back to Ready Queue.

```text
P2 → P3 → P1
```

---

### Second turn: P2

P2 needs 3.

Run for 2:

```text
2      4
|------|
   P2
```

Remaining:

```text
P2 = 1
```

Queue:

```text
P3 → P1 → P2
```

---

### Third turn: P3

P3 needs 4.

Run for 2:

```text
4      6
|------|
   P3
```

Remaining:

```text
P3 = 2
```

Queue:

```text
P1 → P2 → P3
```

---

### Fourth turn: P1

Remaining P1 = 3.

Run for 2:

```text
6      8
|------|
   P1
```

Remaining:

```text
P1 = 1
```

Queue:

```text
P2 → P3 → P1
```

---

### Fifth turn: P2

Remaining P2 = 1.

It needs less than the quantum, so it finishes:

```text
8    9
|----|
 P2
```

P2 terminates.

---

### Sixth turn: P3

Remaining P3 = 2.

It gets the full 2 and finishes:

```text
9      11
|-------|
   P3
```

---

### Seventh turn: P1

Remaining P1 = 1.

It finishes:

```text
11   12
|----|
 P1
```

---

# 23. Final Round Robin Gantt Chart

```text
0    2    4    6    8   9    11   12
|----|----|----|----|---|-----|----|
 P1   P2   P3   P1   P2   P3    P1
```

Execution order:

```text
P1 → P2 → P3 → P1 → P2 → P3 → P1
```

This is the key idea of Round Robin.

---

# 24. Why Does RR Feel Like "Everyone Gets a Turn"?

Because each process gets a small time slice.

Imagine students waiting to speak:

```text
Student A → 2 min
Student B → 2 min
Student C → 2 min
Student A → 2 min
Student B → 2 min
...
```

Nobody gets to monopolize the entire session.

That's essentially what Round Robin does with CPU time.

---

# 25. What Happens If TQ Is Very Small?

Suppose:

```text
TQ = 1
```

Then the CPU switches very frequently:

```text
P1
 ↓
P2
 ↓
P3
 ↓
P1
 ↓
P2
 ↓
P3
```

That means:

```text
More context switches
        ↓
More overhead
```

So:

> **Very small TQ → more context switching → more overhead.**

---

# 26. What Happens If TQ Is Very Large?

If the time quantum becomes very large, each process can run for a long time.

Conceptually:

```text
Large TQ
   ↓
Less frequent switching
   ↓
RR starts behaving more like FCFS
```

---

# 27. RR vs FCFS

This is a useful way to remember RR.

### FCFS

```text
P1 → runs until done
P2 → runs until done
P3 → runs until done
```

### Round Robin

```text
P1 → small turn
P2 → small turn
P3 → small turn
P1 → small turn
P2 → small turn
...
```

> **RR is like FCFS but preemptive**

means the processes are handled in queue order, but a process can be interrupted when its quantum expires. 

---

# 28. SJF vs Priority vs RR

This is the easiest comparison.

| Algorithm      | Main idea                        | Preemption                     |
| -------------- | -------------------------------- | ------------------------------ |
| FCFS           | First arrival first              | No                             |
| SJF            | Shortest BT first                | Usually non-preemptive version |
| Preemptive SJF | Shortest remaining job           | Yes                            |
| Priority       | Highest priority first           | Can be either                  |
| RR             | Give each process a time quantum | Yes                            |

---

# 29. Which Information Does Each Algorithm Need?

This is very important for solving questions.

### SJF

Needs:

```text
AT + BT
```


### Priority

Needs:

```text
AT + Priority
```

### RR

Needs:

```text
AT + Time Quantum
```

RR does not depend on BT for its selection criterion. 

---

# 30. Quick Mental Trick

```text
SJF
→ Shortest CPU job first

Priority
→ Most important process first

RR
→ Everyone gets a small turn
```
