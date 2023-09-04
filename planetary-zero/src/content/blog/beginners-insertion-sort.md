---
title: "Understanding Insertion Sort for beginners"
description: "Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro."
pubDate: "9 16 2022"
---

# How to do Insertion Sort for beginners in JS

If you don't know what insertion sort is I recommend giving it a try at the problem for 10 minutes then come back or just check out how to implement it.

Here is Free Code Camps explanation: This method works by building up a sorted array at the beginning of the list. It begins the sorted array with the first element. Then it inspects the next element and swaps it backwards into the sorted array until it is in sorted position. It continues iterating through the list and swapping new items backwards into the sorted portion until it reaches the end. This algorithm has quadratic time complexity in the average and worst cases. [Insertion Sort Problem](https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/implement-insertion-sort) here are the instructions from Free Code Camp

Instructions: Write a function insertionSort which takes an array of integers as input and returns an array of these integers in sorted order from least to greatest.

Insertion Sort is a quadratic algorithm meaning its O(n^2) making it a bad algorithm for production as it can cause performance issues. That being said I think its a nice algo to learn to practice solving coding interview questions.

This algo is also known as destructive as it operates on the array that is passed in on the function.

## The code

```plaintext
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let numberToInsert = array[i];
    let j;
    for (j = i - 1; array[j] > numberToInsert && j >= 0; j--) {
      array[j + 1] = array[j];
    }
    array[j + 1] = numberToInsert;
  }
  return array;
}
// commented
function insertionSort(array) {
    // We make a double for loop
    // Notice the index starts at 1 leaving index 0 as the sorted array
    for(let i = 1; i < array.length; i++){
        // the number to insert will always be the number we currently are on in this loop
        let numberToInsert = array[i]
         // We also initialize j
        let j;
        // does the insertion when either array[j] > numberToInsert or j >= 0 // j  >= 0 is checking if j every goes out of bounds if it is we shouldn't keep moving things to the right
        for(j = i - 1; array[j] > numberToInsert && j >= 0; j--){
          // moves the number to the right
          array[j + 1] = array[j]
        }
        // does the insertion
        array[j + 1] = numberToInsert

    }
    return array
  }
```

## Explanation

We will start with this array to sort `[1|3,-1,5,6]`

**Everything to the left of the pipe character is assumed to be the sorted array everything to the right is the unsorted.**

```plaintext
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let numberToInsert = array[i];
    let j;
    for (j = i - 1; array[j] > numberToInsert && j >= 0; j--) {
      array[j + 1] = array[j];
    }
    array[j + 1] = numberToInsert;
  }
  return array;
}
```

### First iteration of outer loop

The whole point or jist of Insertion sort is that we assume we have a sorted half and a unsorted half and go from there.

`let array = [1|3,-1,5,6]`

#### First iteration of inner loop

If we passed in this loop the very first iteration would look like the array above. We are choosing index zero to be sorted and assuming the right side is unsorted.

We then ask if `array[0] > numberToInsert && j >= 0 // this is false`

So we move out of the loop and insert, now 3 is part of the sorted array

`[1,3|-1,5,6]`

### Second iteration of outer loop

Now numberToInsert = array\[2\] and j is going to equal 1

#### First iteration of inner loop

`[1,3|-1,5,6]`

We then ask if `array[1] > NumberToInsert && j >= 0 // this is true`

So we move to the array\[j\] one to the right

`[1, |3,5,6]` // notice array\[1\] is now empty

#### Second iteration of inner loop

We then ask if `array[0] > NumberToInsert && j >= 0 // this is true`

so we move to the array\[0\] to the right

`[ ,1,3,5,6]` // notice array\[0\] is now empty

#### Third iteration of inner loop

We then ask if `array[-1] > NumberToInsert && j >= 0 // this is false`

j is not &gt;= 0 so we don't do anything and move on from the loop

we do the insertion

`[-1,1|3,5,6]`

### Third iteration of outer loop

Now numberToInsert = array\[3\] and j is going to equal 2

#### First Iteration of inner loop

`[-1,1,3|5,6]` // notice the array is already sorted but insertion sort doesn't know that

We then ask if `array[2] > NumberToInsert && j >= 0 // this is false`

So we insert at 5, 5 is already there

`[-1,1,3,5|6]`

now the array looks like that^

// the last iteration of the is going to look very similarly as this iteration.

**Comment any questions and let me know how I can improve my explanation. This algo took me longer to understand than I thought it would so if your struggling know I did too!**

## Resources and Others:

Great explanation from Brain Holt on his Frontend Masters course website includes an explanation of the big o complexity for this algorithm [Insertion Sort Problem](https://btholt.github.io/complete-intro-to-computer-science/insertion-sort)

Also take a look at a visualization at [7 VisuAlgo.net](https://visualgo.net/en/sorting)
