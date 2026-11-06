# Why and What is an Operating System?

## What is an Operating System?

An **Operating System (OS)** is a software layer that sits between the **user/applications and computer hardware**.

It manages the hardware and provides a safe and stable environment for programs to run.

Examples of operating systems:

* Windows
* Linux
* macOS
* Android
* iOS

## Why do we need an OS?

### 1. Resource Management

A computer has limited resources such as:

* CPU
* RAM (Memory)
* Storage
* Network

The OS manages these resources and distributes them among different applications.

For example, if you are running **TikTok, Chrome, and PUBG** at the same time, the OS decides how much CPU and memory each application can use.

Without proper resource management, applications could consume all the resources and cause the system to crash.

### 2. OS as an Interface

The OS acts as a **middle layer between applications/users and hardware**.

Applications do not directly need to deal with complicated hardware operations.

For example:

**Application → Operating System → Hardware**

If an application wants to read a file from storage, it asks the OS. The OS handles the actual interaction with the storage device.

This hides the complexity of hardware from the application developer.

### 3. Isolation and Protection

The OS keeps applications **isolated from each other**.

For example, if PUBG is using a particular area of memory, Chrome should not be able to directly modify that memory.

This prevents:

* One application from corrupting another application
* Accidental memory overwrites
* Malicious access to another program's data
* System crashes

This is called **process isolation/protection**.

### 4. Hiding Hardware Complexity

Hardware is complicated to work with directly.

The OS provides simpler abstractions so applications can work with hardware without knowing all its internal details.

For example, an application can simply ask the OS to:

* Read a file
* Create a process
* Allocate memory
* Send data over a network

The OS handles the underlying hardware details.

## Main Functions of an OS

The major responsibilities of an operating system are:

1. **Resource Management**
   Manages CPU, memory, storage, and other resources.

2. **Interface**
   Provides a way for users and applications to interact with hardware.

3. **Abstraction**
   Hides complicated hardware details behind simpler interfaces.

4. **Protection and Isolation**
   Keeps applications separated and prevents them from interfering with each other.

## Simple Definition

> **An Operating System is software that manages computer hardware and provides a stable, secure environment for running applications.**

### In simple terms

Think of the OS as a **manager** of the computer.

**User / Applications**
↓
**Operating System**
↓
**Hardware**

The OS decides **who gets access to what, how resources are used, and how applications safely interact with the hardware.**
