---
title: Endpoints
menuWeight: 40
---

# API Endpoints

This reference contains 76 operations from the public OpenAPI specification. Each request uses a project API key and the `X-Project-Id` header. See [Authentication](/docs/api-reference/getting-started/authentication/) before sending requests.

## Ingestion Key

- [`GET /api/v1/ingestion-key`](/docs/api-reference/endpoints/get-ingestion-key/)

## Events

- [`GET /api/v1/events`](/docs/api-reference/endpoints/get-events/)
- [`GET /api/v1/events/{event_id}/time/{timestamp}`](/docs/api-reference/endpoints/get-events-event-id-time-timestamp/)
- [`POST /api/v1/events/query`](/docs/api-reference/endpoints/post-events-query/)

## Metrics

- [`GET /api/v1/metrics`](/docs/api-reference/endpoints/querymetrics/)
- [`GET /api/v1/metrics/catalog`](/docs/api-reference/endpoints/get-metrics-catalog/)

## Schema

- [`GET /api/v1/schema`](/docs/api-reference/endpoints/getschema/)

## Facets

- [`GET /api/v1/facets`](/docs/api-reference/endpoints/get-facets/)

## Rrweb

- [`POST /api/v1/rrweb`](/docs/api-reference/endpoints/post-rrweb/)

## Monitors

- [`GET /api/v1/monitors`](/docs/api-reference/endpoints/listmonitors/)
- [`POST /api/v1/monitors`](/docs/api-reference/endpoints/post-monitors/)
- [`GET /api/v1/monitors/{monitor_id}`](/docs/api-reference/endpoints/get-monitors-monitor-id/)
- [`PUT /api/v1/monitors/{monitor_id}`](/docs/api-reference/endpoints/put-monitors-monitor-id/)
- [`DELETE /api/v1/monitors/{monitor_id}`](/docs/api-reference/endpoints/delete-monitors-monitor-id/)
- [`PATCH /api/v1/monitors/{monitor_id}`](/docs/api-reference/endpoints/patch-monitors-monitor-id/)
- [`POST /api/v1/monitors/apply`](/docs/api-reference/endpoints/post-monitors-apply/)
- [`GET /api/v1/monitors/{monitor_id}/yaml`](/docs/api-reference/endpoints/get-monitors-monitor-id-yaml/)
- [`POST /api/v1/monitors/{monitor_id}/toggle_active`](/docs/api-reference/endpoints/post-monitors-monitor-id-toggle-active/)
- [`POST /api/v1/monitors/{monitor_id}/mute`](/docs/api-reference/endpoints/post-monitors-monitor-id-mute/)
- [`POST /api/v1/monitors/{monitor_id}/unmute`](/docs/api-reference/endpoints/post-monitors-monitor-id-unmute/)
- [`POST /api/v1/monitors/{monitor_id}/resolve`](/docs/api-reference/endpoints/post-monitors-monitor-id-resolve/)
- [`POST /api/v1/monitors/bulk`](/docs/api-reference/endpoints/post-monitors-bulk/)

## Share

- [`POST /api/v1/share`](/docs/api-reference/endpoints/post-share/)

## Dashboards

- [`GET /api/v1/dashboards`](/docs/api-reference/endpoints/get-dashboards/)
- [`POST /api/v1/dashboards`](/docs/api-reference/endpoints/post-dashboards/)
- [`GET /api/v1/dashboards/{dashboard_id}`](/docs/api-reference/endpoints/get-dashboards-dashboard-id/)
- [`PUT /api/v1/dashboards/{dashboard_id}`](/docs/api-reference/endpoints/put-dashboards-dashboard-id/)
- [`DELETE /api/v1/dashboards/{dashboard_id}`](/docs/api-reference/endpoints/delete-dashboards-dashboard-id/)
- [`PATCH /api/v1/dashboards/{dashboard_id}`](/docs/api-reference/endpoints/patch-dashboards-dashboard-id/)
- [`GET /api/v1/dashboards/{dashboard_id}/data`](/docs/api-reference/endpoints/get-dashboards-dashboard-id-data/)
- [`POST /api/v1/dashboards/apply`](/docs/api-reference/endpoints/post-dashboards-apply/)
- [`POST /api/v1/dashboards/{dashboard_id}/duplicate`](/docs/api-reference/endpoints/post-dashboards-dashboard-id-duplicate/)
- [`POST /api/v1/dashboards/{dashboard_id}/star`](/docs/api-reference/endpoints/post-dashboards-dashboard-id-star/)
- [`DELETE /api/v1/dashboards/{dashboard_id}/star`](/docs/api-reference/endpoints/delete-dashboards-dashboard-id-star/)
- [`GET /api/v1/dashboards/{dashboard_id}/yaml`](/docs/api-reference/endpoints/get-dashboards-dashboard-id-yaml/)
- [`PUT /api/v1/dashboards/{dashboard_id}/widgets`](/docs/api-reference/endpoints/put-dashboards-dashboard-id-widgets/)
- [`DELETE /api/v1/dashboards/{dashboard_id}/widgets/{widget_id}`](/docs/api-reference/endpoints/delete-dashboards-dashboard-id-widgets-widget-id/)
- [`PATCH /api/v1/dashboards/{dashboard_id}/widgets/order`](/docs/api-reference/endpoints/patch-dashboards-dashboard-id-widgets-order/)
- [`POST /api/v1/dashboards/bulk`](/docs/api-reference/endpoints/post-dashboards-bulk/)

## Api_keys

- [`GET /api/v1/api_keys`](/docs/api-reference/endpoints/get-api-keys/)
- [`POST /api/v1/api_keys`](/docs/api-reference/endpoints/post-api-keys/)
- [`GET /api/v1/api_keys/{key_id}`](/docs/api-reference/endpoints/get-api-keys-key-id/)
- [`DELETE /api/v1/api_keys/{key_id}`](/docs/api-reference/endpoints/delete-api-keys-key-id/)
- [`POST /api/v1/api_keys/{key_id}/activate`](/docs/api-reference/endpoints/post-api-keys-key-id-activate/)
- [`POST /api/v1/api_keys/{key_id}/deactivate`](/docs/api-reference/endpoints/post-api-keys-key-id-deactivate/)

## Me

- [`GET /api/v1/me`](/docs/api-reference/endpoints/get-me/)

## Project

- [`GET /api/v1/project`](/docs/api-reference/endpoints/get-project/)
- [`PATCH /api/v1/project`](/docs/api-reference/endpoints/patch-project/)

## Endpoints

- [`GET /api/v1/endpoints`](/docs/api-reference/endpoints/get-endpoints/)
- [`GET /api/v1/endpoints/{endpoint_id}`](/docs/api-reference/endpoints/get-endpoints-endpoint-id/)

## Log_patterns

- [`GET /api/v1/log_patterns`](/docs/api-reference/endpoints/get-log-patterns/)
- [`GET /api/v1/log_patterns/{pattern_id}`](/docs/api-reference/endpoints/get-log-patterns-pattern-id/)
- [`POST /api/v1/log_patterns/{pattern_id}/ack`](/docs/api-reference/endpoints/post-log-patterns-pattern-id-ack/)
- [`POST /api/v1/log_patterns/bulk`](/docs/api-reference/endpoints/post-log-patterns-bulk/)

## Issues

- [`GET /api/v1/issues`](/docs/api-reference/endpoints/get-issues/)
- [`GET /api/v1/issues/{issue_id}`](/docs/api-reference/endpoints/get-issues-issue-id/)
- [`POST /api/v1/issues/{issue_id}/ack`](/docs/api-reference/endpoints/post-issues-issue-id-ack/)
- [`POST /api/v1/issues/{issue_id}/unack`](/docs/api-reference/endpoints/post-issues-issue-id-unack/)
- [`POST /api/v1/issues/{issue_id}/archive`](/docs/api-reference/endpoints/post-issues-issue-id-archive/)
- [`POST /api/v1/issues/{issue_id}/unarchive`](/docs/api-reference/endpoints/post-issues-issue-id-unarchive/)
- [`POST /api/v1/issues/bulk`](/docs/api-reference/endpoints/post-issues-bulk/)

## Incidents

- [`GET /api/v1/incidents`](/docs/api-reference/endpoints/get-incidents/)
- [`GET /api/v1/incidents/{incident_id}`](/docs/api-reference/endpoints/get-incidents-incident-id/)

## Teams

- [`GET /api/v1/teams`](/docs/api-reference/endpoints/get-teams/)
- [`POST /api/v1/teams`](/docs/api-reference/endpoints/post-teams/)
- [`GET /api/v1/teams/{team_id}`](/docs/api-reference/endpoints/get-teams-team-id/)
- [`PUT /api/v1/teams/{team_id}`](/docs/api-reference/endpoints/put-teams-team-id/)
- [`DELETE /api/v1/teams/{team_id}`](/docs/api-reference/endpoints/delete-teams-team-id/)
- [`PATCH /api/v1/teams/{team_id}`](/docs/api-reference/endpoints/patch-teams-team-id/)
- [`POST /api/v1/teams/bulk`](/docs/api-reference/endpoints/post-teams-bulk/)

## Members

- [`GET /api/v1/members`](/docs/api-reference/endpoints/get-members/)
- [`POST /api/v1/members`](/docs/api-reference/endpoints/post-members/)
- [`GET /api/v1/members/{user_id}`](/docs/api-reference/endpoints/get-members-user-id/)
- [`DELETE /api/v1/members/{user_id}`](/docs/api-reference/endpoints/delete-members-user-id/)
- [`PATCH /api/v1/members/{user_id}`](/docs/api-reference/endpoints/patch-members-user-id/)

## Mcp

- [`POST /api/v1/mcp`](/docs/api-reference/endpoints/post-mcp/)
