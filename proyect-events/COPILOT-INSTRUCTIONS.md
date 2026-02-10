# Frontend Copilot Instructions

## 1. Project Overview
- **Type**: Single Page Application (SPA).
- **Framework**: Vanilla JavaScript (ES Modules).
- **Build Tool**: Vite.
- **Styling**: Standard CSS (imported in JS) and SASS capability.
- **State Management**: Manual DOM manipulation and simple state passing.
- **Routing**: Custom router implementation using History API (`pushState`, `popstate`).

## 2. Directory Structure
```
src/
├── api/          # API interaction logic (fetch wrappers)
├── components/   # Reusable UI components
├── pages/        # Page logic and layout assembly
├── utils/        # Utilities (routes, logic, validation)
├── main.js       # App entry point and router initialization
└── style.css     # Global styles
```

## 3. Coding Conventions & Patterns

### 3.1. Components
- **Implementation**: Components are functions that create and return DOM elements using `document.createElement()`.
- **Styling**: Import component-specific CSS at the top of the file: `import "./component.css"`.
- **Usage**: Append components to parent elements or the DOM body using `appendChild()` or `prepend()`.

**Example:**
```javascript
import "./myComponent.css";

export const createMyComponent = (props) => {
    const section = document.createElement('section');
    section.className = 'my-component';
    
    const title = document.createElement('h2');
    title.innerText = props.title;
    section.appendChild(title);
    
    return section;
};
```

### 3.2. Routing
- **Routes Definition**: Registered in `src/utils/routes/routes.js` and imported in `main.js`.
- **Navigation**: Use the `navigate(event, routeObject)` function from `src/utils/logic/navigate.js`.
- **Dynamic Routes**: Supported via parsing in `main.js` (e.g., `/events/:id`).
- **Authorization**: Check `user` object and redirect to login routes if needed.

**Example:**
```javascript
import { navigate } from "../utils/logic/navigate";
import { userRoutes } from "../utils/routes/routes";

// Inside a click handler
navigate(e, userRoutes[0]); 
```

### 3.3. API Interaction
- **Wrapper**: ALWAYS use `buildFetchJson` or `buildFetchFormdata` from `src/api/buildFetch.js`.
- **Spinner**: These wrappers automatically handle the global spinner (`showSpinner` / `hideSpinner`).
- **Error Handling**: Wrappers handle basic errors and display messages using `createMessage`.
- **Response Handling**: Check for `response.status === 204` (No Content) or `response.ok`.

**Example:**
```javascript
import { buildFetchJson } from "../api/buildFetch";

const loadData = async () => {
    const data = await buildFetchJson({
        route: '/data-endpoint',
        method: 'GET',
        container: document.getElementById('my-container') // For error messages
    });
    if (data) render(data);
};
```

### 3.4. Pages
- **Structure**: Pages are async functions (e.g., `renderHomePage`) that build the layout.
- **Initialization**: 
    1. Update browser URL logic if needed.
    2. Check auth state (e.g., `initHomeMenu` returns user).
    3. Clear/Refresh DOM sections.
    4. Attach event listeners.
- **Return Value**: Typically return the `user` object or `null`.

### 3.5. Authentication
- **Mechanism**: Token-based (JWT) handled via `js-cookie` (implied) or HTTP-only cookies in interaction with backend.
- **User Object**: Passed around or retrieved via `initHomeMenu`.

## 4. Best Practices
- **DOM Manipulation**: Avoid `innerHTML` for complex structures; prefer `createElement` for security and performance, unless rendering simple static HTML strings into a container.
- **Files**: Keep one component per file where reasonable.
- **Images**: Use Cloudinary URLs as seen in the codebase.
- **Async/Await**: Use for all asynchronous operations, especially API calls.
- **Error Handling**: Use `try/catch` in page rendering functions to prevent app crashes.

## 5. Improvement Suggestions (Documentation Only)
- **State Management**: As the app grows, a lightweight state manager (like simple observables) could reduce prop drilling.
- **Type Safety**: Consider migrating to TypeScript or using JSDoc for better type inference.
- **CSS Architecture**: Standardize on CSS Variables (Custom Properties) for theming (colors, fonts).
