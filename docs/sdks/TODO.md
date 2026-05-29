# SDK Docs — "Identifying users & tenants" + session.id propagation TODO

## Status

- ✅ JS chain (browser → express/fastify/adonis/nextjs): baggage propagation + `setSession` helper + auto-extract middleware + doc sections.
- ✅ Python chain (flask/django/fastapi/pyramid): `set_session` + `apply_session_from_baggage` + middleware wiring + doc sections. 8 tests passing.
- 🚧 Other backend SDKs (Go, PHP, .NET, Java, Elixir): pending.

## JS work — done

- `monoscope-web` — `CompositePropagator([W3CTraceContextPropagator, W3CBaggagePropagator])`. `session.id` + `tab.id` seeded into baggage on the pageview context (`tracing.ts`), refreshed on session rotation.
- `monoscope-js/packages/common` — added `setSession(id)` and `applySessionFromBaggage(span)` exports.
- `monoscope-js/packages/{express,fastify,adonis,nextjs}` — middleware/handler calls `applySessionFromBaggage` after span creation; each package re-exports `setSession`.
- Docs — "Tracking sessions" section added to express, fastify, adonis, nextjs, nestjs guides.

## Python work — done

- `monoscope-python/common` — `set_session(id)` + `apply_session_from_baggage(span)` (reads via `opentelemetry.baggage.get_baggage`).
- `monoscope-python/{flask,django,fastapi,pyramid}` — middleware calls `apply_session_from_baggage` after span creation; each subpackage re-exports `set_session`.
- Tests — 3 new test cases (`set_session`, baggage present, baggage absent). All 8 pass.
- Docs — "Tracking sessions" section added to flask, django, fastapi, pyramid guides.
- Default propagator: Python OTel SDK ships tracecontext + baggage by default, so no propagator change needed on the SDK side.



In this project, **"sessions"** means attaching the authenticated user and tenant identity to the current request span via the SDK helpers (`setUser` / `setTenant` and language-equivalent names). The doc section is titled **"Identifying users & tenants"**. See `CLAUDE.md` → Terminology.

The reference implementation landed in `monoscope-js` commit `aa72242` (release v1.1.0) — `setUser({id,email,name})` and `setTenant({id,name})` in `@monoscopetech/common`, re-exported from `express`, `fastify`, `adonis`, `next`. The helpers write standard span attributes: `user.id`, `user.email`, `user.full_name`, `tenant.id`, `tenant.name`.

## SDK docs that already have the section ✅

- `docs/sdks/nodejs/expressjs/index.md`
- `docs/sdks/nodejs/fastifyjs/index.md`
- `docs/sdks/nodejs/adonisjs/index.md`
- `docs/sdks/nodejs/nextjs/index.md`
- `docs/sdks/nodejs/nestjs/index.md`
- `docs/sdks/python/flask/index.md`
- `docs/sdks/python/django/index.md`
- `docs/sdks/python/fastapi/index.md`
- `docs/sdks/python/pyramid/index.md`
- `docs/sdks/flutter/index.md`
- `docs/sdks/Javascript/browser/index.md` (covers it as part of the `setUser()` API reference)

## SDK docs that need the section added 🚧

Backend / framework guides:

- [ ] `docs/sdks/golang/native/index.md`
- [ ] `docs/sdks/golang/gin/index.md`
- [ ] `docs/sdks/golang/echo/index.md`
- [ ] `docs/sdks/golang/chi/index.md`
- [ ] `docs/sdks/golang/fiber/index.md`
- [ ] `docs/sdks/golang/gorillamux/index.md`
- [ ] `docs/sdks/php/laravel/index.md`
- [ ] `docs/sdks/php/symfony/index.md`
- [ ] `docs/sdks/php/slim/index.md`
- [ ] `docs/sdks/dotnet/dotnetcore/index.md`
- [ ] `docs/sdks/java/springboot/index.md`
- [ ] `docs/sdks/elixir/phoenix/index.md`
- [ ] `docs/sdks/Javascript/reactjs/index.md` (server components / SSR path — clarify whether this is in scope)

Landing / category index pages (skip — these are navigation pages, not integration guides):

- `docs/sdks/index.md`, `docs/sdks/{golang,php,dotnet,java,elixir,nodejs,python,Javascript}/index.md`

## Before documenting: verify the helper exists in each SDK

The JS family ships `setUser` / `setTenant` as of v1.1.0. The Python docs already reference `set_user` / `set_tenant` from `monoscope_flask` / `monoscope_django` etc. For the other languages we need to confirm what's actually exported before writing the doc section — don't invent function names.

- [ ] Go (`monoscope-go`) — confirm `SetUser` / `SetTenant` exist (chi/echo/gin/fiber/gorilla/native sub-packages). If not, add them mirroring the JS shape.
- [ ] PHP — `monoscope-laravel`, `apitoolkit-symfony`, `monoscope-slim` — confirm or add.
- [ ] .NET — `apitoolkit-dotnet` — confirm or add `Monoscope.SetUser` / `Monoscope.SetTenant`.
- [ ] Java — `apitoolkit-springboot` — confirm or add.
- [ ] Elixir — `apitoolkit-phoenix` — confirm or add `set_user` / `set_tenant`.

## Doc section template

Match the existing sections (see `docs/sdks/nodejs/expressjs/index.md:198` and `docs/sdks/python/flask/index.md`). Each section should:

1. Lead with the value prop: filter/group/search by identity in the dashboard.
2. Show the canonical attribute keys (`user.id`, `user.email`, `user.full_name`, `tenant.id`, `tenant.name`) so users don't need to know the OTel keys.
3. Provide a framework-idiomatic example (middleware / interceptor / before_request hook) that runs *after* the auth layer.
4. Note that missing fields are skipped and that calls outside the request scope are no-ops.
