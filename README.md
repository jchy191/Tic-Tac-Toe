# Tic-Tac-Toe

This is the second project that I would like to showcase, whereby I wrote a tic-tac-toe game to practise concepts that I had just learn about code organisation and design patterns in Javascript. 

The project can be viewed in browser here:
https://rawcdn.githack.com/jchy191/Tic-Tac-Toe/dc6374081df21006f6c06c1034e3d08ac8c6f72c/Tic-Tac-Toe.html

For hard mode, I wanted to make an unbeatable AI and tried to implement a Minimax algorithm which I had read about online but was unable to, which motivated me to start learning more about Discrete Math and algorithms. I hope to get back to this and implement it on my own one day.

I faced quite a few bugs while doing this project, quite a number of which were due to arrays being passed by reference and not by value. A few bugs were also due to initially not using getters in the object returned by the modules/IIFEs. This project taught me a lot more about the basics of design principles in Javascript.

Looking back, the key thing that could have been improved on is spliting the different modules and function factories into different files to make the code more readable. Rather than using strings to store state, I could have  used objects instead. Commit messages are also quite messy and inconsistent.