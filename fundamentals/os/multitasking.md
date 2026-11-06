# Multi-Tasking vs Multi-Threading

## 1. Program

A **program** is an executable file containing instructions to perform a specific task.

* It is compiled code, ready to execute.
* It is stored on the **disk**.

## 2. Process

A **process** is a program that is currently running.

* A process resides in **RAM**.
* Example: When you open Chrome, the Chrome program becomes a process.

## 3. Thread

A **thread** is a single path of execution inside a process.

* It is a lightweight process.
* A process can have multiple threads.
* Threads can be used to perform independent tasks concurrently.

**Example: Text Editor**

While typing:

* One thread handles typing.
* One thread handles spell-checking.
* One thread handles formatting.
* One thread handles saving.

These tasks can run concurrently. 

---

# 4. Multi-Tasking

**Multitasking** means executing more than one task at the same time.

Usually, multiple **processes** are involved.

### Example

You are:

* Listening to music
* Using Chrome
* Editing a document

Each application can run as a separate process.

The OS switches the CPU between these processes using **context switching**. 

---

# 5. Multi-Threading

**Multithreading** means dividing one process into multiple threads.

Each thread has its own execution path.

### Example

A browser can have multiple threads handling:

* User input
* Network requests
* Rendering
* Other tasks

Threads belonging to the same process **share the process's memory and resources**. 

---

# 6. Multi-Tasking vs Multi-Threading

| Multi-Tasking                            | Multi-Threading                        |
| ---------------------------------------- | -------------------------------------- |
| Multiple processes are executed          | One process has multiple threads       |
| Processes are context switched           | Threads are context switched           |
| Each process has separate memory         | Threads share the process's memory     |
| Memory isolation exists                  | No memory isolation between threads    |
| Requires CPU switching between processes | Requires CPU switching between threads |
| Generally slower switching               | Generally faster switching             |

Multitasking can work with **1 CPU**, while multithreading is better with **more than 1 CPU/core**. 

---

# 7. Scheduling

* **Process Scheduling:** The OS decides **which process gets CPU time** and when.
* **Thread Scheduling:** The OS decides **which thread gets CPU time** and when. Threads are scheduled based on factors such as priority and are given CPU time slices. 

---

# 8. Context Switching

**Context switching** means stopping the currently running process/thread and switching the CPU to another one.

## Thread Context Switching

The OS:

1. Saves the current thread's state.
2. Switches to another thread of the **same process**.

It does **not** switch the memory address space.

The program counter, registers and stack are still saved/restored. 

### Result

* Faster switching
* CPU cache state is preserved

---

## Process Context Switching

The OS:

1. Saves the current process's state.
2. Switches to another process.
3. Restores the new process's state.

It also involves switching the **memory address space**. 

### Result

* Slower switching
* CPU cache state is flushed 

---

# Revision

```text
Program = Stored on Disk
Process = Program in execution
Thread = Execution path inside a process

Multi-Tasking  → Multiple Processes
Multi-Threading → Multiple Threads

Process switching → Slower
Thread switching  → Faster

Processes → Separate memory
Threads   → Shared memory
```
