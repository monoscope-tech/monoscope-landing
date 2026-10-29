---
title: Infrastructure
date: 2026-10-29
updatedDate: 2026-10-29
menuWeight: 9
---

# Infrastructure

The Infrastructure pages show the hosts, containers, images and Kubernetes resources that run your services. Open **Infrastructure** in the sidebar.

The data comes from host metrics and container telemetry that the OpenTelemetry Collector sends. To set it up, see the [infrastructure guides](/docs/sdks/infrastructure/) for Linux hosts, Docker and Kubernetes.

| Page | What it shows |
|---|---|
| **Hosts** | Each host with its operating system, CPU, memory, storage, load, uptime, running containers and integrations. Click a host to see its metrics and recent logs. |
| **Containers** | Each running container with its CPU and memory use against its limits, and its restarts. |
| **Images** | The container images in use and their tags. |
| **Kubernetes** | Clusters, namespaces, nodes and other resources, with their status. |
| **Host Map** | A map of all hosts. **Fill by** colors each host by a metric, such as CPU use. **Group by** groups the hosts. |

Use the filters on the left, such as **Provider**, **Region** and **OS**, to narrow the list. To search the logs of a host, open the host and click **Open logs in Explorer**.
