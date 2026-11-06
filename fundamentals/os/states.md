# Process States | Process Queues

---

# 1. Process States

A process does not stay in one state while it is running.

As it executes, it moves between different states.

The five states are:

```text
New
 ↓
Ready
 ↓
Running
 ↓
Waiting
 ↓
Ready
 ↓
Running
 ↓
Terminated
```

The actual transition depends on what the process is doing. 

---

## New State

**New** means the process is being created.

The OS is taking a program and converting it into a process. 

For example:

```text
You open Chrome
      ↓
OS starts creating Chrome process
      ↓
NEW
```

Think:

> **New = Process is being created.**

---

## Ready State

A process is in the **Ready** state when:

* It is already in memory.
* It is ready to run.
* It is waiting for the CPU to be assigned to it. 

For example:

```text
Chrome → Ready
VS Code → Ready
Spotify → Ready
```

But the CPU can run only one process at a time on a single CPU core.

So they wait in the **Ready Queue**.

```text
Ready Queue

[Chrome] [VS Code] [Spotify] [Terminal]
                  ↓
                CPU
```

---

## Running State

When a process actually gets the CPU and its instructions are being executed, it enters the **Running** state. 

```text
Ready
  ↓
CPU assigned
  ↓
Running
```

> **Running = Process is currently using the CPU.**

---

## Waiting State

A process enters the **Waiting** state when it has to wait for an I/O operation or event. 

For example, suppose a program wants to read a file:

```text
Process
   ↓
"Read file"
   ↓
Waiting for disk I/O
```

The CPU does not need to sit idle waiting for the disk.

Instead, the OS can let another ready process use the CPU.

```text
Process A
   ↓
Waiting for disk

Process B
   ↓
Ready
   ↓
CPU
```

This is one of the main reasons operating systems can keep the CPU busy.

> **Waiting = "I cannot continue until some I/O event happens."**

---

## Terminated State

A process enters the **Terminated** state when it has finished execution. 

After it terminates, the OS removes its PCB entry from the process table.

```text
Running
   ↓
Finished
   ↓
Terminated
   ↓
PCB entry removed
```

### Easy definition

> **Terminated = Process has finished.**

---

# 2. Complete Process-State Flow

```text
             admitted
   NEW ----------------→ READY
                           |
                           | scheduler dispatch
                           ↓
                        RUNNING
                       /       \
          I/O wait   /           \ exit
                   ↓               ↓
               WAITING         TERMINATED
                   |
                   | I/O/event completion
                   ↓
                 READY

RUNNING
   |
   | interrupt
   ↓
 READY
```

Let's understand the arrows.

---

## New → Ready

The OS has created the process and it is now ready to execute.

```text
NEW
 ↓
READY
```

---

## Ready → Running

A process cannot just decide to use the CPU.

The **short-term CPU scheduler** selects a process from the Ready Queue.

Then the dispatcher gives the CPU to that process.

```text
Ready Queue
    ↓
CPU Scheduler
    ↓
Dispatcher
    ↓
CPU
    ↓
Running
```

The CPU scheduler picks a process from the Ready Queue and dispatches it to the CPU. 

---

## Running → Waiting

Suppose the running process needs I/O.

Example:

```text
Running
   ↓
"Read from disk"
   ↓
Waiting
```

It cannot continue until the I/O event is completed.

The diagram labels this transition **I/O or event wait**. 

---

## Waiting → Ready

Once the required I/O or event is complete:

```text
Waiting
   ↓
I/O completed
   ↓
Ready
```

The process becomes ready to use the CPU again.

The diagram labels this **I/O or event completion**. 

---

## Running → Ready

A running process can also be moved back to Ready.

Why?

Because its CPU time slice may expire or an interrupt may occur.

```text
Running
   ↓
Interrupt
   ↓
Ready
```

The process is still not finished. It is simply waiting for another chance to get CPU time.

The state diagram in the PDF shows this transition as **interrupt**. 

---

## Running → Terminated

When the process finishes:

```text
Running
   ↓
exit
   ↓
Terminated
```

The PCB entry is then removed from the process table. 

---

# 3. Process Queues

Now comes the second major topic.

The OS maintains **queues** to keep track of processes waiting at different stages:

```text
Job Queue
Ready Queue
Waiting Queue
```



---

## Job Queue

The **Job Queue** contains processes in the **New** state. They are still in **secondary memory**. 

Think:

```text
SSD / Secondary Memory
        ↓
    JOB QUEUE
        ↓
Long-Term Scheduler
        ↓
      RAM
```

The **Job Scheduler**, also called the **Long-Term Scheduler (LTS)**, selects processes from this pool and loads them into memory for execution. 

> **Job Queue = Processes waiting to be brought into main memory.**

---

## Ready Queue

The **Ready Queue** contains processes in the **Ready** state.

These processes are already in **main memory** and are waiting for the CPU. 

```text
RAM
 ↓
READY QUEUE
 ↓
CPU Scheduler
 ↓
CPU
```

The **CPU Scheduler**, also called the **Short-Term Scheduler (STS)**, picks a process from the Ready Queue and dispatches it to the CPU. 

> **Ready Queue = Processes in RAM waiting for CPU.**

---

## Waiting Queue

The **Waiting Queue** contains processes that are in the **Waiting** state. 

For example:

```text
Process A → waiting for disk
Process B → waiting for keyboard input
Process C → waiting for network
```

They cannot continue until the required I/O event completes.

---

# Long-Term Scheduler (LTS)

The **Long-Term Scheduler** is also called the **Job Scheduler**.

Its job is to select processes from the Job Queue and load them into memory. 

```text
Job Queue / New(in diagram)
    ↓
   LTS
    ↓
RAM / Ready Queue
```

> **LTS decides which processes should enter memory.**

---

# Short-Term Scheduler (STS)

The **Short-Term Scheduler** is also called the **CPU Scheduler**.

Its job is to choose a process from the Ready Queue and send it toward the CPU. 

```text
Ready Queue
     ↓
    STS
     ↓
   CPU
```

> **STS decides which ready process should get the CPU next.**

---

# Dispatcher

The **dispatcher** is an OS module that gives control of the CPU to the process selected by the **Short-Term Scheduler**. 

So don't confuse:

### Scheduler

> **Chooses** the process.

### Dispatcher

> **Actually gives CPU control** to the chosen process.

Think:

```text
Ready Queue
     ↓
   Scheduler
     ↓
"Choose Process A"
     ↓
 Dispatcher
     ↓
"Here is the CPU, Process A."
```

---

# Degree of Multiprogramming

> **Degree of multiprogramming = Number of processes in memory.** 

For example:

```text
RAM contains:

Process A
Process B
Process C
Process D
```

Then:

```text
Degree of multiprogramming = 4
```

The **LTS controls the degree of multiprogramming**. 

Why?

Because LTS decides how many processes should be brought into memory.

---

# Real-Life Example

Let's imagine you open three programs:

```text
Chrome
VS Code
Spotify
```

### Step 1: Chrome starts

```text
NEW
 ↓
READY
 ↓
RUNNING
```

### Step 2: Chrome waits for disk/network I/O

```text
RUNNING
 ↓
WAITING
```

Meanwhile:

```text
VS Code
 ↓
READY
 ↓
RUNNING
```

### Step 3: Chrome's I/O finishes

```text
WAITING
 ↓
READY
```

### Step 4: CPU scheduler eventually chooses Chrome

```text
READY
 ↓
RUNNING
```

### Step 5: Chrome exits

```text
RUNNING
 ↓
TERMINATED
```
