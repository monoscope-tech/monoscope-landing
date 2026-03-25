---
title: Integrating monoscope with MySQL
ogTitle: How to Monitor MySQL Database Operations with monoscope using OpenTelemetry
faLogo: database
date: 2024-06-14
updatedDate: 2024-06-14
linkTitle: "MySQL"
menuWeight: 30
---

# Integrating monoscope with MySQL

This guide demonstrates how to integrate monoscope with MySQL database operations using OpenTelemetry to monitor query performance and identify issues.

```=html
<hr>
```

## Prerequisites

- MySQL database server
- Database client application
- monoscope account with an API key

## Setting Up OpenTelemetry for MySQL

### 1. Configure Environment Variables

Set up OpenTelemetry environment variables in your application environment:

```bash
# Specifies the endpoint URL for the OpenTelemetry collector
export OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"

# Specifies the name of the service
export OTEL_SERVICE_NAME="mysql-service"

# Adds your API KEY to the resource
export OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"

# Specifies the protocol to use for the OpenTelemetry exporter
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
```

Replace `YOUR_API_KEY` with your actual monoscope project key.

### 2. Instrument MySQL Database Client

Below are examples of MySQL instrumentation using OpenTelemetry for different programming languages:

#### Java Example (using JDBC)

```java
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class MySQLExample {
    private final Tracer tracer = GlobalOpenTelemetry.getTracer("mysql-instrumentation");
    private final String jdbcUrl = "jdbc:mysql://localhost:3306/mydatabase";
    private final String username = "user";
    private final String password = "password";

    public List<Product> getProducts() {
        Span span = tracer.spanBuilder("mysql.query").startSpan();
        try {
            span.setAttribute("db.system", "mysql");
            span.setAttribute("db.name", "mydatabase");
            span.setAttribute("db.operation", "SELECT");
            span.setAttribute("db.statement", "SELECT id, name, price FROM products");
            
            List<Product> products = new ArrayList<>();
            
            try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
                 PreparedStatement stmt = conn.prepareStatement("SELECT id, name, price FROM products");
                 ResultSet rs = stmt.executeQuery()) {
                
                while (rs.next()) {
                    Product product = new Product();
                    product.setId(rs.getLong("id"));
                    product.setName(rs.getString("name"));
                    product.setPrice(rs.getBigDecimal("price"));
                    products.add(product);
                }
            }
            
            span.setAttribute("db.result_count", products.size());
            return products;
        } catch (Exception e) {
            span.recordException(e);
            throw new RuntimeException("Failed to query products", e);
        } finally {
            span.end();
        }
    }

    public void createProduct(Product product) {
        Span span = tracer.spanBuilder("mysql.insert").startSpan();
        try {
            span.setAttribute("db.system", "mysql");
            span.setAttribute("db.name", "mydatabase");
            span.setAttribute("db.operation", "INSERT");
            span.setAttribute("db.statement", "INSERT INTO products (name, price) VALUES (?, ?)");
            
            try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
                 PreparedStatement stmt = conn.prepareStatement("INSERT INTO products (name, price) VALUES (?, ?)")) {
                
                stmt.setString(1, product.getName());
                stmt.setBigDecimal(2, product.getPrice());
                int rowsAffected = stmt.executeUpdate();
                
                span.setAttribute("db.rows_affected", rowsAffected);
            }
        } catch (Exception e) {
            span.recordException(e);
            throw new RuntimeException("Failed to create product", e);
        } finally {
            span.end();
        }
    }
}
```

#### Node.js Example (using mysql2)

```javascript
const mysql = require('mysql2/promise');
const opentelemetry = require('@opentelemetry/api');

const tracer = opentelemetry.trace.getTracer('mysql-instrumentation');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'mydatabase',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function getProducts() {
  const span = tracer.startSpan('mysql.query');
  
  try {
    span.setAttribute('db.system', 'mysql');
    span.setAttribute('db.name', 'mydatabase');
    span.setAttribute('db.operation', 'SELECT');
    span.setAttribute('db.statement', 'SELECT id, name, price FROM products');
    
    const [rows] = await pool.query('SELECT id, name, price FROM products');
    
    span.setAttribute('db.result_count', rows.length);
    return rows;
  } catch (error) {
    span.recordException(error);
    throw error;
  } finally {
    span.end();
  }
}

async function createProduct(name, price) {
  const span = tracer.startSpan('mysql.insert');
  
  try {
    span.setAttribute('db.system', 'mysql');
    span.setAttribute('db.name', 'mydatabase');
    span.setAttribute('db.operation', 'INSERT');
    span.setAttribute('db.statement', 'INSERT INTO products (name, price) VALUES (?, ?)');
    
    const [result] = await pool.query(
      'INSERT INTO products (name, price) VALUES (?, ?)',
      [name, price]
    );
    
    span.setAttribute('db.rows_affected', result.affectedRows);
    span.setAttribute('db.mysql.insert_id', result.insertId);
    
    return result;
  } catch (error) {
    span.recordException(error);
    throw error;
  } finally {
    span.end();
  }
}
```

### 3. Using OpenTelemetry Auto-Instrumentation Libraries

For easier integration, you can use auto-instrumentation libraries:

#### Java Auto-Instrumentation (using Java Agent)

1. Download the OpenTelemetry Java agent:

```bash
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

2. Run your application with the agent:

```bash
java -javaagent:path/to/opentelemetry-javaagent.jar \
     -Dotel.service.name=mysql-service \
     -Dotel.exporter.otlp.endpoint=http://otelcol.monoscope.tech:4317 \
     -Dotel.resource.attributes=x-api-key=YOUR_API_KEY \
     -jar your-application.jar
```

#### Node.js Auto-Instrumentation

1. Install required packages:

```bash
npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-proto
```

2. Set up auto-instrumentation in your application:

```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://otelcol.monoscope.tech:4317/v1/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  resourceAttributes: {
    'x-api-key': 'YOUR_API_KEY',
    'service.name': 'mysql-service',
  },
});

// Initialize the SDK before importing MySQL
sdk.start();

// Now it's safe to import and use MySQL
const mysql = require('mysql2/promise');
```

## Advanced MySQL Monitoring

### Monitoring Slow Queries

To identify slow MySQL queries:

1. Enable slow query log in MySQL:

```sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL slow_query_log_file = '/var/log/mysql/mysql-slow.log';
SET GLOBAL long_query_time = 1.0;  -- Log queries taking more than 1 second
```

2. Create a monitoring script that periodically checks the slow query log:

```javascript
const fs = require('fs');
const readline = require('readline');
const opentelemetry = require('@opentelemetry/api');

const tracer = opentelemetry.trace.getTracer('mysql-slow-query-monitor');
const slowLogPath = '/var/log/mysql/mysql-slow.log';

async function monitorSlowQueries() {
  const span = tracer.startSpan('mysql.slow_query_check');
  
  try {
    // Get file size to track changes
    const stats = fs.statSync(slowLogPath);
    const fileSize = stats.size;
    
    // Read only new entries since last check
    if (global.lastFileSize && global.lastFileSize < fileSize) {
      const stream = fs.createReadStream(slowLogPath, {
        start: global.lastFileSize,
        end: fileSize
      });
      
      const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
      });
      
      let currentQuery = {
        time: null,
        user: null,
        query: ''
      };
      
      for await (const line of rl) {
        if (line.startsWith('# Time:')) {
          currentQuery.time = line.substring(8).trim();
        } else if (line.startsWith('# User@Host:')) {
          currentQuery.user = line.substring(12).trim();
        } else if (line.startsWith('# Query_time:')) {
          const queryTimeMatch = line.match(/Query_time: (\d+\.\d+)/);
          if (queryTimeMatch) {
            currentQuery.queryTime = parseFloat(queryTimeMatch[1]);
          }
        } else if (line && !line.startsWith('#')) {
          currentQuery.query += line + ' ';
        } else if (line === '' && currentQuery.query) {
          // End of a query record
          reportSlowQuery(currentQuery);
          currentQuery = {
            time: null,
            user: null,
            query: ''
          };
        }
      }
    }
    
    global.lastFileSize = fileSize;
  } catch (error) {
    span.recordException(error);
    console.error('Error monitoring slow queries:', error);
  } finally {
    span.end();
  }
}

function reportSlowQuery(queryInfo) {
  const span = tracer.startSpan('mysql.slow_query');
  
  try {
    span.setAttribute('db.system', 'mysql');
    span.setAttribute('db.query_time_seconds', queryInfo.queryTime);
    span.setAttribute('db.user', queryInfo.user);
    span.setAttribute('db.statement', queryInfo.query.trim());
    
    console.log(`Detected slow query: ${queryInfo.queryTime}s - ${queryInfo.query.trim()}`);
  } finally {
    span.end();
  }
}

// Initialize last file size
global.lastFileSize = fs.statSync(slowLogPath).size;

// Check for slow queries every minute
setInterval(monitorSlowQueries, 60000);
```

### Monitoring MySQL Server Metrics

```javascript
async function collectMySQLMetrics() {
  const span = tracer.startSpan('mysql.server_metrics');
  
  try {
    // Connect to MySQL and fetch global status
    const [rows] = await pool.query('SHOW GLOBAL STATUS');
    
    // Convert to key-value object
    const metrics = {};
    for (const row of rows) {
      metrics[row.Variable_name] = row.Value;
    }
    
    // Record key metrics
    span.setAttribute('mysql.connections', metrics.Connections);
    span.setAttribute('mysql.threads_connected', metrics.Threads_connected);
    span.setAttribute('mysql.questions', metrics.Questions);
    span.setAttribute('mysql.slow_queries', metrics.Slow_queries);
    span.setAttribute('mysql.uptime', metrics.Uptime);
    span.setAttribute('mysql.com_select', metrics.Com_select);
    span.setAttribute('mysql.com_insert', metrics.Com_insert);
    span.setAttribute('mysql.com_update', metrics.Com_update);
    span.setAttribute('mysql.com_delete', metrics.Com_delete);
    
    return metrics;
  } catch (error) {
    span.recordException(error);
    console.error('Error collecting MySQL metrics:', error);
  } finally {
    span.end();
  }
}

// Collect MySQL metrics every minute
setInterval(collectMySQLMetrics, 60000);
```

## Verifying the Setup

After setting up OpenTelemetry with your MySQL application:

1. Run your application and perform several database operations

2. Check your monoscope dashboard to see the incoming telemetry data

3. Look for metrics such as:
   - Query execution time
   - Database operation counts
   - Error rates
   - Result set sizes

## Next Steps

- Set up alerting in monoscope for slow MySQL queries
- Create custom dashboards for MySQL performance monitoring
- Correlate database operations with API endpoints to identify bottlenecks