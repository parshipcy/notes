# What Happens When You Turn On Your Computer?

When you press the power button, the computer goes through a process called the **boot process**.

The main idea is:

```text
Power On
   ↓
CPU Starts
   ↓
BIOS / UEFI
   ↓
POST
   ↓
Find Bootloader
   ↓
Bootloader
   ↓
Kernel
   ↓
User Space
   ↓
Operating System Ready
```

---

## 1. Power On

When you press the power button:

* The power supply provides power to the computer's components.
* The **CPU starts executing instructions**.
* But the CPU needs some initial instructions to know what to do.

Those initial instructions come from **firmware**.

---

# 2. BIOS / UEFI Starts

The firmware is stored in non-volatile memory on the motherboard.

There are two important terms:

### BIOS

**BIOS = Basic Input/Output System**

* Traditional PC firmware.
* Initializes hardware.
* Performs basic hardware checks.
* Finds a bootable device.
* Starts the bootloader.

### UEFI

**UEFI = Unified Extensible Firmware Interface**

* Modern replacement for traditional BIOS.
* Performs the same basic boot-related job but has more capabilities.
* Can access filesystems and locate bootloader files.
* Supports features such as **Secure Boot**.

> Modern computers generally use **UEFI** rather than traditional BIOS.

---

# 3. POST

After the firmware starts, it performs **POST**.

**POST = Power-On Self-Test**

POST checks whether important hardware is available and working.

For example:

```text
CPU       → Is it working?
RAM       → Is memory available?
Keyboard  → Is it detected?
Storage   → Can the disk be accessed?
GPU       → Can basic display output work?
```

If there is a serious hardware problem, the boot process may stop.

For example:

```text
Computer starts
      ↓
POST
      ↓
RAM not detected
      ↓
Error
      ↓
Boot stops
```

### Important

POST happens **before the operating system starts**.

At this point:

```text
BIOS / UEFI  → Running
Windows      → Not running
Linux        → Not running
Kernel       → Not running
Applications → Not running
```

---

# 4. Firmware Checks Boot Configuration

The firmware has a **boot order** that tells it where to look for something that can start the operating system.

Example:

```text
Boot Order:

1. SSD
2. USB Drive
3. Network
```

The firmware checks these devices according to the configured order.

---

# 5. Firmware Finds the Bootloader

The firmware needs to find a small program called the **bootloader**.

There are two common boot approaches.

## Traditional BIOS Boot

Traditional BIOS systems commonly use the **MBR**.

**MBR = Master Boot Record**

It is located at the beginning of a disk and contains boot code.

Simplified:

```text
Disk
┌─────────────────────┐
│ MBR                 │
│ Boot Code           │
├─────────────────────┤
│ Partition           │
├─────────────────────┤
│ Operating System    │
└─────────────────────┘
```

The BIOS loads the boot code from the MBR and starts the bootloader.

---

## Modern UEFI Boot

Modern computers generally use UEFI.

UEFI can locate bootloader files from a special partition called the:

**EFI System Partition (ESP)**

Simplified:

```text
Disk
┌────────────────────────────┐
│ EFI System Partition       │
│                            │
│ Bootloader files           │
├────────────────────────────┤
│ Windows / Linux            │
│                            │
│ Operating System           │
└────────────────────────────┘
```

So remember:

```text
Traditional:
BIOS → MBR → Bootloader

Modern:
UEFI → EFI System Partition → Bootloader
```

> UEFI systems commonly use GPT, while traditional BIOS systems commonly use MBR. However, BIOS/UEFI and MBR/GPT are not exactly the same thing, so don't treat them as strict one-to-one pairs.

---

# 6. Bootloader Takes Control

Once the firmware finds the bootloader, it transfers control to it.

The **bootloader** is a small program whose main job is to start the operating system.

Think of it as a bridge:

```text
Firmware
    ↓
Bootloader
    ↓
Operating System
```

Examples:

| Operating System | Bootloader / Boot Component |
| ---------------- | --------------------------- |
| Windows          | Windows Boot Manager        |
| Linux            | GRUB is commonly used       |
| macOS            | Apple's boot components     |

---

# 7. Bootloader Loads the Kernel

The bootloader finds the operating system's **kernel** and loads it into RAM.

Then it gives control to the kernel.

```text
Bootloader
    ↓
Find Kernel
    ↓
Load Kernel into RAM
    ↓
Start Kernel
```

---

# 8. What Is the Kernel?

The **kernel is the core of the operating system**.

It manages communication between software and hardware.

For example:

```text
Applications
     ↓
Operating System
     ↓
Kernel
     ↓
Hardware
```

The kernel manages things such as:

* CPU
* Memory
* Processes
* Devices
* Filesystems
* Networking
* Security
* System calls

---

# 9. Kernel Initializes the Operating System

After the kernel starts, it initializes the rest of the operating system.

For example:

```text
Kernel
  ↓
Memory Management
  ↓
Process Management
  ↓
Device Drivers
  ↓
Filesystem
  ↓
Networking
  ↓
System Services
```

The kernel also starts important system processes and services.

---

# 10. User Space Starts

Operating systems generally separate execution into two major areas:

## Kernel Space

The kernel runs here with highly privileged access to the system.

```text
Kernel
Drivers
Memory Management
Process Management
```

## User Space

Normal applications run here with restricted privileges.

Examples:

```text
Chrome
VS Code
Spotify
Games
Terminal
```

Simplified:

```text
┌───────────────────────────┐
│        USER SPACE         │
│                           │
│ Chrome                    │
│ VS Code                   │
│ Games                     │
│ Other Applications        │
└─────────────┬─────────────┘
              │
         System Calls
              ↓
┌───────────────────────────┐
│       KERNEL SPACE        │
│                           │
│ Process Management        │
│ Memory Management         │
│ Device Drivers            │
│ Filesystem                │
│ Networking                │
└─────────────┬─────────────┘
              ↓
          HARDWARE
```

Eventually, the login screen or desktop appears.

Now the computer is ready to use.

---

# Complete Boot Process

The complete process can be remembered as:

```text
1. Power On
       ↓
2. CPU Starts
       ↓
3. BIOS / UEFI Starts
       ↓
4. POST
       ↓
5. Firmware Finds Bootable Device
       ↓
6. Bootloader Starts
       ↓
7. Bootloader Loads Kernel
       ↓
8. Kernel Initializes Operating System
       ↓
9. User Space and System Services Start
       ↓
10. Login Screen / Desktop
       ↓
11. Computer Ready
```

---

# Important Terms

## Firmware

Low-level software stored in non-volatile memory that helps initialize hardware and start the boot process.

Examples:

* BIOS
* UEFI

---

## BIOS

**Basic Input/Output System**

Traditional PC firmware used to initialize hardware and start the boot process.

---

## UEFI

**Unified Extensible Firmware Interface**

Modern firmware interface used to initialize hardware and locate and start bootloaders.

---

## POST

**Power-On Self-Test**

A hardware check performed by the firmware when the computer starts.

---

## Bootloader

A program responsible for starting the operating system, especially by loading its kernel.

Examples:

* Windows Boot Manager
* GRUB

---

## Kernel

The core part of an operating system.

It manages:

* CPU
* Memory
* Processes
* Devices
* Filesystems
* Networking

---

## User Space

The area where normal applications and many operating-system services run.

---

## MBR

**Master Boot Record**

A traditional disk structure located at the beginning of a disk. It can contain boot code used during traditional BIOS booting.

---

## EFI System Partition

A special partition used by UEFI systems to store bootloader files.

---

# Easy Analogy

Think of the computer like a company.

```text
Power Button
     ↓
Open the company
     ↓
BIOS / UEFI
"Let's get everything ready."
     ↓
POST
"Is all the important equipment working?"
     ↓
Bootloader
"Let's start the manager."
     ↓
Kernel
"Now I'll manage the entire system."
     ↓
User Space
"Employees can now do their work."
```

So:

* **BIOS/UEFI** → Starts and prepares the computer
* **POST** → Checks hardware
* **Bootloader** → Starts the OS
* **Kernel** → Runs and manages the OS
* **User Space** → Runs normal applications
