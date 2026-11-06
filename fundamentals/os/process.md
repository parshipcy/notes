# Introduction to Process

---

# 1. What is a Program?

A **program** is compiled code that is ready to execute. 

For example:

```c
int main() {
    printf("Hello");
}
```

After compilation, we get executable code.

Think:

```text
Program = Instructions sitting in storage
```

It is **not running yet**.

---

# 2. What is a Process?

A **process is a program under execution**. 

For example:

```text
Chrome.exe stored on SSD
        ↓
You open Chrome
        ↓
Chrome is loaded into memory
        ↓
Chrome is now a PROCESS
```

So:

```text
Program = Not running
Process = Program currently running
```

### Easy analogy

```text
Recipe written on paper = Program
Cooking the recipe = Process
```

The recipe itself is not doing anything.

When you actually start cooking, it becomes an active activity.

---

# 3. How Does the OS Create a Process?

The OS converts a **program into a process** through these steps: 

```text
1. Load program and static data into memory
                ↓
2. Allocate runtime stack
                ↓
3. Allocate heap memory
                ↓
4. Perform I/O tasks
                ↓
5. OS gives control to main()
```

Let's understand each one.

---

## Step 1: Load Program into Memory

The program is stored on secondary storage such as an SSD.

When you run it:

```text
SSD
 ↓
RAM
```

The executable code and required static data are loaded into memory.

---

## Step 2: Allocate Runtime Stack

The OS creates a **stack area** for the process.

The stack is mainly used for things such as:

* Local variables
* Function arguments
* Return values
* Function call information

The process architecture diagram shows these items in the **Stack** section. 

We'll go deeper into stack below.

---

## Step 3: Allocate Heap Memory

The process also gets a **heap area**.

The heap is mainly used for **dynamically allocated memory**. The process diagram labels the Heap as the area for dynamically allocated variables. 

We'll go deeper into this too.

---

## Step 4: I/O Tasks

The process may need to communicate with devices.

Examples:

```text
Keyboard
Mouse
Disk
Network
Display
```

These are called **I/O (Input/Output)** operations.

---

## Step 5: OS Hands Control to `main()`

Once the process environment is prepared, execution eventually begins from the program's entry point, represented as:

```text
main()
```

---

# 4. Architecture of a Process

```text
+----------------------+
|        Stack         |
|                      |
+----------------------+
|        Heap          |
|                      |
+----------------------+
|        Data          |
|                      |
+----------------------+
|        Text          |
|                      |
+----------------------+
```

Let's understand each part.

---

## Text Segment

The **Text** section contains the **compiled program code** loaded from disk. This is shown at the bottom of the process architecture diagram. 

For example:

```text
printf("Hello");
```

The compiled machine instructions for the program are stored here.

Think:

```text
Text = What instructions should the CPU execute?
```

---

## Data Segment

The **Data** section contains **global and static data**. 

Example:

```c
int global = 10;

static int count = 5;
```

These variables have a lifetime associated with the program/process rather than a single function call.

Think:

```text
Data = Global + static variables
```

---

## Heap

The **heap** is memory used for **dynamically allocated variables**.

For example, in C:

```c
int *p = malloc(sizeof(int));
```

The memory requested by `malloc()` comes from the heap.

In many languages, dynamic objects are also stored in heap memory.

#### Easy idea

Suppose you don't know beforehand how much memory you need.

You can request memory while the program is running:

```text
Program running
      ↓
"Give me some more memory"
      ↓
Heap
```

### Heap is useful for:

```text
Dynamic arrays
Objects
Data structures
Memory allocated during runtime
```

---

## Stack

The **stack** is memory used during function execution.

```text
Local variables
Function arguments
Return values
```



Consider:

```c
void add(int a, int b) {
    int result = a + b;
}

int main() {
    add(10, 20);
}
```

When `add()` is called, information associated with that function is placed on the stack.

Conceptually:

```text
main()
 ↓
calls add()
 ↓
Stack gets a new function frame
 ↓
a, b, result and return information
```

When `add()` finishes:

```text
add() finishes
     ↓
its stack frame is removed
```

---

# 5. Stack vs Heap

This is extremely important.

| Stack                                     | Heap                                                                  |
| ----------------------------------------- | --------------------------------------------------------------------- |
| Used for function calls                   | Used for dynamic allocation                                           |
| Local variables                           | Dynamically allocated data                                            |
| Function arguments                        | Objects/dynamic data                                                  |
| Automatically managed with function calls | Usually managed through allocation/deallocation or garbage collection |
| Generally fast                            | Generally more flexible                                               |
| Limited in size                           | Usually much larger                                                   |

### Easy way to remember

```text
STACK → Functions
HEAP  → Dynamic memory
```

Or:

> **Stack = temporary workspace for function calls**
> **Heap = memory requested dynamically while the program runs**

---

# 6. Stack Example

Consider:

```c
int square(int x) {
    int result = x * x;
    return result;
}
```

When `square(5)` runs:

```text
Stack
+-------------------+
| return information|
| x = 5             |
| result = 25       |
+-------------------+
```

When the function returns:

```text
Stack frame removed
```

So the stack changes as functions are called and return.

---

# 7. Heap Example

Suppose:

```c
int *p = malloc(100 * sizeof(int));
```

The program is basically saying:

> "I need memory for 100 integers."

That memory is allocated from the **heap**.

Conceptually:

```text
Stack
  |
  | p = address
  ↓
Heap
  |
  └── 100 integers
```

Notice something important:

**The pointer variable `p` itself may be on the stack, while the memory it points to is on the heap.**

This is a common source of confusion.

---

# 8. What is OOM?

**OOM = Out Of Memory**

It means the program/system cannot provide enough memory for a requested allocation.

For example:

```c
int *p = malloc(1000000000000);
```

If there isn't enough available memory/address space to satisfy the request, the allocation can fail.

In a system running many programs, overall memory pressure can also lead to an **Out Of Memory** condition.

---

# 9. Stack Overflow vs OOM

These are related but different.

### Stack Overflow

Happens when the program uses too much **stack memory**.

A common example is infinite recursion:

```c
void fun() {
    fun();
}
```

What happens?

```text
fun()
 ↓
fun()
 ↓
fun()
 ↓
fun()
 ↓
...
 ↓
Stack keeps growing
 ↓
Stack limit reached
 ↓
Stack Overflow
```

---

# 10. Heap OOM

A **heap OOM** happens when a program keeps requesting memory and cannot obtain more.

Example:

```c
while (1) {
    malloc(1024);
}
```

If the allocated memory is never released or otherwise remains needed, memory consumption can continuously increase.

Eventually:

```text
Heap usage
   ↓
   ↓
   ↓
Memory exhausted
   ↓
OOM
```

### How to resolve heap OOM

Depending on the programming language:

```text
1. Find unnecessary allocations
2. Free memory when it is no longer needed
3. Avoid memory leaks
4. Avoid creating unnecessarily huge objects/arrays
5. Reuse memory where possible
6. Process large data in smaller chunks
7. Increase available memory when appropriate
```

For garbage-collected languages such as Java, JavaScript, Python, etc., you usually don't manually `free()` every object, but you still need to avoid retaining objects unnecessarily.

---

# 11. Stack vs Heap vs OOM

```text
Stack
 ↓
Function calls + local variables

Heap
 ↓
Dynamic memory

OOM
 ↓
Not enough memory available for the required allocation
```

Don't think of **OOM as another memory area**.

It is an **error/condition** caused by insufficient memory.

---

# 12. What is a PCB?

Now we reach one of the most important topics.

**PCB = Process Control Block**

The OS needs to keep track of every running process.

It maintains something similar to a table:

```text
Process Table
+----------------+
| Process 1      |
| Process 2      |
| Process 3      |
| Process 4      |
+----------------+
```

Each entry is called a **PCB**. 

### Easy definition

> **PCB is a data structure maintained by the OS that stores important information about a process.**

---

## What Information Does a PCB Store?

```text
Process ID
Program Counter
Process State
Priority
Registers
```

Conceptually:

```text
PCB
+----------------------+
| Process ID           |
| Program Counter      |
| Process State        |
| Priority             |
| Registers            |
| Open Files           |
| Open Devices         |
+----------------------+
```

---

## Process ID (PID)

Every process needs a way to be uniquely identified.

The **Process ID (PID)** acts as its identifier.

```text
Chrome → PID 1524
VS Code → PID 2380
Terminal → PID 3100
```

The actual numbers are just examples.

Think:

> **PID = ID card of the process**

---

## Program Counter (PC)

The **Program Counter** stores the address of the **next instruction** that the process should execute.

Imagine the program has:

```text
Instruction 1
Instruction 2
Instruction 3
Instruction 4
Instruction 5
```

If the process has completed instruction 3:

```text
Program Counter
       ↓
Instruction 4
```

So:

> **PC tells the CPU where execution should continue.**

---

## Process State

A process can be in different states.

Common examples are:

```text
New
Ready
Running
Waiting/Blocked
Terminated
```

For example:

```text
Ready
  ↓
Running
  ↓
Waiting
  ↓
Ready
```

The PCB stores the process's current state.

---

## Priority

The OS may assign a priority to a process.

Priority helps the scheduler determine which process should receive CPU time.

Conceptually:

```text
Process A → Priority 10
Process B → Priority 5
```

The actual scheduling behavior depends on the operating system and scheduler.

Priority affects how a process gets CPU time. 

---

## Registers in the PCB

This is particularly important.

While a process is executing, its CPU register values change.

Suppose:

```text
Process A is running
        ↓
CPU registers contain A's current values
```

Now its time slice expires.

The OS needs to run another process:

```text
Process A
   ↓
Save CPU register values
   ↓
PCB of A
   ↓
Load Process B's saved register values
   ↓
CPU
   ↓
Process B continues
```

So when a process's time slice expires, its current register values are saved in the PCB, and when it runs again, those values are restored to the CPU registers. 

This is a major part of **context switching**.

---

# Why Save Registers in the PCB?

Imagine Chrome is running:

```text
Chrome is running
CPU registers:
A = 10
B = 20
Program Counter = instruction 500
```

Now the OS decides:

> "Chrome's time slice is over. Let another process run."

The OS saves Chrome's important CPU state:

```text
Chrome PCB

Registers:
A = 10
B = 20
PC = 500
...
```

Then another process runs.

Later Chrome gets CPU time again:

```text
Chrome PCB
   ↓
Restore saved values
   ↓
CPU registers
   ↓
Chrome continues from where it stopped
```

Without saving this state, the process would not know where or how to continue correctly.

---

# Very Important: PCB vs CPU Registers

### Forget Process B for a moment.

Imagine Process A is running.

```text
CPU
┌─────────────────────┐
│ Register = 10       │
│ Register = 20       │
│ PC = 500            │
└─────────────────────┘
        ↓
    Process A
```

The **registers are actual tiny storage locations inside the CPU**.

So right now:

> CPU registers are holding values that Process A is using.

---

### Now A has to stop

The OS wants to give the CPU to another process.

But the OS cannot just forget A's current values.

So it takes a **copy of those values** and puts them in A's PCB.

```text
CPU registers
     ↓
   COPY
     ↓
PCB of A
┌─────────────────────┐
│ Register = 10       │
│ Register = 20       │
│ PC = 500            │
└─────────────────────┘
```

That's it.

**The PCB is basically the OS's record of A's CPU state.**

---

### Then B runs

The CPU registers are now used by Process B.

```text
PCB of B
     ↓
values loaded into
     ↓
CPU registers
     ↓
Process B runs
```

---

### Later A runs again

The OS takes A's saved values from its PCB:

```text
PCB of A
┌─────────────────────┐
│ Register = 10       │
│ Register = 20       │
│ PC = 500            │
└─────────────────────┘
        ↓
CPU registers
        ↓
Process A continues
```

So A can continue from where it stopped.

---

## The one thing you should remember

```text
CPU REGISTER
= actual tiny storage inside CPU

PCB
= memory structure used by OS to SAVE information
  about a process, including its register values
```

---

# Complete Picture

Now connect everything:

```text
                 PROCESS
                    │
        ┌───────────┴───────────┐
        │                       │
   Process Memory             PCB
        │                       │
  ┌─────┼─────┬─────┐       ┌──┴──────────┐
  │     │     │     │       │             │
 Text  Data  Heap  Stack    Process ID    Program Counter
                              │             │
                           State         Registers
                                           │
                                        Priority
                                           │
                                      Open files
```
