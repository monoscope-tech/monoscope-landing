---
title: React / Next.js
ogTitle: React & Next.js Integration Guide
date: 2022-03-23
updatedDate: 2025-03-25
menuWeight: 3
---

# React / Next.js Integration

The Monoscope Browser SDK provides a `@monoscopetech/browser/react` subpath export with idiomatic React bindings — context providers, hooks, and an error boundary.

## Installation

```bash
npm install @monoscopetech/browser
```

## Quick Start

Wrap your app with `MonoscopeProvider` and use hooks to access the SDK:

{% raw %}
```tsx
import { MonoscopeProvider, useMonoscope, useMonoscopeUser, MonoscopeErrorBoundary } from "@monoscopetech/browser/react";

function App() {
  return (
    <MonoscopeProvider config={{ projectId: "YOUR_PROJECT_ID", serviceName: "my-react-app" }}>
      <MonoscopeErrorBoundary fallback={<div>Something went wrong</div>}>
        <MyApp />
      </MonoscopeErrorBoundary>
    </MonoscopeProvider>
  );
}

function MyApp() {
  const monoscope = useMonoscope();
  useMonoscopeUser(currentUser ? { id: currentUser.id, email: currentUser.email } : null);
  return <div>...</div>;
}
```
{% endraw %}

## Next.js App Router

The provider includes `"use client"` — import it in a client component or your root layout:

{% raw %}
```tsx
// app/providers.tsx
"use client";

import { MonoscopeProvider, MonoscopeErrorBoundary } from "@monoscopetech/browser/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MonoscopeProvider config={{ projectId: "YOUR_PROJECT_ID", serviceName: "my-nextjs-app" }}>
      <MonoscopeErrorBoundary fallback={<div>Something went wrong</div>}>
        {children}
      </MonoscopeErrorBoundary>
    </MonoscopeProvider>
  );
}
```
{% endraw %}

{% raw %}
```tsx
// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```
{% endraw %}

## React API

{class="docs-table"}
:::
| Export | Description |
| --- | --- |
| `MonoscopeProvider` | Context provider. Creates and destroys the SDK instance. Strict Mode safe. |
| `useMonoscope()` | Returns the `Monoscope` instance (or `null` during SSR). |
| `useMonoscopeUser(user)` | Calls `setUser` reactively when the user object changes. |
| `MonoscopeErrorBoundary` | Error boundary that reports caught errors to Monoscope. Accepts `fallback` prop. |
:::

## Custom Spans in Components

Use the `useMonoscope()` hook to create custom spans from any component:

```tsx
import { useMonoscope } from "@monoscopetech/browser/react";

function CheckoutButton() {
  const monoscope = useMonoscope();

  const handleClick = () => {
    monoscope?.startSpan("checkout.submit", async (span) => {
      span.setAttribute("cart.items", cartItems.length);
      await submitOrder();
    });
  };

  return <button onClick={handleClick}>Checkout</button>;
}
```

### Tracking Events

```tsx
function SearchBar() {
  const monoscope = useMonoscope();

  const handleSearch = (query: string) => {
    monoscope?.recordEvent("search", {
      "search.query": query,
      "search.source": "header",
    });
    performSearch(query);
  };

  return <input onChange={(e) => handleSearch(e.target.value)} />;
}
```

### Instrumenting Data Fetching

```tsx
function Dashboard({ id }: { id: string }) {
  const monoscope = useMonoscope();
  const [data, setData] = useState(null);

  useEffect(() => {
    monoscope?.startSpan("dashboard.load", async (span) => {
      span.setAttribute("dashboard.id", id);
      const res = await fetch(`/api/dashboards/${id}`);
      span.setAttribute("http.status", res.status);
      setData(await res.json());
    });
  }, [id]);

  return data ? <DashboardView data={data} /> : <Loading />;
}
```

## Configuration

`MonoscopeProvider` accepts the same configuration as the base SDK. See the [Browser SDK configuration](/docs/sdks/Javascript/browser/#configuration) for the full list of options.

{% raw %}
```tsx
<MonoscopeProvider
  config={{
    projectId: "YOUR_PROJECT_ID",
    serviceName: "my-react-app",
    enableUserInteraction: true,
    sampleRate: 0.5,
    debug: process.env.NODE_ENV === "development",
  }}
>
  {children}
</MonoscopeProvider>
```
{% endraw %}
