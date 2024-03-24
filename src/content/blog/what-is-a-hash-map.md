---
title: "What are Hash Tables?"
description: "hash tables explained in Javascript"
pubDate: "11 14 2023"
heroImage: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/p6ac4ss5vVM/upload/935352980792dfadaab55f17e6cc8d11.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp
---

Otherwise known as hash map, hash, and dictionary.

A Hash Table is a data structure that organizes data for **fast lookups;** finding a value for a given key is fast with hash tables on _average_.

A hash table is much like an array, except that it lets you use a special key rather than have to use a sequential index to find a given value.

A hash table goes through a process of making a hash for every key, the key is unique for every value but it will always be the same for the same value. The process is adequately named **hash function**, it takes data and outputs a unique string to identify the value with a key.

The image below shows how a name for a phone book gets "hashed" and assigned a number in the underlying array and or linked lists (hash functions can be very complex, my explanation is quite simplified).

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg/2560px-Hash_table_3_1_1_0_1_0_0_SP.svg.png" align="left"/>

In Javascript, hash tables are usually implemented with an object but you can also use a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) or [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/set).

### So why Care?

Hash Maps have come up a lot in coding interview challenges, are in file systems, password verification, and even compilers.

Here's an example of a code problem where one might use a hash table to solve a coding interview problem:

Given an unsorted integer array, find a pair with the given sum in it.

For instance, if the input is `nums = [8, 7, 2, 5, 3, 1]` and the `target is 10`, the output should be `Pair found [8, 2]` or `Pair found [7, 3]`. However, if the input is `nums = [5, 2, 6, 8, 1, 9]` and the `target is 12`, the output should be `Pair not found`.

One way to solve this problem is to nest for loops to check every possible combination of sums of pairs that equal the target sum.

```javascript
function findPair(nums, target) {
  // intialize nums[i] to 0
  for (let i = 0; i < nums.length - 1; i++) {
    // run through every element in array comparing it to the first
    for (let j = i + 1; j < nums.length; j++) {
      // if the desired sum is found, print the elements
      if (nums[i] + nums[j] == target) {
        console.log(`Found pair  ${nums[i]}, ${nums[j]}`);
        return;
      }
    }
  }
  // if pair is not found after looping through print "pair not found"
  console.log("Pair not found");
}
```

The time complexity for the above algorithm is O(n^2) with no extra space allocated. It doesn't take advantage of a Hash Map and it suffers with exponential growth.

A more efficient approach is to use a Hash table. The runtime can be significantly improved by using this approach.

```javascript
function findPair(nums, target) {
  let numsSeen = new Set();

  for (let i = 0; i < nums.length; i++) {
    // subtract the first nums[i] from the target giving the second number
    // that will equal to the sum
    let desiredSecondNum = target - nums[i];
    // check if the number exists in the Set, if not return
    if (numsSeen.has(desiredSecondNum)) {
      console.log(`Found Pair ${desiredSecondNum}, ${nums[i]}`);
      return;
    }
    numsSeen.add(nums[i]);
  }
  // if pair is not found after looping through print "pair not found"
  console.log("Pair not found");
}
```

The Time complexity for this algorithm is O(n) time.

Summary:

In summary, a Hash table is an excellent alternative to an array when you need to look up values based on a unique key, instead of an index.

Strength:  
Lookups are on average O(1)

Weakness:

The unordered nature of a Hash Table makes for costly lookups if say you're trying to find the largest key O(n)

Hope you found this helpful, happy coding!
![A penguin looking back at the camera after writing code.](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)
