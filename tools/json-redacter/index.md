---
title: Test JSON Redaction via JSONPath
date: 2024-06-06
hide_date: true
---

```=html
<section class="our_container w-full px-6 md:px-0 lg:px-0">
```

## Test JSON Redaction via JSONPath

```=html
<script src="jsonpath.min.js"></script>
<script src="jsonpath-plus-umd.min.cjs"></script>
<script>
    // Source: https://github.com/monoscope-tech/monoscope-js/blob/main/src/payload.ts
    function redactFields(body, fieldsToRedact) {
      try {
        const bodyOB = JSON.parse(body);
        fieldsToRedact.forEach((path) => {
          jsonpath.apply(bodyOB, path, function () {
            return "[CLIENT_REDACTED]";
          });
        });
        return JSON.stringify(bodyOB, null, 2);
      } catch (err) {
        console.error(err)
        alert(err.message)
        return "Error redacting JSON, please check your JSON and JSONPath expressions";
      }
    }

    function redactFieldsPlus(body, fieldsToRedact) {
      try {
        const bodyOB = JSON.parse(body);
        fieldsToRedact.forEach((path) => {
          JSONPath.JSONPath({
            path,
            json: bodyOB,
            callback: (value, type, payload) => {
              payload.parent[payload.parentProperty] = "[CLIENT_REDACTED]";
            }
          });
        });
        return JSON.stringify(bodyOB, null, 2);
      } catch (err) {
        console.error(err);
        document.getElementById('redactedResultError').innerHTML = err;
        return body;
      }
    }

    function redact(){
        var expressionsTxtList = document.getElementById("expressions").value.trim().split("\n").map(x=>x.trim());
        var jsonToRedact = document.getElementById("jsonToRedact").value.trim();
        var redactedResult = redactFields(jsonToRedact, expressionsTxtList);

        const highlightedCode = hljs.highlight(redactedResult, { language: 'json' }).value
        document.getElementById("redactedResult").innerHTML = highlightedCode;
    }
    function adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto'; // Reset the height to auto to correctly calculate the new height
        textarea.style.height = (textarea.scrollHeight) + 'px'; // Set the height to the scrollHeight of the textarea
    }

    // Optionally, you can also call the function initially to adjust the height based on the initial content
    document.addEventListener('DOMContentLoaded', function() {
        adjustTextareaHeight(document.getElementById('jsonToRedact'));
        adjustTextareaHeight(document.getElementById('expressions'));
    });
</script>

<div class="collapse bg-base-200">
  <input type="checkbox" />
  <div class="collapse-title text-md font-medium">
    Expand quick JSONPath cheat sheet &nbsp; <i class="fa-solid fa-angles-down"></i>
  </div>
  <div class="collapse-content">
<table><thead><tr><th>Expression</th><th>Meaning</th></tr></thead><tbody><tr><td style="text-align:left;"><code>$.store.*</code></td><td style="text-align:left;">All direct properties of <code>store</code> (not recursive).</td></tr><tr><td style="text-align:left;"><code>$.store.bicycle.color</code></td><td style="text-align:left;">The color of the bicycle in the store. <br> Result: <code>red</code></td></tr><tr><td style="text-align:left;"><code>$.store..price</code> <code><br></code> <code>$..price</code></td><td style="text-align:left;">The prices of all items in the store. <br> Result: <code>[8.95, 8.99, 22.99, 19.95]</code></td></tr><tr><td style="text-align:left;"><code>$.store.book[*]</code> <br> <code>$..book[*]</code></td><td style="text-align:left;">All books in the store.</td></tr><tr><td style="text-align:left;"><code>$..book[*].title</code></td><td style="text-align:left;">The titles of all books in the store. <br> Result: <br> <code>[Sayings of the Century, <br> Moby Dick, <br> The Lord of the Rings]</code></td></tr><tr><td style="text-align:left;"><code>$..book[0]</code></td><td style="text-align:left;">The first book. <br> Result: <br> <code>[{ "category":"reference", "author":"Nigel Rees", "title":"Sayings of the Century", "price":8.95 } ]</code></td></tr><tr><td style="text-align:left;"><code>$..book[0].title</code></td><td style="text-align:left;">The title of the first book. <br> Result: <code>Sayings of the Century</code></td></tr><tr><td style="text-align:left;"><code>$..book[0,1].title</code> <br> <code>$..book[:2].title</code></td><td style="text-align:left;">The titles of the first two books. <br> Result: <code>[Sayings of the Century, Moby Dick]</code></td></tr><tr><td style="text-align:left;"><code>$..book[-1:].title</code> <br> <code>$..book[(@.length-1)].title</code></td><td style="text-align:left;">The title of the last book. <br> Result: <code>[The Lord of the Rings]</code> <br> The result is a <a href="#multiple">list</a>, because <code>[<i>-n</i>:]</code> always returns lists.</td></tr><tr><td style="text-align:left;"><code>$..book[?(@.author=='J.R.R. Tolkien')].title</code></td><td style="text-align:left;">The titles of all books by <strong>J.R.R. Tolkien</strong> (exact match, case-sensitive). <br> Result: <code>[The Lord of the Rings]</code> <br> The result is a list, because filters always return lists.</td></tr><tr><td style="text-align:left;"><code>$..book[?(@.isbn)]</code></td><td style="text-align:left;">All books that have the <code>isbn</code> property.</td></tr><tr><td style="text-align:left;"><code>$..book[?(!@.isbn)]</code></td><td style="text-align:left;">All books without the <code>isbn</code> property.</td></tr><tr><td style="text-align:left;"><code>$..book[?(@.price &lt; 10)]</code></td><td style="text-align:left;">All books cheaper than 10.</td></tr><tr><td style="text-align:left;"><code>$..book[?(@.price &gt; $.expensive)]</code></td><td style="text-align:left;">All expensive books.</td></tr><tr><td style="text-align:left;"><code>$..book[?(@.author =~ /.*Tolkien/i)]</code></td><td style="text-align:left;">All books whose author name ends with <strong>Tolkien</strong> (case-insensitive).</td></tr><tr><td style="text-align:left;"><code>$..*</code></td><td style="text-align:left;">All members of the JSON structure beneath the root (child objects, individual property values, array items), combined into an array.</td></tr></tbody></table>
  </div>
</div>

<hr />

<section class="flex flex-row gap-8 pt-5">
    <div class="flex-1">
        Enter your JSON content here:
        <textarea class="textarea textarea-bordered w-full" id="jsonToRedact" oninput="adjustTextareaHeight(this)" rows="1" style="overflow:hidden;">
{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}
        </textarea>
    </div>
    <div class="flex-1">
        Enter your JSONPath Expressions here (1 per line):
<textarea class="textarea textarea-bordered w-full" id="expressions">
$.store.book[*].*
$.store.bicycle.color
</textarea>
        <button class="btn py-3 px-6 bg-fillBrand-strong text-textInverse-strong rounded-lg font-medium hover:bg-fillBrand-weak transition-colors" onclick="redact()">Redact</button>
        <code class="language-js block" id="redactedResultError"></code>
        <pre><code class="language-js" id="redactedResult"></code></pre>
    </div>
</section>

```

```=html
</section>
```
