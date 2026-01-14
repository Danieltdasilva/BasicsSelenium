<b>This repository documents my hands-on learning journey with Selenium WebDriver (JavaScript-based).
It is intentionally not perfect. The goal is to show how I think, how I debug, and how I improve over time.
I’m focusing on understanding UI automation deeply, not just making tests pass.</b>
<br>

<h2>Project Goals</h2>

<ul><li>Learn Selenium WebDriver using JavaScript + Mocha</li>

<li>Practice real-world UI automation patterns</li>

<li>Understand why tests fail, not just how to fix them</li>

<li>Build reusable, maintainable test architecture</li>

<li>Document mistakes, refactors, and lessons learned</li>
</ul>

<h2>Tech Stack</h2>

<ul><li>Node.js</li>

<li>Selenium WebDriver</li>

<li>Mocha (test runner)</li>

<li>ChromeDriver</li>

<li>JavaScript (CommonJS)</li>
</ul>
<h2>Why this structure?</h2>

I refactored from a single test file into Page Object Model (POM) once the tests became harder to maintain.
This mirrors how real automation frameworks are built in production environments.

<h2>What the Tests Do</h2>

<ul><h4>Current tests automate the SauceDemo practice site:</h4>

<li>Log in using valid credentials</li>

<li>Add one or multiple items to the cart</li>

<li>Verify cart badge count</li>

<li>Navigate to cart and validate items</li>

<li>Remove items</li>

<li>Log out safely</li>

<li>Handle timing issues, popups, and flaky behavior</li>
</ul>

<h2>Real Issues I Faced (and Solved)</h2>

<h3>This project intentionally includes lessons learned from real failures:</h3>

❌ Tests passing locally but failing randomly

❌ Chrome “password compromised” popup breaking tests

❌ Timing issues with cart badge updates

❌ Incorrect waits causing ElementNotInteractableError

❌ Assertions running before UI updates completed

<h1>Come with me on this journey!</h1>
