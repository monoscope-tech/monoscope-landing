---
title: API Tests
date: 2024-07-22
updatedDate: 2024-07-22
menuWeight: 7
---

# API Tests Page

In this guide, you will learn how to effectively navigate through the **API Tests** page on the monoscope dashboard and maximize all the powerful features accessible in it. 

```=html
<hr />
```

On this page, you can define and run different API tests (synthetic monitors) with multiple steps to monitor endpoints from your API at scheduled intervals.

![Screenshot of monoscope's API Tests page](/docs/dashboard/dashboard-pages/api-tests/testing-ui.png)

![Screenshot of monoscope's API Tests page](/docs/dashboard/dashboard-pages/api-tests/testing-code.png)

## Get Started

To get started, kindly follow the steps below:

- Click on the **+ new tests** button to create a new test.
- Enter your preferred title and description.
- If you want to run the test at intervals, click the **Schedule** toggle, and select your preferred interval.
- Click the **Create Test** button and you will now be redirected to a new page.
- Next, click on the **Code** toggle to select the UI editor mode (use the input fields) or manual code mode (manually write the tests with a YAML DSL).
- Add as many steps as you want for this test and click the **Run all** button to preview the results at the right section of the page.
- Once done, click the **Save** button to save the test.

```=html
<div class="callout">
  <i class="fa-solid fa-book"></i>
  <p>A <b>DSL (Domain Specific Language)</b> is a programming language that is specifically designed for a particular domain or problem (e.g., SQL for database queries).</p>
</div>
```

## Test Definition Syntax

We use a YAML-based syntax for defining test scenarios. Each scenario consists of multiple stages, where each stage represents a specific API request and its associated assertions. Below is an example of the YAML syntax for defining API tests:

```yaml
---
- title: fetches TODO items - GET
  GET: /todos/
  asserts:
    - ok: $.resp.status == 200
    - array: $.resp.json
  exports:
    todoItem: $.resp.json[0]._id

- title: deletes TODO items - DELETE
  DELETE: /todos/$.stages[0].todoItem
  asserts:
    - empty: $.resp.json.todos
    - string: $.resp.json

- title: Adds Todo item - POST
  POST: /todos/
  json:
    task: "run tests"
  asserts:
    - ok: $.resp.status == 200
    - ok: $.resp.json.task == "run tests"
    - ok: $.resp.json.completed
```

In the example above, the YAML test file defines three test items fetching TODO items using a `GET` request, deleting a specific TODO item using a `DELETE` request, and adding a new TODO item using a `POST` request. The YAML file consists of a list of test scenarios. Each scenario represents an API request and contains the following fields:

{class="docs-table"}
:::
| Field | Description |
| -------- | ----------- |
| `title` (required) | A descriptive name for the stage. |
| `request` (required) | Defines the API request to be made, including HTTP methods, the URL, headers, and JSON request body data. |
| `asserts` (optional) | Defines assertions to be performed on the response for validation. |
| `exports` (optional) | Specifies values to capture from the response for future stages. |
:::

Kindly click each toggle below to learn more about each field.

<details>
<summary><b><code>request</code> field</b></summary>
<br />

The `request` field defines the API request to be made and consists of three properties:

  ① `method` (required): This property specifies the HTTP method for the request, such as `GET`, `POST`, `PUT`, or `DELETE` as the key. The value of the `method` property is the request URL path. Here's an example:

  ```yaml
  # POST request
  - title: Adds Todo item - POST
    POST: /todos/

  # GET request
  - title: Fetches Todo items - GET
    GET: /todos/
  ```

  ② `headers` (optional): This property allows you to include HTTP headers in the request. Headers can be used to pass additional information to the server, such as authentication tokens or content types. Here's an example:

  ```yaml
  - title: Fetches Todo items - GET with headers
    GET: /todos/
    headers:
      Authorization: Bearer <token>
      Content-Type: application/json
      Allowed-Methods:
        - GET
        - POST
  ```

  ⓷ `json` (optional): This property allows you to include request body data in JSON format when necessary. By specifying the `json` property within the `request` field, you can provide structured data that needs to be sent along with the API request. Here's an example:

  ```yaml
  - title: Create User - POST
    POST: /users/
    json:
      name: John Doe
      age: 25
      email: john.doe@example.com
  ```

  In the above example, a POST request is made to create a new user. The `json` property contains the user data in JSON format, including properties such as `name`, `age`, and `email`. Including the `json` property in the `request` field enables you to pass structured data to the API endpoint, facilitating actions such as creating or updating resources on the server.
</details>

<details>
<summary><b><code>asserts</code> field</b></summary>
<br />

The `asserts` field plays a crucial role in defining assertions or validations to be performed on the API response. It allows you to specify conditions that must be met for the test to pass successfully. This field accepts a collection of key-value pairs, where the keys represent the type of assertion (think of it as a variable) and the values define the corresponding expressions or conditions to be evaluated. You can include multiple assertions within the `asserts` field to perform various validations on different aspects of the API response, such as checking specific properties, verifying the presence of certain data, or comparing values.

Here's an example to demonstrate the usage of the `asserts` field:

```yaml
- title: Fetches Todo items - GET
  GET: /todos/
  asserts:
    - ok: $.resp.status == 200
    - array: $.resp.json
    - ok: $.resp.json[0].task == "run tests"
```

<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>The `.json` in `$.resp.json` converts the response into JSON format. This allows you to access properties of the response JSON using JSONPath expressions.</p>
</div>

In the above example, we have defined three assertions:

① `ok`: This assertion checks whether the response status code is equal to 200. The expression `$.resp.status == 200` is evaluated, and if it returns `true`, the assertion is considered successful.

② `array`: This assertion verifies that the response body is an array. The expression `$.resp.json` is evaluated, and if the result is an array, the assertion is considered successful.

⓷ `ok`: This assertion checks if the first Todo item retrieved from the API response has a task name equal to "run tests". The expression `$.resp.json` is evaluated, and if it returns `true`, the assertion is considered successful.

By utilizing the `asserts` field effectively, you can ensure that the API response meets the expected criteria, providing confidence in the correctness and reliability of your API. All the possible assertions you could use are as follows:

{class="docs-table"}
:::
| Assertion | Description     |
|-----------|-----------------|
| `ok`     | Checks if the provided expression evaluates to `true`. |
| `empty`  | Checks if a value is empty (e.g., an empty array, string, or null). |
| `array`  | Checks if a value is an array.                  |
| `string` | Checks if a value is a string.                  |
| `number` | Checks if a value is a number.                  |
| `boolean`| Checks if a value is a boolean.                 |
| `null`   | Checks if a value is null.                      |
| `exists` | Checks if a value exists.                       |
| `date`   | Checks if a value is a valid date string.       |
:::

These assertions provide a wide range of options to validate different aspects of the API response, allowing you to ensure the correctness and integrity of the data and behavior. You can select the appropriate assertion based on the specific validation requirements of your API test scenario.
</details>

<details>
<summary><b><code>exports</code> field</b></summary>
<br />

The `exports` field allows you to capture and store values from the API response of a stage for future reference within the test scenario. It provides a convenient way to extract specific data and make it accessible in subsequent stages of the test.
  
To use the `exports` field, you define key-value pairs where the keys represent the names of the exports (think of it as a variable), and the values define the JSON paths or expressions used to extract the desired data from the response.
  
Here's an example that demonstrates the usage of the `exports` field:

```yaml
- title: Fetches Todo items - GET
  GET: /todos/
  exports:
    todoItem: $.resp.json[0]._id
```

In the above example, the `exports` field captures the value of the `_id` property from the first element of the API response array. It assigns this value to the `todoItem` export. By capturing the `_id` value in the `todoItem` exports, you can access it in subsequent stages of the test scenario. This allows you to use the extracted data for further API requests, assertions, or any other necessary operations.

The `exports` field enables you to create a bridge between different stages within the test scenario, providing a way to pass relevant data between them. This can be particularly useful when you need to refer to specific values or dynamically generate inputs for subsequent API requests. Using the `exports` field, you can enhance the flexibility and modularity of your API tests, making them more robust and adaptable to different scenarios.
</details>

## What is JSONPath?

JSONPath is a query language used to select and extract data from JSON files. It provides a concise syntax that allows you to specify paths to specific elements within a JSON structure, facilitating data access and manipulation. JSONPath expressions are extensively used to extract data for assertions and exports. To illustrate how JSONPath works, consider the following examples:

{class="docs-table"}
:::
| JSONPath | Description |
| -------- | ----------- |
| `$.user.name` | This expression retrieves the name of a user from the top-level object in the JSON document. |
| `$.todos[0].task` | Here, the expression accesses the task property of the first element in an array of todos. |
| `$.todos[*].task.description` | This expression retrieves the description property of all tasks within the todos array. |
:::

The syntax of JSONPath expressions includes several key components:

{class="docs-table"}
:::
| Component | Description |
| -------- | ----------- |
| Bracket notation (`[]`) | Used to access elements within an array by providing the index within square brackets. |
| Wildcard (`*`) | Matches any element at the current level, allowing you to retrieve all elements of a particular level. |
| Recursive descent (`..`) | Enables searching for elements at any depth within the JSON structure, including nested objects and arrays. |
| Filters (`[?]`) | Allows applying conditions or filters to select specific elements based on certain criteria. |
:::

By employing JSONPath expressions, you can precisely pinpoint the desired data within a JSON structure. These expressions play a vital role in facilitating the extraction of data for performing assertions and capturing exports during the testing process.

<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>To learn more about JSONPaths, please take a look at the [official docs](https://github.com/json-path/JsonPath/blob/master/README.md){target="_blank"} or use this [JSONPath Evaluator](https://jsonpath.com?ref=monoscope){target="_blank"} to validate your JSONPath expressions.</p>
</div>

## Referencing Values and Dynamic Inputs for Subsequent API Requests

The `exports` field not only allows you to capture values from the API response but also provides a powerful mechanism for referencing those values and dynamically generating inputs for subsequent API requests.

By capturing relevant data using the `exports` field, you can store it as an export and easily refer to it in the later stages of your test scenario. This capability becomes particularly useful when you need to access specific values extracted from the response and utilize them in subsequent API requests.

For example, let's say you retrieve an ID from an API response in one stage using the `exports` field:

```yaml
- title: Fetch User - GET
  GET: /users/1
  exports:
    userId: $.resp.body.id
```

To reference this `userId` export in a subsequent API request, you can use the `$.stages[n].<VAL>` syntax:

```yaml
- title: Update User - PUT
  PUT: /users/$.stages[0].userId
  json:
    name: 'John Doe'
```

In the above example, the `userId` captured in the first stage is accessed using the syntax `$.stages[0].userId`. The reference will substituted with the corresponding value during execution. You can also use relative references like `$.stages[-n]` which refers to the `exports` of the `nth` stage before the current stage. Here's an example:

```yaml
- title: deletes TODO items - DELETE
  DELETE: /todos/$.stages[-1].todoItem #-1 means one stage before me
  asserts:
    - string: $.resp.json.task
    - ok: $.resp.json.id == $.stages[-1].todoItem
```

By referencing specific values captured in previous stages, you can establish dependencies between different API requests and ensure seamless data flow throughout your test scenario. This flexibility allows you to build more comprehensive and realistic tests, simulating complex user interactions or workflows.

## Date Assertions

To make date assertions, you'll need to provide the date string and the date format, like so:

```yaml
- title: Get User Profile - GET
  GET: /user/jon_doe
  asserts:
    - date: $.resp.json.createdAt %Y-%m-%d %H:%M:%S %Z
```

In the example above, we first provide a JSONPath to the date followed by the date's format. We use chrono crate's formatting tokens to represent different components of a date. Here are some commonly used formatting tokens:

{class="docs-table"}
:::
| Token | Meaning     | Example         |
|------|--------------|-----------------|
| `%Y` | Year with century as a decimal number. | 2023 |
| `%m` | Month as a zero-padded decimal number. | 07 |
| `%b` or `%h` | Abbreviated month name. | Jul |
| `%B` | Full month name. | July |
| `%d` | Day of the month as a zero-padded decimal number. | 03 |
| `%A` | Full weekday name. | Monday |
| `%a` | Abbreviated weekday name. | Mon |
| `%H` | Hour (00-23). | 14 |
| `%I` | Hour (01-12). | 03 |
| `%M` | Minute (00-59). | 59 |
| `%S` | Second (00-59). | 45 |
| `%p` | AM/PM designation for 12-hour clock. | PM |
| `%Z` | Timezone offset or name. | UTC |
:::

Here are some example dates and their correct formats:

{class="docs-table"}
:::
| Date String | Format |
| ----------- | ------ |
| 2023-07-26                      | `%Y-%m-%d`                 |
| 2023-07-26 12:34:56 UTC         | `%Y-%m-%d %H:%M:%S %Z`     |
| 15 August, 1995, 03:45 PM UTC   | `%d %B, %Y, %I:%M %p %Z`   |
| Mon, 05 Dec 2022 11:05:30 UTC   | `%a, %d %b %Y %H:%M:%S %Z` |
| January 01, 2000 - 00:00:00 UTC | `%B %d, %Y - %H:%M:%S %Z`  |
| 1987/03/10 06:30 AM UTC         | `%Y/%m/%d %I:%M %p %Z`     |
:::

In the table above, the "Date String" column represents the example date string, and the "Format" column contains the corresponding format string to parse the given date string.

```=html
<hr />
<a href="/docs/dashboard/dashboard-pages/openapi-docs/" class="w-full btn btn-outline link link-hover">
    Next: OpenAPI/Swagger Page
    <i class="fa-regular fa-arrow-right mr-4"></i>
</a>
```
