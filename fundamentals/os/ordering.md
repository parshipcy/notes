# Print in order

### Problem

You are given a class `Foo` with three methods: `first()`, `second()`, and `third()`.

The same instance of `Foo` will be used to call these methods asynchronously. The methods may be called in any order.

Implement a mechanism using JavaScript Promises and `async/await` to ensure that:

1. `second()` executes only after `first()` completes.
2. `third()` executes only after `second()` completes.

Note: We do not know the order in which the methods will be called. Regardless of the calling order, the output must always be:

```
first
second
third
```

### Solution:

```js
class Foo {
    constructor() {
        this.firstPromise = new Promise((resolve) => {
            this.firstDone = resolve;
        });

        this.secondPromise = new Promise((resolve) => {
            this.secondDone = resolve;
        });
    }

    async first(printFirst) {
        printFirst();

        this.firstDone();
    }

    async second(printSecond) {
        await this.firstPromise; // await does not execute the Promise. It waits for the Promise to settle.

        printSecond();

        this.secondDone();
    }

    async third(printThird) {
        await this.secondPromise;

        printThird();
    }
}
```

### Solution Summary

#### 1. Constructor

- `new Foo()` creates a new instance of the `Foo` class.
- The constructor runs automatically when an instance is created.
- `new Promise()` creates a Promise object.
- A Promise represents the completion of an asynchronous operation.
- Initially, a Promise is in the `pending` state.

#### 2. `resolve` function

```
this.firstDone = resolve;
```

- `resolve` is a function provided by the Promise constructor.
- We store it in `this.firstDone` for later use.
- `this.firstDone()` calls that function and changes `firstPromise` to `fulfilled`.
- Similarly, `this.secondDone()` resolves `secondPromise`.

#### 3. `this` keyword

- `this` refers to the current object instance.
- When calling `foo.first()`, `this` inside `first()` refers to `foo`.
- `this.firstPromise` accesses the `firstPromise` property of that instance.
- It does not refer to the `Foo` class itself.

#### 4. `async` keyword

- Declares an asynchronous function.
- An `async` function always returns a Promise.
- It allows us to use `await` inside the function.

#### 5. `await` keyword

- Waits for a Promise to settle.
- If the Promise is pending, only the current async function pauses.
- It does not stop the entire JavaScript program.
- Once the Promise is fulfilled, execution continues after `await`.
- `await` does not execute the Promise. It waits for its result.

#### 6. Execution order

| Method     | What happens                                                            |
| ---------- | ----------------------------------------------------------------------- |
| `first()`  | Prints first, then resolves `firstPromise`.                             |
| `second()` | Waits for `firstPromise`, prints second, then resolves `secondPromise`. |
| `third()`  | Waits for `secondPromise`, then prints third.                           |

#### 7. Important distinction

| Expression                | Meaning                                      |
| ------------------------- | -------------------------------------------- |
| `this.firstPromise`       | Accesses a Promise object.                   |
| `this.firstDone`          | Accesses the stored resolve function.        |
| `this.firstDone()`        | Calls the function and resolves the Promise. |
| `await this.firstPromise` | Waits until the Promise settles.             |

# Dining Philosophers

### Problem

There are 5 philosophers sitting around a circular dining table. Each philosopher alternates between thinking and eating.

There is one fork between every pair of adjacent philosophers, making a total of 5 forks.

To eat, a philosopher needs to pick up both their left and right forks. Each fork can be held by only one philosopher at a time.

#### Requirements

Implement the `DiningPhilosophers` class with the following method:

```
wantsToEat(
    philosopher,
    pickLeftFork,
    pickRightFork,
    eat,
    putLeftFork,
    putRightFork
)
```

Where:

- `philosopher`: The philosopher's ID, from `0` to `4`.
- `pickLeftFork`: Callback indicating that the philosopher picked up the left fork.
- `pickRightFork`: Callback indicating that the philosopher picked up the right fork.
- `eat`: Callback indicating that the philosopher is eating.
- `putLeftFork`: Callback indicating that the philosopher put down the left fork.
- `putRightFork`: Callback indicating that the philosopher put down the right fork.

#### Rules

1. A philosopher must hold both forks before eating.
2. Two philosophers cannot hold the same fork simultaneously.
3. Multiple philosophers should be able to eat simultaneously if they have different forks.
4. The solution must prevent deadlock.
5. All forks must eventually become available again after eating.

#### Example

If philosopher `0` wants to eat:

- Left fork: `0`
- Right fork: `1`

If philosopher `4` wants to eat:

- Left fork: `4`
- Right fork: `0`

Notice that fork `0` is shared between philosophers `0` and `4`.

Objective: Implement the solution using JavaScript Promises, semaphores and mutex synchronization.

### Solution:

```js
// We wrote a separate Semaphore class because JavaScript does not provide a built-in semaphore, so we need to implement its behaviour ourselves.
class Semaphore {
    constructor(count = 1) {
        this.count = count; //how many resources are available.
        this.queue = []; //stores people waiting to acquire the resource
    }

    wait() {
        return new Promise(resolve => {
            if (this.count > 0) { //Check whether a resource is available.
                this.count--; //If available, decrease the counter.
                resolve(); //Resolve the Promise.
            } else {
                this.queue.push(resolve);
                // We put the resolve function into the waiting queue. The Promise remains pending.
                // The person calling await semaphore.wait() cannot continue until that Promise is resolved. This is how waiting works.
            }
        });
    }

    // Now imagine someone has finished using the fork. They need to release it so another philosopher can use it. That's what signal() does.
    signal() {
        if (this.queue.length > 0) { //Check whether someone is waiting
            const next = this.queue.shift(); // Remove the first waiting person //shift() removes and returns the first element of an array.
            next(); //Remember, next contains a resolve function. Calling it resolves the waiting person's Promise.
        } else {
            this.count++; //If nobody is waiting, simply increase the available resource count.
        }
    }
}

class DiningPhilosophers {
    constructor() {
        this.fork = Array.from( //create five separate semaphore objects.
            { length: 5 },
            () => new Semaphore(1)
        );

        // This is another semaphore, but it acts as a mutex. A mutex (mutual exclusion lock) ensures that only one execution flow can enter a particular critical section at a time.
        this.mutex = new Semaphore(1);
    }

    async wantsToEat(
        philosopher, //Philosopher's ID (0 to 4)
        pickLeftFork, //Callback to indicate picking up left fork
        pickRightFork, //Callback to indicate picking up right fork
        eat, //Callback to perform eating
        putLeftFork, //Callback to indicate putting down left fork
        putRightFork //Callback to indicate putting down right fork
    ) {
        const left = philosopher;
        const right = (philosopher + 1) % 5; //Get the next fork, and if we reach the end, return to index 0

        // Before acquiring forks, the philosopher must acquire the mutex. A mutex (mutual exclusion lock) ensures that only one execution flow can enter a particular critical section at a time.
        await this.mutex.wait();

        // Acquire both forks
        try {
            await this.fork[right].wait();
            await this.fork[left].wait();
        } finally {
            this.mutex.signal(); //Only after both operations complete does the philosopher release the mutex.
        }

        // starts eating
        try {
            // These are callback functions passed into wantsToEat()
            await pickLeftFork();
            await pickRightFork();
            await eat();
        } finally { //finishes eating
            // Release left fork
            try {
                await putLeftFork();
            } finally {
                this.fork[left].signal();
            }

            // Release right fork
            try {
                await putRightFork();
            } finally {
                this.fork[right].signal();
            }
        }
    }
}
```

### Solution Summary

1. Semaphore: Controls access to each fork. Each fork has a semaphore initialized with `count = 1`.

2. Mutex: Ensures only one philosopher at a time can acquire their pair of forks.

3. Wait (`wait()`): Acquires a fork if available. Otherwise, the philosopher waits in a queue.

4. Fork Acquisition: The philosopher acquires the right fork first, followed by the left fork.

5. Release Mutex: Once both forks are acquired, the mutex is released so other philosophers can attempt to acquire their forks.

6. Eating: The philosopher picks up both forks and executes the `eat()` callback.

7. Signal (`signal()`): Releases both forks and wakes up waiting philosophers.

8. Deadlock Prevention: The mutex prevents all five philosophers from simultaneously acquiring one fork and waiting for another, eliminating circular wait.
