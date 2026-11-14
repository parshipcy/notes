# Virtual Memory, Demand Paging & Page Faults

## 1. What is Virtual Memory?

**Virtual Memory** is a memory management technique that allows a program to execute even when the entire program is not loaded into RAM.

It gives the user an illusion of having a very large main memory, even when the actual physical memory (RAM) is smaller.

**Simple example:**

Suppose:

- Your program requires 20 KB memory.
- Available RAM is only 12 KB.

Normally, the entire program cannot fit into RAM.

But virtual memory allows the OS to:

- Keep some pages in RAM.
- Keep the remaining pages in secondary memory (disk).
- Load a page into RAM only when required.

This allows programs larger than physical memory to execute.

### Diagram: Virtual Memory

```
           VIRTUAL MEMORY
                  |
         -------------------
         |                 |
      Physical           Disk
      Memory             (Swap Space)
       RAM
         |
    Required pages
    stay in RAM

    Other pages
    stay on disk
```

For a simplified understanding:

```
RAM + Swap Space = Support for Virtual Memory
```

**Remember:**

- Physical memory = Actual RAM.
- Logical/Virtual memory = Memory space seen by a process.
- Swap space = Disk area used to store pages that are not currently in RAM.

## 2. Why do we need Virtual Memory?

Normally, instructions must be present in physical memory (RAM) before the CPU can execute them.

This creates a problem: the size of a program is limited by available RAM.

But in reality, the entire program is not needed at the same time.

For example, a large application may have 100 features, but you might use only 5 features during a particular session.

There is no need to load everything into RAM.

**Benefits:**

1. Programs can be larger than available physical memory.
2. Multiple programs can run simultaneously because each program needs less RAM.
3. CPU utilization and system throughput can increase.

## 3. Demand Paging

**Demand Paging** is a popular method of virtual memory management.

In demand paging, a page is brought into RAM only when it is actually required.

It does not load the entire process into RAM.

**Example:**

Suppose a program has 5 pages:

```
Program
+-------+
| Page 0|
+-------+
| Page 1|
+-------+
| Page 2|
+-------+
| Page 3|
+-------+
| Page 4|
+-------+
```

Initially, suppose only Page 0 and Page 2 are needed.

```
             RAM
        +-----------+
        |  Page 0   |
        +-----------+
        |  Page 2   |
        +-----------+

          DISK
        +-----------+
        |  Page 1   |
        +-----------+
        |  Page 3   |
        +-----------+
        |  Page 4   |
        +-----------+
```

When the CPU requests Page 3, the OS brings Page 3 from disk into RAM.

This is called Demand Paging.

**Important points:**

- Only required pages are loaded.
- Unused pages do not need to be loaded.
- Less RAM is required.
- Swap time and unnecessary disk operations are reduced.

## 4. Lazy Swapper and Pager

Instead of bringing the entire process into RAM, the OS uses a **Lazy Swapper**.

A Lazy Swapper never brings a page into memory until that page is needed.

There are two terms:

| Swapper                      | Pager                        |
| ---------------------------- | ---------------------------- |
| Deals with entire processes. | Deals with individual pages. |
| Swaps complete processes.    | Moves individual pages.      |

**Remember:** Demand Paging works with a Pager because it manages individual pages.

## 5. Valid-Invalid Bit

The OS uses a **Valid-Invalid Bit** in the page table to identify whether a page is currently present in RAM.

There are two values:

| Bit         | Meaning                                                            |
| ----------- | ------------------------------------------------------------------ |
| 1 (Valid)   | Page is legal and present in RAM.                                  |
| 0 (Invalid) | Page is either not present in RAM or is an illegal page reference. |

Important: A bit value of 0 does not always mean the page is illegal. The page might be valid but currently stored on disk.

### **Example: Page Table**

Suppose a process has 8 pages (A to H).

```
Logical Memory       Page Table

                     Frame   Bit
Page 0 : A             4      1
Page 2 : C             -      0
Page 3 : D             6      1
Page 4 : E             -      0
Page 5 : F             -      0
Page 6 : G             -      0
Page 7 : H             9      1
```

Here:

- A, D and H are present in RAM.
- C, E, F and G are not currently in RAM.
- Their pages may be stored in swap space.

Memory representation

```
         PHYSICAL MEMORY (RAM)

         +-------------+
Frame 4  |     A       |
         +-------------+
Frame 6  |     D       |
         +-------------+
Frame 9  |     H       |
         +-------------+


             SWAP SPACE

         +-------------+
         |     B       |
         +-------------+
         |     C       |
         +-------------+
         |     E       |
         +-------------+
         |     F       |
         +-------------+
         |     G       |
         +-------------+
```

**Important:** If a process never accesses a page that is not loaded, it can execute successfully without that page ever being brought into RAM. It means a program does not need all its pages in RAM to execute successfully. It only needs the pages that it actually uses.

## 6. What is a Page Fault?

A **Page Fault** occurs when a process tries to access a page that is not currently present in RAM.

The paging hardware checks the page table.

If the required page has an invalid bit (0), the hardware generates a trap to the OS.

**Example:**

Suppose Page 3 is stored on disk.

```
CPU requests Page 3
        |
        v
   Check Page Table
        |
        v
   Valid bit = 0
        |
        v
    Page Fault
        |
        v
    OS handles it
```

The OS must bring Page 3 into RAM before the process can continue.

**Remember:**

- Page fault does not always mean an error.
- It can simply mean that the required page is currently on disk.
- If the reference is genuinely illegal, the process gets an exception.

## 7. Steps to Handle a Page Fault

### Understanding the Page Fault Diagram

```
                  +--------+
                  |   OS   |
                  +--------+
                      ^
                      | Trap
                      |
CPU ---> Page Table --+
  |          |
  |          | Page not present
  |          |
  |          v
  |       Page Fault
  |
  |                          +------------+
  +------------------------->| Swap Space |
                             +------------+
                                   |
                                   | Read page
                                   v
                             +------------+
                             |    RAM     |
                             | Free Frame |
                             +------------+
                                   |
                                   v
                            Update Page Table
                                   |
                                   v
                            Restart Instruction
```

First, remember one thing:

**A Page Fault occurs when the CPU needs a page that is not currently available in RAM.**

### Understand the diagram first

Imagine:

- A program is running.
- The program needs Page 3.
- Page 3 is stored on the disk (swap space).
- Page 3 is not present in RAM.

The CPU cannot directly execute the instruction until the required page is brought into RAM.

### Understand all 6 steps in the diagram

**Step 1: CPU generates a memory reference**

The CPU executes an instruction such as:

```
LOAD M
```

It means the CPU wants to access memory location M.

The CPU checks the page table to find where the required page is located.

**Step 2: Page Fault (Trap to OS)**

The page table shows:

```
Valid-Invalid Bit = 0
```

This means the page is not currently present in RAM (assuming it is a legal page).

So, the hardware generates a **trap** and transfers control to the Operating System.

Why?

Because the required page must be brought from disk into RAM.

**Step 3: OS checks the backing store (Disk)**

Now the OS handles the page fault.

It checks whether the requested page is legally part of the process.

- If illegal: Generate an exception.
- If legal: Find the page on the backing store (disk).

Backing store means the secondary storage where the missing page is stored.

**Step 4: Bring the missing page into RAM**

The OS finds a free frame in RAM.

Then it copies the required page from disk into that free frame.

Example:

```
BEFORE:

       DISK                  RAM
    +---------+          +---------+
    | Page 3  |          | Page 0  |
    +---------+          +---------+
                         | Page 1  |
                         +---------+
                         | Free    |
                         | Frame   |
                         +---------+


AFTER:

       DISK                  RAM
    +---------+          +---------+
    |         |          | Page 0  |
    +---------+          +---------+
                         | Page 1  |
                         +---------+
                         | Page 3  |
                         +---------+
```

Now Page 3 is available in RAM.

**Step 5: Update the Page Table**

After loading Page 3 into RAM, the OS updates the page table.

For example:

Before:

```
Page     Frame     Bit
  0        2        1
  1        4        1
  3        -        0
```

After:

```
Page     Frame     Bit
  0        2        1
  1        4        1
  3        5        1
```

Notice:

- Page 3 is now stored in Frame 5.
- Its valid-invalid bit changes from 0 to 1.

This tells the CPU that Page 3 is now present in RAM.

**Step 6: Restart the interrupted instruction**

Remember Step 1?

The CPU was trying to execute:

```
LOAD M
```

But it was interrupted because of the page fault.

Now that Page 3 is in RAM and the page table is updated, the OS restarts that instruction.

This time, the CPU successfully accesses the required memory location.

Page Fault Handled

### Complete diagram in simple text format

```
         CPU requests a page
                 |
                 v
          (1) Memory Reference
                 |
                 v
            Check Page Table
                 |
                 v
          Valid-Invalid Bit = 0
                 |
                 v
          (2) Page Fault / Trap
                 |
                 v
             Operating System
                 |
                 v
       (3) Check Backing Store
                 |
                 v
          Is reference valid?
             /       \
           No         Yes
           |           |
           v           v
       Exception   (4) Find Free Frame
                       |
                       v
                 Read page from Disk
                       |
                       v
                   Load into RAM
                       |
                       v
                (5) Update Page Table
                    Bit = 1
                       |
                       v
               (6) Restart Instruction
                       |
                       v
                 CPU continues
                   execution
```

### Where does everything happen?

| Component     | Location                       |
| ------------- | ------------------------------ |
| CPU           | Processor                      |
| OS            | Kernel in RAM, executed by CPU |
| Page Table    | RAM                            |
| PCB           | RAM (OS data)                  |
| Free Frame    | RAM                            |
| Required Page | Disk (Swap Space)              |

#### **Page Fault Handling: 6 Steps**

```
1. CPU requests a page.
       |
2. MMU detects missing page.
   Page Fault (Trap to OS)
       |
3. OS checks PCB and locates
   the page on Disk.
       |
4. OS finds a Free Frame in RAM
   and loads the page from Disk.
       |
5. OS updates Page Table
   (Frame number, Bit = 1).
       |
6. CPU restarts the interrupted
   instruction.
```

- **Disk:** Provides the missing page.
- **RAM:** Stores the missing page.
- **OS:** Manages the entire process.
- **CPU:** Restarts execution.

## 8. Pure Demand Paging

**Pure Demand Paging** is an extreme form of demand paging.

In this method, the OS starts executing a process without loading even a single page into RAM.

Pages are loaded only when they are actually required.

**Example:**

Suppose a program contains Page 0, Page 1 and Page 2.

Initially:

```
RAM = EMPTY

Page 0 ---- DISK
Page 1 ---- DISK
Page 2 ---- DISK
```

The OS starts executing the program.

The instruction pointer points to the first instruction, which is in Page 0.

But Page 0 is not in RAM.

Therefore:

```
Execute Page 0
      |
      v
Page Fault
      |
      v
Load Page 0 into RAM
      |
      v
Restart instruction
      |
      v
Continue execution
```

When Page 1 is needed, it is loaded in the same way.

**Remember:** Never bring a page into memory until it is required.

It is particularly useful when:
1. A program is very large.
2. Only a small portion of the program is needed initially.
3. RAM is limited.
4. Multiple processes need to share available physical memory.

## 9. Locality of Reference

Locality of Reference helps demand paging achieve reasonable performance.

It means a process tends to access the same pages or nearby pages repeatedly within a short period.

Two simple ideas:

- Temporal locality: Recently accessed data or instructions may be accessed again soon.
- Spatial locality: Nearby memory locations may be accessed soon.

This helps demand paging because only a relatively small set of pages may be needed frequently.

## 10. Advantages of Virtual Memory

1. **Increases degree of multiprogramming:** More processes can run simultaneously because each process needs less physical memory.
2. **Runs large applications:** Programs larger than available RAM can execute.
3. **Better memory utilization:** Only required pages are loaded into RAM.
4. **Improved CPU utilization and throughput:** More processes can remain available for execution.

## 11. Disadvantages of Virtual Memory

1. **Slower execution:** Disk access and swapping take more time than RAM access.
2. **Thrashing:** Excessive page faults cause the system to spend too much time moving pages between RAM and disk instead of executing processes.

### What is Thrashing?

Suppose RAM is very small and a process constantly needs pages that are not currently present.

```
Page Fault
    |
    v
Load Page from Disk
    |
    v
Another Page Fault
    |
    v
Load Another Page
    |
    v
Again Page Fault
    |
    v
Continuous Disk I/O
```

The system spends most of its time swapping pages rather than doing useful work.

This condition is called **Thrashing**.
