---
title: Team
ogTitle: Team Members, Roles and Teams
date: 2024-04-22
updatedDate: 2026-10-29
menuWeight: 3
---

# Team

The **Team** page lists the people in a project and the teams that receive alerts. Open **Settings** → **Team**. A project admin can invite members, change roles and remove members.

## Invite a Member

1. Click **Invite new member**.
2. Enter the email address of the person.
3. Select a role.
4. Click **Invite**.

| Role | What the member can do |
|---|---|
| **Admin** | Manage the team, billing and settings. |
| **Editor** | Create dashboards, monitors and API keys. |
| **Viewer** | Read only. |

To change a role or remove a member, use the controls next to the member in the list.

## Teams

A team is a group of members with its own notification channels. When a [monitor](/docs/dashboard/dashboard-pages/monitors/) fires, it notifies the teams that you selected for it, so each alert goes to the people who own the service.

The **@everyone** team includes all members of the project, and it uses the channels on the [Integrations](/docs/dashboard/settings-pages/integrations/) page.

To create a team:

1. Click **New Team**.
2. Enter a name and a **Handle**. A handle is lowercase, starts with a letter, and uses hyphens instead of spaces, for example `payments-oncall`.
3. Add members.
4. Select where the team receives alerts: email, Slack, Discord, WhatsApp or PagerDuty.
5. Save the team.
