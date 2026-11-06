# I/O System Calls

## 1. What is a System Call?

A **system call** is a way for a **user program to request a service from the Operating System (OS)**.

Why do we need it?

A normal application cannot directly perform certain operations because they require **kernel privileges**.

For example, an application may want to:

* Create a file
* Read a file
* Write to a file
* Create a process
* Access a device
* Communicate with another process

For these operations, the application asks the **kernel** through a system call.

### Simple analogy

Think of the **kernel as a security guard**.

```text
User Application
       |
       | "I want to read this file"
       ↓
   System Call
       |
       ↓
     Kernel
       |
       | Performs the operation
       ↓
    Hardware/File
```

The application does not directly access protected resources. It **requests the kernel to do it**.

---

# 2. Example: `mkdir`

Suppose we write:

```bash
mkdir test
```

The application does not directly tell the hard disk:

> "Create a directory called test."

Instead, the request eventually reaches the kernel through system calls.

The basic idea is:

```text
User Application
       ↓
Library / Wrapper
       ↓
System Call Interface
       ↓
Kernel
       ↓
File System
       ↓
Hardware
```

### What is a wrapper?

A **wrapper** is a function that makes it easier for a program to use a system call.

For example, in Linux, a program might use:

```c
mkdir("test", 0755);
```

The `mkdir()` function acts as a convenient interface around the lower-level system-call mechanism.

So remember:

> **Application → Library/Wrapper → System Call → Kernel**

---

# 3. User Mode and Kernel Mode

Modern operating systems generally separate execution into two privilege levels:

### User Mode

Where normal applications run.

Examples:

* Chrome
* VS Code
* Games
* Your C program

Applications have **limited privileges**.

### Kernel Mode

Where the OS kernel runs.

The kernel has much higher privileges and can access:

* Hardware
* Memory management
* File systems
* Devices
* Processes
* Networking, etc.

### Basic picture

```text
+---------------------------+
|       User Mode           |
|                           |
|       User App            |
|          ↓                |
|        Glibc               |
+---------------------------+
|   System Call Interface   |
+---------------------------+
|      Kernel Mode          |
|                           |
|        Kernel             |
|          ↓                |
|       Hardware            |
+---------------------------+
```

---

# 4. How does a System Call work?

Suppose a program wants to **read a file**.

The basic process is:

```text
1. User program calls read()
          ↓
2. Library/wrapper prepares the request
          ↓
3. System call instruction is executed
          ↓
4. CPU switches from User Mode to Kernel Mode
          ↓
5. Kernel performs the requested operation
          ↓
6. Kernel returns the result
          ↓
7. CPU returns to User Mode
```

### Important point

The transition from **User Mode → Kernel Mode** is performed using a controlled mechanism such as a **software-generated trap/exception or syscall instruction**, depending on the architecture.

This is called a **software interrupt**.

For exam purposes, if your professor uses that terminology, remember:

> **System calls provide a controlled entry from user mode into kernel mode.**

---

# 5. Why can't the application do everything itself?

Because allowing applications unrestricted access to hardware would be dangerous.

For example, imagine a normal application could directly:

```text
Delete any file
Access anyone's memory
Control the disk
Modify the OS
Turn off hardware
```

That would be a huge security problem.

Instead:

```text
Application
     ↓
"Kernel, please do this for me."
     ↓
Kernel checks permissions
     ↓
Kernel performs operation
     ↓
Result returned to application
```

So the **kernel acts as a trusted middleman**.

---

# 6. System Calls are implemented in C

Operating system kernels are largely written in **C**, along with some assembly and other languages depending on the OS/kernel.

System calls provide the interface between:

```text
User Programs
      ↕
    Kernel
```

---

# 7. Types of System Calls

There are **5 major categories**:

```text
1. Process Control
2. File Management
3. Device Management
4. Information Maintenance
5. Communication Management
```

Let's understand each one.

---

# 8. Process Control

A **process** is a program that is currently running.

For example:

```text
Chrome running → Process
VS Code running → Process
Your C program running → Process
```

Process-control system calls allow us to manage processes.

### They can:

* Create a process
* End a process
* Load/execute a program
* Wait for another process
* Get/set process attributes
* Allocate/free memory

### Common examples in Unix/Linux

```c
fork()
```

Creates a new process.

```c
exit()
```

Terminates a process.

```c
wait()
```

Waits for a child process.

### Easy way to remember

> **Process Control = Managing running programs**

---

# 9. File Management

These system calls are used to work with files.

They allow us to:

* Create a file
* Open a file
* Read a file
* Write to a file
* Close a file
* Get/set file attributes

For example:

```c
open()
read()
write()
close()
```

### Example

Suppose you want to read:

```text
notes.txt
```

The basic idea is:

```text
open("notes.txt")
       ↓
read()
       ↓
use the data
       ↓
close()
```

### Easy way to remember

> **File Management = Working with files**

---

# 10. Device Management

A **device** can be something like:

* Keyboard
* Mouse
* Printer
* Disk
* Terminal
* Other hardware devices

The OS uses system calls to communicate with devices.

They can:

* Request a device
* Release a device
* Read from a device
* Write to a device
* Get/set device attributes
* Attach/detach devices

### Unix examples

```c
ioctl()
read()
write()
```

### Easy way to remember

> **Device Management = Controlling/communicating with hardware devices**

---

# 11. Information Maintenance

These system calls are used to **get or change information about the system**.

For example:

* Get current time/date
* Set time/date
* Get system information
* Get process information
* Get file information
* Get device information

Examples:

```c
getpid()
```

Gets the current process ID.

```c
sleep()
```

Pauses a process for a specified amount of time.

### Easy way to remember

> **Information Maintenance = Getting or changing system information**

---

# 12. Communication Management

Processes sometimes need to communicate with each other.

For example:

```text
Process A  ←→  Process B
```

System calls can be used to:

* Create communication connections
* Send messages
* Receive messages
* Transfer status information
* Attach/detach remote devices

Examples:

```c
pipe()
```

Creates a pipe for communication between processes.

```c
shmget()
```

Related to creating/accessing shared memory.

### Easy way to remember

> **Communication Management = Processes talking to each other**

---

# 13. Windows vs Unix/Linux System Calls

Different operating systems provide different system-call APIs.

For example:

| Category              | Windows                 | Unix/Linux |
| --------------------- | ----------------------- | ---------- |
| Process Control       | `CreateProcess()`       | `fork()`   |
| Process termination   | `ExitProcess()`         | `exit()`   |
| Wait                  | `WaitForSingleObject()` | `wait()`   |
| File creation/opening | `CreateFile()`          | `open()`   |
| File reading          | `ReadFile()`            | `read()`   |
| File writing          | `WriteFile()`           | `write()`  |
| File closing          | `CloseHandle()`         | `close()`  |
| Device management     | `SetConsoleMode()`      | `ioctl()`  |
| Process information   | `GetCurrentProcessId()` | `getpid()` |
| Sleep                 | `Sleep()`               | `sleep()`  |
| Communication         | `CreatePipe()`          | `pipe()`   |

Don't try to memorize every function immediately.

First remember the **category**.

---

# 14. Most Important Concept

The entire topic can be remembered using this:

```text
              USER MODE
                  |
             User Program
                  |
           Library / Wrapper
                  |
           System Call
                  |
          System Call Interface
                  |
          -------------------
                  |
             KERNEL MODE
                  |
               Kernel
                  |
              Hardware
```

### Example: Reading a file

```text
Program
   |
   | read()
   ↓
System Call Interface
   |
   ↓
Kernel
   |
   ↓
File System
   |
   ↓
Disk
```

The disk is not directly controlled by the user application.

The **kernel does it on behalf of the application**.

---

# 15. Super Easy Memory Trick

Remember the 5 categories as:

### **P F D I C**

```text
P → Process Control
F → File Management
D → Device Management
I → Information Maintenance
C → Communication Management
```

Or think:

> **Processes → Files → Devices → Information → Communication**

---

# Quick Revision

```text
System Call
│
├── Why?
│   └── To request services from the OS kernel
│
├── User Mode
│   └── Normal applications
│
├── Kernel Mode
│   └── OS kernel with privileged access
│
├── Transition
│   └── User Mode → Kernel Mode → User Mode
│
└── Types
    │
    ├── Process Control
    │   └── fork(), exit(), wait()
    │
    ├── File Management
    │   └── open(), read(), write(), close()
    │
    ├── Device Management
    │   └── ioctl(), read(), write()
    │
    ├── Information Maintenance
    │   └── getpid(), sleep()
    │
    └── Communication Management
        └── pipe(), shmget()
```

## The one thing you should understand

**A user application asks. The kernel does.**

For example:

```text
"I want to read a file"
          ↓
       read()
          ↓
    System Call
          ↓
       Kernel
          ↓
   Reads the file
          ↓
    Returns data
          ↓
    User Program
```

Once this flow is clear, the rest of **System Calls** becomes much easier to remember.
