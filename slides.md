# Zustand state management

## What is it

> A small, fast, and scalable bearbones state management solution.
> Zustand has a comfy API based on hooks.
> It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like.

- [Github page](https://github.com/pmndrs/zustand)

---

# Zustand state management

## Presentation

- Compare a simple use-case between the following state-management solutions:
  - React Context
  - Redux ToolKit
  - Zustand

---

# Zustand state management

## Use case

- Make an app that renders a button with a number as its label.
- When clicked, the number increases by one.

`[0] -> [1] -> [2]`

> ~~Just use useState!~~
> Now obviously just using useState for this specific case would make the most sense.
> This is just for demostration purposes of the different libraries

---

# Zustand state management

## React Context

```typescript
// App.ts
import { useState, createContext } from 'react';
import { Button } from './Button';

export const MyContext = createContext();

export function App() {
  const [number, setNumber] = useState(0);

  return (
    <MyContext.Provider value={{ number, setNumber }}>
      <Button />
    </MyContext.Provider>
  );
}


// Button.ts
import { useContext } from 'react';
import { MyContext } from './App';

function Button() {
const {number, setNumber } = useContext(MyContext);

  return (
    <button onClick={() => setNumber((prev) => prev + 1)}>{number}</button>;
  );
}
```

---

# Zustand state management

## Redux ToolKit

install dependencies

`yarn add redux @reduxjs/toolkit`

---

# Zustand state management

## Redux ToolKit

create slice and store

```typescript
import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    number: 0,
  },
  reducers: {
    increaseNumber: (state) => {
      state.number = state.number + 1;
    },
  },
});

export const { increaseNumber } = counterSlice.actions;

export const createStore = configureStore({
  reducer: counterSlice.reducer,
});
```

---

# Zustand state management

## Redux ToolKit

Add provider to App

```typescript
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { App } from "./App";
import createStore from "./createReduxStore";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

# Zustand state management

## Redux ToolKit

Make use of the hooks in your app

```typescript
// App.ts

import { increaseNumber } from "./store";
import { useDispatch, useSelector } from "@reduxjs/toolkit";

export function App() {
  const dispatch = useDispatch();
  const number = useSelector((state) => state.number);

  return <button onClick={() => dispatch(increaseNumber)}>{number}</button>;
}
```

(Already a lot nicer than _pure_ Redux in the IDE)

---

# Zustand state management

## Zustand

Install the dependency to your app

`yarn add zustand`

---

# Zustand state management

## Zustand

Make the store hook, and use in your components

```typescript
// store.ts
import { create } from "zustand";

export const useStore = create((set) => ({
  number: 0,
  increaseNumber: () => set((state) => ({ number: state.number + 1 })),
}));

// App.ts
import { useStore } from "./store";

export function App() {
  const number = useStore((state) => state.number);
  const increaseNumber = useStore((state) => state.increaseNumber);

  return <button onClick={increaseNumber}>{number}</button>;
}
```

---

# Zustand state management

## Pros

- (basically) No boilerplate
- No context providers
- Bundled size 1.18kb

## Cons

- No fancy DevTools out of the box.
  - you can use Redux devtools, but requires some extra middleware and a little effort via middleware
- Smaller community (compared to Redux)
- Redux has proven itself on large scale applications, zustand has not
- Have to learn the API
