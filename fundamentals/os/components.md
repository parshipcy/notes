# Components of Operating System

An **Operating System (OS)** acts as a bridge between the **user/application software** and the **computer hardware**.

The two important parts discussed here are:

1. **Kernel**
2. **User Space**

---

# 1. Kernel

The **kernel** is the core part of an Operating System that directly interacts with hardware and performs important system-level operations.

Think of the kernel as the **manager of the computer**.

```text
User
  ↓
Applications
  ↓
User Space
  ↓
Kernel
  ↓
Hardware
```

### Important points

* Kernel is the **heart/core of the OS**.
* It is one of the **first parts of the OS loaded during startup**.
* Applications normally cannot directly access hardware.
* The kernel provides controlled access to hardware.

### Example

Suppose Chrome wants to save a downloaded file.

Chrome cannot simply tell the hard disk:

> "Write these bytes here."

Instead:

```text
Chrome
   ↓
Operating System
   ↓
Kernel
   ↓
Storage Driver
   ↓
SSD/HDD
```

The kernel manages the request and communicates with the hardware.

---

# 2. User Space

**User space** is the area where normal applications run.

Applications do **not** have privileged/direct access to hardware. They interact with the kernel when they need system resources.

Examples:

* Chrome
* VS Code
* Spotify
* Games
* Python programs

### Why do applications not directly access hardware?

Because allowing every application to directly access hardware would be dangerous.

For example, imagine two programs directly modifying the same memory location:

```text
Program A → Memory
Program B → Same Memory
```

They could interfere with each other and potentially crash the system.

The kernel provides **protection and controlled access**.

## GUI and CLI

User space provides different ways for users to interact with the OS.

### GUI

**GUI = Graphical User Interface**

Users interact using:

* Windows
* Icons
* Buttons
* Menus
* Mouse

Example:

```text
Windows Desktop
Ubuntu Desktop
macOS
```

### CLI

**CLI = Command Line Interface**

Users interact by typing commands.

Example:

```bash
mkdir project
cd project
ls
```

The commands are received and executed through a **shell**.

---

## Shell

A **shell** is a command interpreter.

Its job is to:

```text
User enters command
        ↓
Shell receives command
        ↓
Shell interprets it
        ↓
OS executes it
```

Example:

```bash
mkdir project
```

The shell interprets the command and requests the OS to create the directory.

### Important distinction

**CLI is the interface.**

**Shell is the program that interprets commands.**

Examples of shells:

```text
Bash
Zsh
PowerShell
```

---

# Functions of Kernel

The kernel mainly performs four important types of management:

1. Process Management
2. Memory Management
3. File Management
4. I/O Management

---

## 1. Process Management

A **process** is a program that is currently executing.

For example:

```text
Chrome.exe → Process
Spotify.exe → Process
VS Code → Process
```

The kernel manages these processes.

### Main responsibilities

### 1.1 CPU Scheduling

The CPU can execute only a limited number of instructions at a time.

Suppose three processes are running:

```text
P1 → Chrome
P2 → Spotify
P3 → VS Code
```

The kernel decides **which process gets CPU time and when**.

This is called **CPU scheduling**.

```text
CPU
 ↓
P1 → P2 → P3 → P1 → P2 ...
```

This makes multitasking possible.

---

### 1.2 Creating and Deleting Processes

The kernel can create and terminate processes.

Example:

When you open Chrome:

```text
You click Chrome
       ↓
OS creates process
       ↓
Chrome starts running
```

When you close Chrome:

```text
Chrome process
      ↓
Terminated
      ↓
Resources released
```

---

### 1.3 Suspending and Resuming Processes

Sometimes a process does not need the CPU temporarily.

The OS can:

```text
Running
   ↓
Suspended
   ↓
Resumed
   ↓
Running
```

This helps the OS manage CPU resources efficiently.

---

### 1.4 Process Synchronization and Communication

Processes sometimes need to work together.

For example:

```text
Process A → produces data
Process B → consumes data
```

They need mechanisms to coordinate and communicate.

This leads to concepts such as:

* Synchronization
* Inter-Process Communication (IPC)

---

## 2. Memory Management

The kernel manages the computer's main memory (RAM).

Its major responsibilities include:

* Allocating memory
* Deallocating memory
* Tracking which memory is being used
* Tracking which process is using it

### Example

Suppose you open:

```text
Chrome → 2 GB
VS Code → 1 GB
Spotify → 500 MB
```

The OS keeps track of the memory assigned to each process.

```text
RAM
+----------------+
| Chrome  2 GB   |
+----------------+
| VS Code 1 GB   |
+----------------+
| Spotify 500 MB |
+----------------+
| Free Memory    |
+----------------+
```

### Why is this necessary?

Without memory management, applications could overwrite each other's memory.

That could cause:

* Data corruption
* Application crashes
* System instability

---

## 3. File Management

The kernel also manages files and directories.

Its responsibilities include:

* Creating files
* Deleting files
* Creating directories
* Deleting directories
* Mapping files to secondary storage
* Supporting backups

### Example

When you execute:

```bash
mkdir project
```

the OS creates a directory.

When you execute:

```bash
rm file.txt
```

the OS handles the deletion.

The kernel ultimately coordinates these operations with the storage device.

---

## 4. I/O Management

**I/O = Input/Output**

I/O means communication between the computer and devices.

Examples:

```text
Keyboard → Input
Mouse → Input
Microphone → Input

Monitor → Output
Printer → Output
Speaker → Output
```

The kernel manages and controls these I/O operations.

Three important concepts are:

1. Buffering
2. Caching
3. Spooling

---

### Buffering

**Buffering** temporarily stores data while it is being transferred.

#### Example: YouTube

Suppose your internet connection is slightly slower than the rate at which the video is being played.

YouTube downloads some video data in advance:

```text
Internet
   ↓
Buffer
   ↓
Video Player
```

The buffer stores data temporarily so playback can continue smoothly.

#### Why buffering?

Because the producer and consumer may operate at different speeds.

#### Spooling

**Spooling** is useful when dealing with jobs involving devices that operate at different speeds.

Examples such as:

* Print spooling
* Mail spooling

#### Example: Printing

Suppose five applications want to print documents.

The printer is slower than the applications.

Instead of making every application wait:

```text
Application 1 ─┐
Application 2 ─┤
Application 3 ─┼──→ Print Queue → Printer
Application 4 ─┤
Application 5 ─┘
```

The jobs are placed in a queue and processed by the printer one by one.

#### Why spooling?

It allows a fast producer to continue working while a slower device processes the queued jobs.

---

### Caching

A **cache** stores frequently needed data so that it can be accessed faster next time.

Examples:

* CPU cache
* Memory cache
* Web cache

#### Example

Suppose a website loads an image.

Instead of downloading the same image every time:

```text
First request
Internet → Cache → Browser

Later request
Cache → Browser
```

The second access can be faster.

#### Main idea

```text
Cache = keep frequently used data closer/faster
```

---

# Types of Kernels:

## 1. Monolithic Kernel

In a **monolithic kernel**, most OS functions run inside the kernel.

For example:

```text
+-------------------------+
|         Kernel          |
|                         |
| Process Management      |
| Memory Management       |
| File Management         |
| I/O Management          |
+-------------------------+
```

### Advantages

**1. High performance**

Components communicate directly within kernel space, so there is less overhead from switching between user mode and kernel mode.

**2. Fast communication**

Since more functionality is inside the kernel, communication between components can be fast.

### Disadvantages

**1. Large kernel**

The kernel becomes bulky.

**2. Higher memory requirement**

More functionality needs to be loaded into kernel space.

**3. Less reliable**

If a critical kernel component crashes, it can potentially bring down the entire system.

### Examples

* Linux
* Unix
* MS-DOS

---

## 2. Microkernel

A **microkernel** keeps only the most essential functionality inside the kernel.

For example:

```text
+-----------------------+
|      Kernel Space     |
|                       |
| Process Management    |
| Memory Management     |
+-----------------------+

+-----------------------+
|      User Space       |
|                       |
| File Management       |
| I/O Management       |
+-----------------------+
```

### Advantages

**1. Smaller kernel**

Less functionality is inside kernel space.

**2. More reliable**

A failure in a user-space service is less likely to crash the entire kernel.

**3. More stable**

The design provides better separation between components.

### Disadvantage

**Performance can be slower.**

Why?

Because components may need to communicate through **user mode ↔ kernel mode** transitions and IPC.

```text
User Space
    ↓
Kernel Space
    ↓
User Space
```

These transitions introduce overhead.

### Examples

* L4
* Symbian OS
* MINIX

---

## 3. Hybrid Kernel

A **hybrid kernel** combines ideas from both monolithic and microkernel designs.

The goal is to get:

```text
Performance of Monolithic
          +
Modularity/Stability of Microkernel
```

### General idea

Some components remain in kernel space for performance, while other components can be separated to improve modularity.

### Advantages

* Good performance
* Better modularity
* Better stability than a purely monolithic design
* Reduced communication overhead compared with a pure microkernel approach

### Examples

* macOS
* Windows NT
* Windows 7
* Windows 10

---

## Kernel Types: Quick Comparison

```text
Monolithic
    ↓
Large kernel
More functionality inside
Fast
Less isolated

Microkernel
    ↓
Small kernel
Only essential functions
More modular/stable
More communication overhead

Hybrid
    ↓
Combination
Attempts to balance performance + modularity
```

---

## User Mode vs Kernel Mode

A computer generally separates execution into different privilege levels.

### User Mode

Normal applications run here.

```text
Chrome
VS Code
Spotify
Python Program
```

They have **limited access** to hardware.

### Kernel Mode

The kernel runs here.

It has **privileged access** to system resources and hardware.

```text
Kernel
 ↓
CPU
RAM
Disk
I/O Devices
```

### Why separate them?

For **security and stability**.

Imagine a normal application could directly modify any RAM address.

A buggy application could accidentally overwrite important OS data.

So:

```text
Application
    ↓
Limited privileges
    ↓
Kernel
    ↓
Privileged hardware access
```

---

## How Do Processes Communicate With Each Other?

Using **IPC (Inter-Process Communication)**.

Two processes normally have:

* Independent memory spaces
* Memory protection

But sometimes they need to communicate.

Two mechanisms mentioned are:

1. **Shared Memory**
2. **Message Passing**

---

## Shared Memory

Two processes communicate using a shared region of memory.

```text
Process A
    ↓
+------------------+
| Shared Memory    |
+------------------+
    ↑
Process B
```

Both processes can access the shared area.

### Advantages

**1. Fast**

Processes can communicate through memory directly, so it can be faster than message passing, especially for large amounts of data.

**2. Efficient for large data**

Instead of repeatedly copying large data into messages, processes can work with a shared memory region.

**3. Less communication overhead**

Once the shared memory is established, accessing it can be relatively efficient.

### Disadvantages

**1. Synchronization is required**

This is the big disadvantage.

Imagine:

```text
Process A → writes "100"
Process B → reads at the same time
```

What happens if both access the shared data simultaneously?

You can get inconsistent or incorrect results.

Therefore, mechanisms such as **mutexes, semaphores, or locks** may be needed.

---

## Message Passing

Instead of sharing memory, processes send messages to each other.

```text
Process A
    |
    | Message
    ↓
Process B
```

Example:

```text
Process A: "Here is the data."
Process B: "Received."
```

### Advantages

1. **Better isolation**

   * Processes keep their own memory.
   * One process cannot directly modify another process's memory.
   * This improves safety.

2. **Easier to manage**

   * Processes communicate through clearly defined `send()` and `receive()` operations.
   * You don't need to manage a common memory area.

3. **Works well between independent processes**

   * Useful when processes are running separately but still need to exchange information.

### Disadvantages

1. **Slower than shared memory**

   * Data has to be transferred through messages.
   * This creates communication overhead.

2. **More kernel involvement**

   * The OS/kernel generally has to manage the sending and receiving of messages.
   * This can involve mode switches and copying data.

3. **Not ideal for large amounts of data**

   * If a large amount of data has to be repeatedly transferred, copying messages can become expensive.
