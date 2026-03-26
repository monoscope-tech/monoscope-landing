---
title: Changes & Errors
date: 2024-04-22
updatedDate: 2024-05-28
menuWeight: 5
---

# Changes & Errors Page

In this guide, you will learn how to effectively navigate through the **Changes & Errors** page on the monoscope dashboard and maximize all the powerful features accessible in it.

```=html
<hr />
```

On this page, you will find a list of all ongoing **anomalies** (new **Request Shapes**, **Field Formats**, or **Endpoints**) detected from different request types on your API, including the endpoints they were detected on, and the new, updated, or deleted fields detected. You can **sort** the list based on the first/last time the anomaly was seen or the number of associated events, **acknowledge** or **archive** each anomaly, and click on each list item to explore them in more detail.

![Screenshot of monoscope's changes & errors page](/docs/dashboard/dashboard-pages/changes-errors/changes-errors.png)

```=html
<div class="callout">
  <i class="fa-solid fa-book"></i>
  <p>An <b>anomaly</b> is any user activity (requests) on your API that is significantly different from previously tracked activities. This might surface as increased response times, error rates, or downtimes, and can be caused by a variety of conditions such as API changes, server issues, network issues, or security threats.</p>
</div>
```

```=html
<div class="callout">
  <i class="fa-regular fa-lightbulb"></i>
  <p>When you acknowledge an anomaly, monoscope understands the shape of the endpoints on your API and uses that information for future anomaly detections and daily/weekly reports. Hence, <b>you should acknowledge all important detected anomalies</b>.</p>
</div>
```

```=html
<hr />
```

Here's a quick video overview for a visual walkthrough of this page:

```=html
<iframe
  class="w-full h-48 md:h-96 lg:h-96 xl:h-96"
  src="https://www.youtube.com/embed/4F4l-hjpUfs?si=prafvDIDS2IPwWsT"
  title="YouTube Video Player: monoscope Error Tracking & Breaking Change Detection"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
  ></iframe>
```

```=html
<hr />
<a href="/docs/dashboard/dashboard-pages/outgoing-integrations/" class="w-full btn btn-outline link link-hover">
    Next: Outgoing Integrations Page
    <i class="fa-regular fa-arrow-right mr-4"></i>
</a>
```
