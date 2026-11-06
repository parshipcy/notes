# Deadlock Part 1

## 1. What is Deadlock?

Deadlock happens when two or more processes wait for resources held by each other, so none of them can continue.

### Example

```
Process P1 holds R1 and wants R2
Process P2 holds R2 and wants R1

P1 → waiting for R2
P2 → waiting for R1

Neither can continue!
       ↓
    DEADLOCK
```

## 2. How Does a Process Use a Resource?

```
1. Request → Ask for the resource
2. Use     → Perform the required work
3. Release → Free the resource
```

Examples of resources include memory, CPU cycles, files, locks, sockets and I/O devices.

## 3. Four Necessary Conditions for Deadlock

All four conditions must hold simultaneously for deadlock to occur.

| Condition           | Easy meaning                                            |
| ------------------- | ------------------------------------------------------- |
| 1. Mutual Exclusion | Only one process can use a resource at a time.          |
| 2. Hold and Wait    | A process holds one resource while waiting for another. |
| 3. No Preemption    | A resource cannot be forcibly taken away.               |
| 4. Circular Wait    | Processes wait for resources in a circular chain.       |

### Circular Wait diagram

```

P1 holds R1 and wants R2.
P2 holds R2 and wants R1.

P1 → R2 → P2 → R1
↑_______________↓

```

Neither process can proceed.

## 4. Methods for Handling Deadlocks

There are three approaches:

1. Prevent or avoid deadlocks before they occur.
2. Detect and recover after a deadlock occurs.
3. Ignore the problem, called the Ostrich Algorithm.

## 5. Deadlock Prevention

The idea is to ensure that at least one of the four necessary conditions cannot occur.

| Condition        | Prevention idea                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| Mutual Exclusion | Allow sharing where possible, such as read-only files. Some resources cannot be shared.                      |
| Hold and Wait    | Request all required resources together, or request additional resources only after releasing existing ones. |
| No Preemption    | The OS may take resources away from a process if it cannot give that process the additional resource it requested.    |
| Circular Wait    | Set a fixed order for acquiring resources, such as P1: requests R1 → then R2, P2: requests R1 → then R2. If P1 gets R1 first, P2 must wait for R1 before it can acquire R2. It cannot hold R2 while waiting for R1, so the circular-wait cycle is prevented.   |

---

### With resource preemption, the OS can do this:

P -> Process  
R -> Resource

```
P1 holds R1
     ↓
Requests R2, but R2 is unavailable
     ↓
OS takes back/releases R1
     ↓
P1 waits without holding R1
     ↓
Later, P1 retries when both resources are available
```

Why can this cause livelock?

Imagine P1 and P2 repeatedly acquire resources, lose them, and retry.

```
P1 gets resources → releases them → retries
P2 gets resources → releases them → retries
P1 and P2 keep repeating...
```

They are active, but neither makes useful progress. This is called livelock.
