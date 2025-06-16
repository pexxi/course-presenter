---
template: code
title: "Prompt Example: Complex Algorithm Explanation"
---

# Prompt Example: Complex Algorithm Explanation

## 💬 **Chat Prompt**

```
Explain this sorting algorithm and suggest optimizations:

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
```

<!-- Speaker Notes:
Here's a practical example of using Cursor's chat for algorithm explanation and optimization. This demonstrates how AI can provide educational content and practical improvements.

The prompt is straightforward - I'm asking for both explanation and optimization suggestions for a bubble sort implementation. Notice how I'm including the actual code in the prompt, which gives the AI concrete context to work with.
-->