
<p><h2 align="center" dir="auto"><b>Epicode School - Week 9 Project</b></h2></p>
<p align="center" dir="auto">Track: Using TypeScript classes Create 2 Smartphone samples that can be used at the same time.</p>

<p align="center" dir="auto"><b>Technologies Used:</b></p>
<p align="center" dir="auto"> 
  <a href="https://github.com/gi-ga-dev" target="_blank" rel="nofollow"> 
    <img src="https://user-images.githubusercontent.com/77717069/175243081-2ba40459-d04b-4f34-b572-44dfc1a7e450.png" alt="js" width="100"> 
  </a> 
  <a href="https://github.com/gi-ga-dev" target="_blank" rel="nofollow"> 
    <img src="https://user-images.githubusercontent.com/77717069/175243442-5c187e89-0afd-49ff-b56b-08c41e884a5f.png" alt="ts" width="100">
  </a> 
</p>

<p align="center" dir="auto"> <b>Project Introduction:</b> <br><br>

I created an abstract class (Cellular) with methods and protected properties, in order to pass them to a subclass (Smartphone).

At DOMContentLoaded with a foreach array method I dinamically created elements with class methods assigned to each object.

To avoid code repetition I assigned an id counter (_cellId) to Cellular class that will increment for each object created, so inside a class method, when I need to select and write inside multiple divs/buttons with the same class name, the QuerySelectorAll with [this._cellId] will target each specific element.

In the input field you can type to charge credit to make a call (a simple timer interval) with a 0.20cent credit charge every 60sec, or use the credit to charge Data (typing 0.5 at the cost of 5 dollars will charge 500MB, typing 1 at the cost of 10 dollars will charge 1GB etc.). 
Internet navigation is another timer interval with 1MB decrement each second. 

Features:
- Call | Internet

Methods:
- Charge Credit | Data
- Start/Stop Call | Internet
- Reset Calls | Internet Counter

</p>

![week-9](https://user-images.githubusercontent.com/77717069/176638647-0bf41732-af41-4c21-83cb-3404f847484e.gif)
