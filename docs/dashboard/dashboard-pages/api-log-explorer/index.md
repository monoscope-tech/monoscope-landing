---
title: API Log Explorer
date: 2024-04-22
updatedDate: 2026-10-01
menuWeight: 4
---

# API Log Explorer Page

In this guide, you will learn how to effectively navigate through the **API Log Explorer** page on the monoscope dashboard and maximize all the powerful features accessible in it.

```=html
<hr />
```

On this page, you will find a list of all the requests tracked from your API including all the associated fields and parameters and a throughput graph. You can **filter** the data using the toggle at the top-left section of the page (the default is **Last 24 Hours**), toggle any log request to view all the associated details, or further click on a **Trace** to view even more request and response details.

![Screenshot of monoscope's API log explorer page](/docs/dashboard/dashboard-pages/api-log-explorer/log-explorer-new.png)

![Screenshot of monoscope's API log explorer page](/docs/dashboard/dashboard-pages/api-log-explorer/log-explorer-span.png)

```=html
<div class="callout">
  <i class="fa-solid fa-book"></i>
  <p><b>Throughput</b> refers to the rate at which an amount of data is transmitted over a given period of time.</p>
</div>
```

## Query Results

You can filter the data displayed on the API Log Explorer using one or more fields from the request (`status_code`, `host`, `request_body`, `method`, `request_type`, etc.) using the following comparison symbols:

:::
| Symbol | Description |
| :-: | :-: |
| **==** | **Equals** to another value. |
| **!=** | **Not equal** to another value. |
| **>** | **Greater than** another value. |
| **<** | **Less than** another value. |
| **>=** | **Greater than or equal** to another value. |
| **<=** | **Less than or equal** to another value. |
:::

There are two query filtering options, the **manual selector mode** and the **editor mode**.

You can manually add filters by selecting the fields and sub-fields you want and clicking the **Run Query** button as seen in the image below.

![Screenshot of monoscope's API log explorer page](/docs/dashboard/dashboard-pages/api-log-explorer/screen-3.png)

Alternatively, you can toggle the **Use editor** button, use the text editor to write the query as text and click the **Run Query** button as seen in the image below. See the [query language reference](/docs/dashboard/dashboard-pages/query-language/) for every operator and function.

![Screenshot of monoscope's API log explorer page](/docs/dashboard/dashboard-pages/api-log-explorer/screen-4.png)

If you toggle a request log, you can also manually select a field, click on it, and click the **Filter by field** or **Exclude by field** options to automatically add that field to the list of queries and run the query immediately.

![Screenshot of monoscope's API log explorer page](/docs/dashboard/dashboard-pages/api-log-explorer/screen-5.png)

## Alerts

You can create an alert and get notified via email or a Slack channel (if already configured) when some requests cross a defined throughput threshold. To achieve this, apply your desired filters first, click on the **Save as Alert** tab, input the alert/warning threshold values, define the alert message, and select the notification channels where the alert will be sent.

<!-- You can also use template tags in the subject like so: `Error in {/{alert.tags}}` -->

![Screenshot of monoscope's API log explorer page](/docs/dashboard/dashboard-pages/api-log-explorer/screen-6.png)

```=html
<div class="callout">
  <i class="fa-solid fa-book"></i>
  <p>A <b>threshold</b> level is the the value that must be exceeded for a certain reaction to occur or be triggered.</p>
</div>
```

## Share URL

monoscope allows you to publicly share the details of a particular log request to anyone you desire (maybe someone on the customer support team). All you need to do is click on the request, expand it, select the expiry date of the link, and click the **Get link** button. This will create a secure link which you can share with anyone.

![Screenshot of monoscope's API log explorer page](/docs/dashboard/dashboard-pages/api-log-explorer/screen-7.png)

![Screenshot of monoscope's API log explorer page](/docs/dashboard/dashboard-pages/api-log-explorer/screen-8.png)

```=html
<hr />
```

Here's a quick video overview for a visual walkthrough of this page:

```=html
<iframe
  class="w-full h-48 md:h-96 lg:h-96 xl:h-96"
  src="https://www.youtube.com/embed/leyBesljr40?si=wwGEO3bItDNIqHzk"
  title="YouTube Video Player: monoscope OpenAPI Spec Documentation"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
  ></iframe>
```

```=html
<br />
```

```=html
<iframe
  class="w-full h-48 md:h-96 lg:h-96 xl:h-96"
  src="https://www.youtube.com/embed/OgHiP3RNJ78?si=UKbpDpDTNUUSBMID"
  title="YouTube Video Player: monoscope OpenAPI Spec Documentation"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
  ></iframe>
```

```=html
<br />
```

```=html
<iframe
  class="w-full h-48 md:h-96 lg:h-96 xl:h-96"
  src="https://www.youtube.com/embed/xRzZNgfARLQ?si=byCc8n9f46G87VP9"
  title="YouTube Video Player: monoscope OpenAPI Spec Documentation"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
  ></iframe>
```

```=html
<hr />
<a href="/docs/dashboard/dashboard-pages/changes-errors/" class="w-full btn btn-outline link link-hover">
    Next: Changes & Error Page
    <i class="fa-regular fa-arrow-right mr-4"></i>
</a>
```
