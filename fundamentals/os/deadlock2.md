# Deadlock Part-2

The main idea is:

> Instead of allowing a process to get resources immediately, the OS first checks whether granting those resources could lead to deadlock.

There are four important topics:

1. Deadlock Avoidance
2. Safe State and Unsafe State
3. Banker’s Algorithm
4. Deadlock Detection and Recovery

# 1. Deadlock Avoidance

Deadlock avoidance means the OS checks whether granting a resource request will keep the system in a safe state.

Before granting a request, the OS considers:

- Available resources.
- Resources already allocated to processes.
- Maximum resources each process may need.

If granting the request keeps the system safe, it can be approved. Otherwise, the process must wait.

### Simple example

Suppose a process requests 2 resources.

```
Process requests 2 resources
          |
          ↓
OS checks resource availability
          |
          ↓
Will granting them keep system SAFE?
       /         \
     YES          NO
      |            |
    Grant         Wait
```

# 2. Safe State vs Unsafe State

### Safe State

A state is safe when the OS can find an order in which every process can finish, using the currently available resources and the resources released by completed processes.

That order is called a Safe Sequence.

Example:

```
P2 → P4 → P5 → P1 → P3
```

If all processes can finish in this order, the system is in a safe state.

### Unsafe State

An unsafe state means the OS cannot guarantee that all processes can finish safely.

Remember:

```
SAFE
→ Safe sequence exists.
→ All processes can finish.

UNSAFE
→ No safe sequence exists.
→ Deadlock may happen, but hasn't necessarily happened.

DEADLOCK
→ Processes are actually stuck.
```

# 3. Banker’s Algorithm

Banker’s Algorithm is a deadlock-avoidance method.

Before allocating resources, the OS checks whether granting a request will keep the system in a safe state.

- Safe state → Grant resources.
- Unsafe state → Make the process wait.

Important formula:

```
Need = Max - Allocation
```

Steps:

1. Calculate remaining `Need`.
2. Check `Need ≤ Available`.
3. If possible, let the process finish.
4. Add its allocated resources back to `Available`.
5. Repeat until all processes finish.

```
All processes finish → SAFE
No process can finish → UNSAFE
```

# 4. Deadlock Detection

Sometimes an OS does not prevent deadlocks in advance.

Instead, it allows processes to run, checks whether deadlock has happened, and then recovers.

There are two cases:

1. Single instance of each resource type: Use a Wait-for Graph. If there is a cycle in the Wait-for Graph, deadlock exists. P1 → P2 means P1 is waiting for a resource held by P2. If P1 requests R2, we know P2 is blocking it. There cannot be another free instance of R2. Therefore, a cycle in the Wait-for Graph confirms deadlock.

```
P1 holds R1 and requests R2.
P2 holds R2 and requests R1.

P1 → P2
P2 → P1
```

2. Multiple instances of resource types: When a resource type has multiple instances, the OS needs to check whether processes can still finish with the available resources.So, Banker's Algorithm is used for this case.

```
Printer resources = 3 instances

P1 → using 1 printer
P2 → using 1 printer
P3 → using 1 printer
```

The OS checks:
- Available resources.
- Resources allocated to each process.
- Remaining resource requirements.
It then checks whether processes can finish or whether they are stuck waiting.

# 5. Recovery from Deadlock

Once deadlock is detected, the OS needs to break it.

### A. Process Termination

Two options:

1. Abort all deadlocked processes.
2. Abort one process at a time until the deadlock cycle disappears. Priority could be one factor in choosing which process will be aborted.

### B. Resource Preemption

The OS takes resources away from some processes and gives them to others until the deadlock cycle is broken. Priority could be one factor in choosing which process loses a resource in some implementations.

```
P1 holds R1
P2 holds R2

OS takes R1 from P1
        ↓
Gives R1 to P2
        ↓
Deadlock cycle may break
```
