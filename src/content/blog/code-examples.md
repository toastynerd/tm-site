# Code Examples

This post demonstrates syntax highlighting for various programming languages.

## TypeScript Example

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`).then(res => res.json());
}
```

## JavaScript Example

```javascript
const greeting = "Hello, World!";
console.log(greeting);

function add(a, b) {
  return a + b;
}
```

## JSX Example

```jsx
function Button({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-black text-white px-4 py-2 rounded"
    >
      {children}
    </button>
  );
}
```

## Bash Example

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## JSON Example

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

## CSS Example

```css
.button {
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #333;
}
``` 