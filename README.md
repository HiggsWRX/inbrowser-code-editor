# In browser code editor 

This project was developed as part of a personal project and exercise to improve my React skills

## Features

We are able to create and delete local code cells. In each code cell, a user may write, test, and execute javascript (and jsx) code. This code will then be bundled in the browser and displayed on the right.

Every code should work in principle, from imports to creating and displaying jsx components etc.

Internally, this uses esbuild to bundle and transpile the code to es6.
Editor is monaco editor.
Uses redux-thunk, with immer to simplify store reducer code.
