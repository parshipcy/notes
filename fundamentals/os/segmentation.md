# Segmentation: Non-Contiguous Memory Allocation

Let's understand this topic from the basics with simple examples, diagrams, formulas and an exam-ready summary.

## 1. Why do we need segmentation?

First, understand the problem with paging.

Paging: The operating system divides a process into fixed-size blocks called pages.

For example, suppose a program contains:

- Main function
- Addition function
- Subtraction function
- Other functions

Paging divides the program into equal-sized pages, without considering which functions belong together.

Example:

```
          PROGRAM (4 KB)

      +-------------------+
      | Main function     | 2 KB
      +-------------------+
      | Other functions   | 2 KB
      +-------------------+

       Page size = 2 KB

       Page 0 = 2 KB
       Page 1 = 2 KB
```

The problem is that related functions can be divided across different pages.

Segmentation solves this problem by dividing a program according to the user's logical view.

## 2. What is segmentation?

Segmentation is a memory management technique that divides a process into different-sized segments according to their purpose or function.

Examples of segments:

- Main program
- Functions or subroutines
- Stack
- Data
- Symbol table

Each segment has a different size.

Diagram:

```
             PROCESS
     +----------------------+
     | Main Program         | S0
     +----------------------+
     | Addition Function    | S1
     +----------------------+
     | Stack                | S2
     +----------------------+
     | Data                 | S3
     +----------------------+

       Different segment sizes
```

Remember:

- Different segments = Different purposes.
- Different sizes = Variable-sized segments.
- Based on user view = Logical division of the program.

## 3. Logical address in segmentation

This is very important for numerical problems.

In segmentation, a logical address contains TWO things:

```
       LOGICAL ADDRESS

       +---------------+
       | Segment No.   |
       +---------------+
       | Offset        |
       +---------------+

          <s, d>
```

Where:

- s = Segment number: Identifies which segment we want.
- d = Offset: Identifies the position inside that segment.

Example:

```
Logical address = <2, 53>

Segment number = 2
Offset = 53
```

Meaning: We want to access the 53rd byte (position 53) inside segment 2.

## 4. Segment table

The operating system maintains a segment table for each process.

It contains two important values:

| Term  | Meaning                                |
| ----- | -------------------------------------- |
| Base  | Starting physical address of a segment |
| Limit | Maximum size of that segment           |

Example:

```
           SEGMENT TABLE

       +---------+---------+
       | Segment | Limit   |
       |         | Base    |
       +---------+---------+
       |   0     | 1000    |
       |         | 1400    |
       +---------+---------+
       |   1     | 400     |
       |         | 6300    |
       +---------+---------+
       |   2     | 400     |
       |         | 4300    |
       +---------+---------+
       |   3     | 1100    |
       |         | 3200    |
       +---------+---------+
       |   4     | 1000    |
       |         | 4700    |
       +---------+---------+
```

For example, segment 2 has:

- Base = 4300
- Limit = 400

It means segment 2 starts at physical address 4300 and has a size of 400 bytes.

## 5. Address translation (MOST IMPORTANT)

How does the CPU convert a logical address into a physical address?

Remember these two steps:

Step 1: Check the offset

```
Is offset < limit?

       YES              NO
        |                |
        v                v
  Calculate PA       Address Error
```

Step 2: Calculate physical address

Formula:

```
PA = Base + Offset
```

Here, PA means Physical Address.

### Numerical example 1

Given:

```
Logical address = <2, 53>

Segment 2:
Base  = 4300
Limit = 400
```

Step 1: Check validity.

```
53 < 400
```

Valid address.

Step 2: Calculate physical address.

```
PA = 4300 + 53 = 4353
```

Answer: 4353

### Numerical example 2

Given:

```
Logical address = <2, 450>

Segment 2:
Base  = 4300
Limit = 400
```

Check:

```
450 < 400
```

This is FALSE.

Therefore:

```
ADDRESS ERROR (TRAP)
```

Remember: Always check the offset against the limit BEFORE calculating the physical address.

## 6. Hardware diagram of segmentation

Understand the complete process using this diagram.

```
             CPU
              |
              v
       Logical Address
           <s, d>
              |
              v
        +-------------+
        | Segment     |
        | Table       |
        +-------------+
          |       |
          v       v
         Base    Limit
          |       |
          |    Check d < Limit
          |       |
          |   +---+---+
          |   |       |
          |  YES      NO
          |   |       |
          |   v       v
          |  Base + d TRAP
          |   |
          v   v
       Physical Address
              |
              v
        Physical Memory
```

What happens?

1. CPU generates a logical address `<s,d>`.
2. Segment number `s` identifies the segment table entry.
3. The limit is checked against the offset.
4. If valid, base and offset are added.
5. The physical address is generated.
6. If invalid, an addressing error (trap) occurs.

## 7. Fragmentation in segmentation

There are two types of fragmentation.

A. Internal fragmentation

Internal fragmentation means memory is allocated but some space inside the allocated block remains unused.

Your lecture explains this using paging.

Example:

```
Program size = 15 KB
Page size    = 2 KB

Pages required = 8

Total allocated = 8 × 2
                = 16 KB

Actual program  = 15 KB

Unused memory   = 16 - 15
                = 1 KB
```

```
      Last page (2 KB)

   +------------------+
   | Used = 1 KB      |
   +------------------+
   | Empty = 1 KB     |
   +------------------+
```

B. External fragmentation

External fragmentation occurs when free memory is available in separate small blocks instead of one continuous block.

Example:

```
           PHYSICAL MEMORY

       +-------------------+
       | OS                |
       +-------------------+
       | Process A         |
       +-------------------+
       | FREE 2 KB         |
       +-------------------+
       | Process B         |
       +-------------------+
       | FREE 3 KB         |
       +-------------------+
       | Process C         |
       +-------------------+
       | FREE 2 KB         |
       +-------------------+

       Total free = 7 KB
```

Suppose a new segment requires 5 KB.

Although total free memory is 7 KB, we cannot allocate it because there is no single continuous free block of 5 KB.

This is external fragmentation.

Important:

- Segmentation → External fragmentation.
- Paging → Internal fragmentation (possible).

## 8. Advantages of segmentation

1. No internal fragmentation: Segments have variable sizes according to requirements.
2. Contiguous allocation: Each segment is stored continuously in physical memory, making access within a segment efficient.
3. Smaller segment table: Generally, the segment table is smaller than the page table.
4. Better logical organization: Related functions can be kept together in the same segment.

## 9. Disadvantages of segmentation

1. External fragmentation: Free memory gets divided into small scattered blocks.
2. Swapping difficulty: Different-sized segments make swapping more complicated.

## 10. Paging vs Segmentation

| Paging                             | Segmentation                          |
| ---------------------------------- | ------------------------------------- |
| Fixed-size blocks                  | Variable-size blocks                  |
| Divided into pages                 | Divided into segments                 |
| OS-oriented                        | User-oriented                         |
| Logical address: Page no. + Offset | Logical address: Segment no. + Offset |
| Internal fragmentation possible    | External fragmentation possible       |
| Page table                         | Segment table                         |

## 11. Modern architecture

Modern systems may use a combination of paging and segmentation through a hybrid approach.

This combines the logical organization of segmentation with the memory management benefits of paging.
