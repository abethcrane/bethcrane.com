---
layout: post
title:  "Eertree (Palindrome Trees)"
date:   2019-01-21
categories: [Software]
tags: [Algorithms]
summary: Finding the longest palindrome in a word with a data structure called an 'eertree'. What's not to love?
---
It's a 3-day weekend here in the US of A, so what better way to spend it than learning about new and exciting data structures?

(Rhetorical question!)

A naïve way to find the longest palindromic substring of an input string is to start from every possible center-of-a-palindrome and work outwards, adding the next letter from each side until those letters aren't equal. The center could either be a letter, or it could be in between 2 letters - so for string of length *n* there will be *2n + 1* centers. This makes our naïve approach O(n^2). Not a terrible first stab, but we can do better.

Palindrome Trees do this in O(n) (technically quasilinear, but we dutifully ignore constants with big O notation). They're not the first algorithm to do so - [Manacher's Algorithm][manacher][^1] is from 1975 - but they're proposed as an improvement with smaller space usage.

What's neat about Palindrome Trees is that they're super new - the [paper][paper] just came out in 2015, and I could only find a handful of blogs about them (between [Geeks for Geeks post][blog1] and [Adilet's post][blog3] it was pretty easy to get up to speed, but I appreciated [Alessio's post][blog2] for pointing me to the academic paper[^2]). I saw a number of C/++ versions, and Alessio's Java solution, so I thought I'd try my hand at a python one, just for fun.

The code's up in [my first ever gist][gist], but this also seemed like a good excuse to add syntax highlighting to this website (via Rouge), so in celebration:

{% highlight python %}
debug_prints = False

class PalindromeTreeNode:
    # Important to note: we don't use start_index and end_index much
    # Because if this node is 'bb' and our string is 'abbacabbac' we'll see 'bb' twice
    # So we use the length to calculate where in the full string the start index would be
    # Each time we run across this node
    # The start and end indices are useful for printing out this node though
    start_index = 0
    end_index = 0
    length = 0
    suffix_index = 0
    node_index = 0
    # Any palindrome can have up to 26 child palindromes
    # e.g. aPALINDROMEa, bPALINDROMEb, cPALINDROMEc, ..., zPALINDROMEz
    # So we store the node index, in the palindromic tree, where each one lives
    # (If it doesn't exist, its letter isnt in the dict)
    child_palindrome_node_index = {}

    def __init__(self, **kwargs):
        if "start_index" in kwargs:
            self.start_index = kwargs.pop("start_index")
        if "end_index" in kwargs:
            self.end_index = kwargs.pop("end_index")
        if "length" in kwargs:
            self.length = kwargs.pop("length")
        if "suffix_index" in kwargs:
            self.suffix_index = kwargs.pop("suffix_index")
        self.child_palindrome_node_index = {}

class PalindromeTree:
    nodes = []
    prev_node_index = 0
    magic_imaginary_node_index = 0
    magic_null_string_node_index = 1

    # Push on the 2 base nodes
    def __init__(self):
        # First node is for single-letter palindromes
        # It starts with length -1 because after you add on the letter to each side
        # It becomes length 1 - kind of weird but okay
        # Its longest suffix (not itself) is set to itself, because what else would it be??
        # Note that start_index needs to be -1 for our insert to work
        self.nodes.append(PalindromeTreeNode(start_index=-1, end_index=-1, length=-1, suffix_index=self.magic_imaginary_node_index))
        self.nodes[0].node_index = 0
        # Second node is the base for 2-letter palindromes
        # It's a null string
        # Its length is 0, and then when you add on the letter to each side
        # It becomes length 2 - totally normal
        # Its longest suffix (not itself) is the imaginary node 0
        self.nodes.append(PalindromeTreeNode(start_index=-1, end_index=-1, length=0, suffix_index=self.magic_imaginary_node_index))
        self.nodes[1].node_index = 1

    def find_parent_and_create_child(self, s, index):
        new_letter = s[index]

        # Go back through the train of parent node connections until we find the right one
        # Might end up being our first magic node
        parent_palindrome_node = self.nodes[self.prev_node_index]
        while True:
            parent_palindrome_start_index = index - parent_palindrome_node.length
            # The parent_palindrome_start_index needs to be at least 1, so that we can check the cell before it
            # If the cell before the suffix is equal to our new letter then it can be a palindrome
            # In the event where the parent_palindrome_node is our magic first node:
                # parent_palindrome_start_index will be index+1
                # so it'll be >= 1, and then it'll compare new_letter to itself
            # In the event where parent_palindrome_node is our magic second node:
                # parent_palindrome_start_index will be index
                # so for the first letter it won't be >= 1
                    # which is okay - the second node is for palindromes like "bb" not "b"
                # but for all letters afterwards it will be >= 1
                # so then it'll check our new_letter with the previous one, to see if they're the same
            if parent_palindrome_start_index >= 1 and new_letter == s[parent_palindrome_start_index - 1]:
                break
            parent_palindrome_node = self.nodes[parent_palindrome_node.suffix_index]

        # Now that we have our suffix (could be a magic node, could be a real palindrome)
        # Check to see if the palindrome (new_letter suffix new_letter) is already in the tree
        # i.e. check to see if the suffix already has an edge index for new_letter
        # If it is already in the tree, we don't insert anything new
        # Just update our prev_node_index counter to point to the node that has the new palindrome
        # So that next insert we can try to build on it
        # this might be the case in e.g.
        # bbabba
        # we would already have 'bb' when we get to it the 2nd time
        if new_letter in parent_palindrome_node.child_palindrome_node_index:
            self.prev_node_index = parent_palindrome_node.child_palindrome_node_index[new_letter]
            if debug_prints:
                print ("Parent node index is", parent_palindrome_node.node_index, "This node already exists")
            return None

        # Create a new node for this new entry
        new_palindrome_length = parent_palindrome_node.length + 2
        new_node_start = index-new_palindrome_length + 1
        new_node = PalindromeTreeNode(start_index=new_node_start, end_index=index, length=new_palindrome_length)
        # Append the node to our nodes array and update its index accordingly
        self.nodes.append(new_node)
        new_node.node_index = len(self.nodes) - 1
        # Update the suffix node to have its directed edge for the new letter point to our new node
        parent_palindrome_node.child_palindrome_node_index[new_letter] = new_node.node_index

        self.prev_node_index = new_node.node_index

        return parent_palindrome_node

    def set_child_suffix_node(self, s, index, parent_node):
        new_letter = s[index]

        child_node = self.nodes[len(self.nodes) - 1]
        # Magic base case: if the palindrome is length 1, its suffix is the magic null node
        if child_node.length == 1:
            child_node.suffix_index = self.magic_null_string_node_index
            return

        # Similarly to how we did in find_parent_and_create_child
        # We trace back through the suffix edges until we find the right one
        # But instead of trying to find the palindrome parent
        # We're trying to find the suffix palindrome
        # So we go all the way back until we find a match
        # And then go forward to their child palindrome
        # Kind of weird but okay
        suffix_node = self.nodes[parent_node.suffix_index]
        while True:
            suffix_start_index = index - suffix_node.length
            if suffix_start_index >= 1 and new_letter == s[suffix_start_index - 1]:
                break
            suffix_node = self.nodes[suffix_node.suffix_index]

        child_node.suffix_index = suffix_node.child_palindrome_node_index[new_letter]

    def insert(self, s, index):
        if debug_prints:
            print("Inserting letter" , s[index], "at index", index)
        parent_node = self.find_parent_and_create_child(s, index)

        if parent_node is not None:
            self.set_child_suffix_node(s, index, parent_node)

tree = PalindromeTree()
s = "abbalrcabbac"

longest_palindrome = ""
longest_palindrome_node = None

# Build the tree and cache off the longest palindrome
for i in range(0, len(s)):
    tree.insert(s, i)
    latest_node = tree.nodes[tree.prev_node_index]
    if latest_node.length > len(longest_palindrome):
        longest_palindrome = s[latest_node.start_index:latest_node.end_index + 1]
        longest_palindrome_node = latest_node

# Print all nodes in the tree
if debug_prints:
    for i in range(2, len(tree.nodes)):
        cur_node = tree.nodes[i]
        print (i-2, "= ",s[cur_node.start_index:cur_node.end_index + 1])

print (longest_palindrome)

{% endhighlight %}

[^1]: Not to imply that I'm super familiar with Manacher's, just aware of its existence.
[^2]: I didn't read the full 21 pages 🤷‍♀️

[gist]: https://gist.github.com/abethcrane/d8dc5f0664d44a2c9e69854d5c1a7080
[blog1]: https://www.geeksforgeeks.org/palindromic-tree-introduction-implementation/amp/
[blog2]: https://medium.com/@alessiopiergiacomi/eertree-or-palindromic-tree-82453e75025b
[blog3]: http://www.adilet.org/blog/palindromic-tree/
[paper]: https://arxiv.org/pdf/1506.04862.pdf
[manacher]: https://en.wikipedia.org/wiki/Longest_palindromic_substring#Manacher's_algorithm
