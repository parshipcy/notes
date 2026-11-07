# Free Space Management

## 1. What is Free Space Management?

When multiple processes are loaded into RAM, some processes may finish their execution and leave memory unused.

The Operating System (OS) must keep track of these empty memory spaces so that it can allocate them to new processes.

Free Space Management is the technique used by the OS to track and allocate available memory.

## 2. External Fragmentation

External fragmentation occurs when free memory is available, but it is divided into several small, non-contiguous blocks.

Example:

Suppose RAM has 16 KB memory.

Initially:

```
          RAM (16 KB)
    +--------------------+ 16 KB
    |                    |
    |      Free: 12 KB   |
    |                    |
    +--------------------+ 4 KB
    |        OS          |
    |       4 KB         |
    +--------------------+ 0 KB
```

Now, processes are loaded into RAM:

```
    +--------------------+ 16 KB
    |        P3          |
    |        2 KB        |
    +--------------------+ 14 KB
    |        P2          |
    |        8 KB        |
    +--------------------+ 6 KB
    |        P1          |
    |        2 KB        |
    +--------------------+ 4 KB
    |        OS          |
    |        4 KB        |
    +--------------------+ 0 KB
```

Now, suppose some processes finish and their memory becomes free.

```
    +--------------------+ 16 KB
    |      Free: 2 KB    |
    +--------------------+ 14 KB
    |        P3          |
    |        8 KB        |
    +--------------------+ 6 KB
    |      Free: 2 KB    |
    +--------------------+ 4 KB
    |        OS          |
    |        4 KB        |
    +--------------------+ 0 KB
```

Here:

- Total free memory = 2 KB + 2 KB = 4 KB.
- A new process P4 requires 3 KB.
- But neither free block is large enough.

Therefore, P4 cannot be allocated even though RAM has 4 KB of total free memory.

External Fragmentation

Definition: External fragmentation occurs when sufficient total free memory exists, but it is scattered across multiple non-contiguous blocks.

## 3. Defragmentation / Compaction

Problem: Free memory is scattered across RAM.

Solution: Compaction.

Compaction is a technique in which the OS moves allocated processes together so that all scattered free spaces become one contiguous block.

It is also called Defragmentation in the context of this lecture.

### Before Compaction

```
          RAM
    +--------------------+ 16 KB
    |      Free: 2 KB    |
    +--------------------+ 14 KB
    |        P3          |
    |        8 KB        |
    +--------------------+ 6 KB
    |      Free: 2 KB    |
    +--------------------+ 4 KB
    |        OS          |
    |        4 KB        |
    +--------------------+ 0 KB
```

Total free memory = 4 KB, but it is scattered.

### After Compaction

The OS moves P3 next to the OS, merging the two free spaces.

```
          RAM
    +--------------------+ 16 KB
    |                    |
    |      Free: 4 KB    |
    |                    |
    +--------------------+ 12 KB
    |        P3          |
    |        8 KB        |
    +--------------------+ 4 KB
    |        OS          |
    |        4 KB        |
    +--------------------+ 0 KB
```

Now, the free memory is contiguous.

A new process requiring 3 KB can be allocated.

```
          RAM
    +--------------------+ 16 KB
    |      Free: 1 KB    |
    +--------------------+ 15 KB
    |        P4          |
    |        3 KB        |
    +--------------------+ 12 KB
    |        P3          |
    |        8 KB        |
    +--------------------+ 4 KB
    |        OS          |
    |        4 KB        |
    +--------------------+ 0 KB
```

Advantages:

- Combines scattered free spaces.
- Reduces external fragmentation.
- Makes it possible to allocate larger processes.

Disadvantage:

- Compaction takes time because the OS must move processes around in memory.
- System efficiency decreases during this operation.

## 4. Free List (Linked List)

Question: How does the OS store or represent free memory spaces?

The OS maintains a Free List, which is a linked list containing information about available memory blocks (free holes).

Example:

Suppose RAM has four free blocks:

```
Free List:

    +------+     +------+     +------+     +------+
    | 2 KB | --> | 5 KB | --> | 3 KB | --> | 8 KB |
    +------+     +------+     +------+     +------+
                                                  |
                                                NULL
```

Here:

- Each node represents a free memory block.
- Each node contains information about the free block.
- The pointer connects one node to the next.
- NULL indicates the end of the list.

Important: The OS uses this list to find a suitable free block when a new process requests memory.

## 5. Memory Allocation Algorithms

Suppose a new process requests 90 KB of memory.

The free list contains:

```
Free List:

    +------+     +-------+     +------+     +-------+     +------+
    | 50 KB| --> | 100 KB| --> | 90 KB| --> | 200 KB| --> | 50 KB|
    +------+     +-------+     +------+     +-------+     +------+
```

The OS uses different algorithms to decide which free block should be allocated.

There are four important algorithms:

1. First Fit
2. Next Fit
3. Best Fit
4. Worst Fit

### A. First Fit

Definition: Allocate the first free block that is large enough to satisfy the process request.

Request = 90 KB.

Free blocks:

```
50 KB → 100 KB → 90 KB → 200 KB → 50 KB
          ↑
       First suitable block
```

Step-by-step:

1. Check 50 KB. Not enough.
2. Check 100 KB. Enough!
3. Allocate 90 KB from the 100 KB block.
4. Remaining free space = 100 - 90 = 10 KB.

After allocation:

```
50 KB → 10 KB → 90 KB → 200 KB → 50 KB
```

Advantages:

- Simple and easy to implement.
- Fast because it stops as soon as it finds a suitable block.

Disadvantage:

\- May leave small unused holes near the beginning of the free list.

### B. Next Fit

Definition: Next Fit is an enhancement of First Fit.

It starts searching from the position where the previous allocation was made, instead of always starting from the beginning.

Example:

Suppose the last allocation happened near the third block.

```
50 KB → 100 KB → 90 KB → 200 KB → 50 KB
                    ↑
              Search starts here
```

Request = 90 KB.

1. Start searching from the third block.
2. The third block has 90 KB.
3. Allocate that block.

Advantages:

- Similar advantages to First Fit.
- Does not always start searching from the beginning.

Disadvantage:

- May skip a suitable block earlier in the list.
- Can still create external fragmentation.

Remember: First Fit starts from the beginning. Next Fit starts from the last allocation position and continues searching, wrapping around if necessary.

### C. Best Fit

Definition: Allocate the smallest free block that is large enough to satisfy the process request.

Request = 90 KB.

```
50 KB → 100 KB → 90 KB → 200 KB → 50 KB
                    ↑
             Best suitable block
```

The available suitable blocks are:

- 100 KB
- 90 KB
- 200 KB

The smallest suitable block is 90 KB.

Therefore, Best Fit allocates the exact 90 KB block.

Remaining memory = 0 KB.

Advantages:

- Minimizes the leftover space in the selected block.
- Can reduce wasted space within the selected allocation.

Disadvantages:

- Must search the entire free list to find the smallest suitable block.
- May create many very small free holes, increasing external fragmentation.
- Slower than First Fit in general.

### D. Worst Fit

Definition: Allocate the largest available free block.

Request = 90 KB.

```
50 KB → 100 KB → 90 KB → 200 KB → 50 KB
                              ↑
                       Largest block
```

The largest block is 200 KB.

Allocate 90 KB from it:

```
200 KB - 90 KB = 110 KB
```

Remaining free list:

```
50 KB → 100 KB → 90 KB → 110 KB → 50 KB
```

Advantages:

- Leaves a relatively large remaining free block.
- That remaining block may accommodate another process.

Disadvantages:

- Must search the entire free list.
- Slower than First Fit.
- Does not eliminate external fragmentation.

## 6. Comparison of All Four Algorithms

For a request of 90 KB:

| Algorithm  | Selected block | Remaining space |
| ---------- | -------------- | --------------- |
| First Fit  | 100 KB         | 10 KB           |
| Next Fit \* | 90 KB          | 0 KB            |
| Best Fit   | 90 KB          | 0 KB            |
| Worst Fit  | 200 KB         | 110 KB          |

\* For Next Fit, this example assumes the search pointer is already at the third block.

| Algorithm | Main idea                            | Speed                  |
| --------- | ------------------------------------ | ---------------------- |
| First Fit | First suitable block                 | Generally fast         |
| Next Fit  | Search from last allocation position | Generally fast         |
| Best Fit  | Smallest suitable block              | Slower, scans the list |
| Worst Fit | Largest suitable block               | Slower, scans the list |

## 7. Internal vs External Fragmentation

### Internal Fragmentation

Memory is wasted inside an allocated block.

Example:

```
Process requires = 7 KB
Allocated block  = 10 KB

    +--------------------+
    |   Process: 7 KB    |
    +--------------------+
    |   Wasted: 3 KB     |
    +--------------------+

Internal fragmentation = 3 KB
```

### External Fragmentation

Memory is wasted because free blocks are scattered outside allocated blocks.

```
    +--------------------+
    |      Free: 2 KB    |
    +--------------------+
    |       Process      |
    +--------------------+
    |      Free: 3 KB    |
    +--------------------+

Total free memory = 5 KB
But no single free block has 5 KB.
```

Remember:

- Internal fragmentation = Wasted space inside allocated memory.
- External fragmentation = Free space scattered between allocated memory blocks.

**Note:** Best Fit minimizes the leftover space in the selected free block. In dynamic partitioning, small leftover holes can still contribute to external fragmentation.
