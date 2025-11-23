---
title: "Newsletter 10/22: Documentation matters?"
featured_image: docs-screenshot.png
description: "APIs are amazing means of communication between software systems. Learn about the different types of APIs used on the web"
author: anthony 
date: 2022-10-22T07:25:03+02:00
categories:
  - Newsletter 
---

# Newsletter 10/22: Documentation matters?

Most of us learn the value of documentation the hard way by finding it to be lacking just when we need it most. Both project developers and software users benefit from projects that have thorough documentation. Though documenting can be a really tasking process, it is something that should always be done well. I mean, what is a developer journey without proper documentation? Poor developer productivity, project scalability, user adoption, and accessibility are all problems that arise in projects with insufficient documentation. In other words, poor documentation ends a project. There is only a limit to how far you can go with no documentation.

<!-- We discovered the effectiveness of documentation in predicting teams' adoption of technical practices. The technological capabilities of the system, including observability, continuous testing, and deployment automation, are expected to advance as a result of these practices. -->

!["Documentation screenshot"](https://monoscope.tech/blog/updates-october-2022/docs-screenshot.png "monoscope documentation feature")

I had conversations with development teams from both small and large companies, about how they actually maintain their API documentations. Especially about their workflows, and processes, and the results were not so surprisingly actually. Out of almost 60 companies, it turns out that the processes were quite heavily dependent on their tech stacks and frameworks. 

For example, while 70% of the companies had some form of API documentation, only ~15% had it automated in some form. Most companies at best had a postman collection with different common requests they supported. And especially in companies who had APIs consumed by other internal teams eg to power mobile apps or a frontend, the teams simply shared an example curl or postman collection with the team integrating their APIs.  And the integrating team would usually have to figure out the API based on that alone. 

Another chunk of developers managed hand rolled swagger files, but these swagger files were almost always out of date with the actual in production APIs, because it was common that small changes happened to the APIs but the developer never remembered to also update the swagger files.

Now I mentioned that the tech stack was an important predictor of whether a team generated their API docs automatically or not, and that is because teams that used strongly typed languages were more likely to have some scripts in their codebases that would go through their code, read through annotations in their code and spit out this swagger files. Especially teams who used Java or Go, tended to have such a process. While the teams who used NodeJS almost never had automatically generated swagger docs, and this was surprising to me. And even with the teams who annotated their codes and generated swagger docs, it was still common to speak with teams who simply went months without rerunning these scripts to update their swagger docs. Usually due to not integrating the process into their CI, and relying only on remembering to rerun their swagger generation scripts.


## What monoscope is doing about Documentation?

These conversations, alongside our own personal experiences convince us that documentation simply can't be a manual process. Developers simply rarely remember to update it. But also, even with teams who automate the documentation generation, their documentation quality was usually skeletal at best. Basically few teams went the extra step of including field level documentation where they explain what different fields meant. 


Our question was, 
- How can we have API (Swagger) Documentation that is always absolutely up to date, especially from the perspective of our customers? 
- Any automatically generated documentation requires human input to add the domain specific details into the documentation. How can we gently remind and nudge development teams to input and update this info when new fields are added or modified?
- Documentation is collaborative. How can we facilitate even more collaboration?


The journey is a marathon and not a sprint, so while we have grander goals, we have to start somewhere. At the moment we're exploring specific solutions to these 3 questions.


### 1. Derive Documentation from Production Traffic

![Documentation screen](https://monoscope.tech/field_documentation.png "Documentation screen")

When requests get to your servers, monoscope looks into these requests, checks their structure, and shape, checks the fields, their formats, etc, and uses this information to get an idea of what your API looks like. This information is what is used to generate API docs for you. And then this API Docs can then be downloaded as **Swagger**.

To help you build a model about how this works, let's look at some example GET request.

``` js 

// Request 1
GET /user/1 

{
  "name": "John Dow",
  "age": 30
}


// Request 2
GET /user/2

{
  "name": "Romeo Dow",
  "age": 25
}

// Request 3
GET /user/3 

{
  "name": "Julliet Dow",
  "age": 40
}

--- Etc
```

monoscope would process these requests and learn that the endpoint has a structure that looks similar to:

Endpoint: `/user/{arg: integer}/`

| field   | type     | format      | examples|
|---      | ----     |  ---        | ---      |
| name    | string   | /(a-z) (a-z)| "John Doe", "Romeo Dow", "Julliet Dow"|
| age     | int      | int:(25 <= x >= 40)        | 30, 25, 40|

So, APitoolkit builds this insight about your APi, which it uses for anomaly detection and other purposes, but especially generating documentation.

### 2. When we detect new/updated Fields, nudge developers to update the relevant docs.

If you look at the table, you realise that while we have all this automatically generated data, there's one thing missing: `Description`

So what we do is simply notify the team or developer, that we detected a new/updated field, and nudge them to add a description via monoscope dashboard.  So, a user could then add comments to the field as needed, and the table could then look somewhat like:

| field   | type     | format      | examples| description |
|---      | ----     |  ---        | ---      | ---        |
| name    | string   | /(a-z) (a-z)| "John Doe", "Romeo Dow", "Julliet Dow"| A name is the legal identifier of an account user |
| age     | int      | int:(25 <= x >= 40) | 30, 25, 40| The legal age of an account user, calculate from their uploaded date of birth. |


### 3. Support collaboration via comments on docs, fields and shared updates

Now we have documentations and other information for each fields, but then we also want to allow multiple people in a team to collaborate and come to a concensus about information. And this can happen via conversations over comments on any given field.


Monoscope is on the journey of helping developers create amazing API documentation with very low effort. And even while some of these functionality are still in progress or in flux, we're constantly thinking about the bigger picture, and are confident that we will solve this problem of API documentation elegantly, with time.

monoscope is committed to guiding you through managing quality documentation, and we have written some articles on this topic. Take a look:
- [How to write API Docs; 6 API Documentation Best Practices](https://monoscope.tech/blog/how-to-write-api-docs/)
- [Writing API Documentation - Best Practices and Mistakes to Avoid](https://monoscope.tech/blog/writing-api-documentation)

At monoscope, we care about our users and developers, we concentrated on making our documentation process straightforward and scalable, with the ability to add and remove content in the event that any step was overlooked or overly explained.


## What else is going on at the moment with monoscope?

A lot actually. We're currently working a lot on our data visualization approach and charts, as well as how we express and present API anomalies. But more on this in the next weeks. 

We're also going to launch monoscope this November, and finally step out of the Beta. If you'll like to get onboarded into monoscope before then (and benefit from our early user advantages), please feel free to reach out.

We will be spending some time in Kigali (Rwanda) this November, with plans to connect in person with other founders and especially some of our users. So, say hi if you're around.

Have a lovely weekend where ever you are, and stay happy

Anthony Alaribe<br/> 
Co-founder monoscope
