---
title: Integrating monoscope with MongoDB
ogTitle: How to Monitor MongoDB Database Operations with monoscope using OpenTelemetry
faLogo: database
date: 2024-06-14
updatedDate: 2024-06-14
linkTitle: "MongoDB"
menuWeight: 20
---

# Integrating monoscope with MongoDB

This guide demonstrates how to integrate monoscope with MongoDB database operations using OpenTelemetry to monitor performance and identify issues.

## Prerequisites

- MongoDB database (local or Atlas)
- MongoDB client application
- monoscope account with an API key

## Setting Up OpenTelemetry for MongoDB

### 1. Configure Environment Variables

Set up OpenTelemetry environment variables in your application environment:

```bash
# Specifies the endpoint URL for the OpenTelemetry collector
export OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"

# Specifies the name of the service
export OTEL_SERVICE_NAME="mongodb-service"

# Adds your API KEY to the resource
export OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"

# Specifies the protocol to use for the OpenTelemetry exporter
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
```

Replace `YOUR_API_KEY` with your actual monoscope project key.

### 2. Instrument MongoDB Client

Below are examples of MongoDB instrumentation using OpenTelemetry for different programming languages:

#### Node.js Example (using MongoDB Native Driver)

```javascript
const { MongoClient } = require('mongodb');
const opentelemetry = require('@opentelemetry/api');

const tracer = opentelemetry.trace.getTracer('mongodb-instrumentation');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'myproject';

async function findDocuments(collection, query = {}) {
  const span = tracer.startSpan('mongodb.query');
  
  try {
    span.setAttribute('db.system', 'mongodb');
    span.setAttribute('db.name', dbName);
    span.setAttribute('db.operation', 'find');
    span.setAttribute('db.mongodb.collection', collection);
    span.setAttribute('db.statement', JSON.stringify(query));
    
    await client.connect();
    const db = client.db(dbName);
    const coll = db.collection(collection);
    
    const documents = await coll.find(query).toArray();
    
    span.setAttribute('db.result_count', documents.length);
    return documents;
  } catch (error) {
    span.recordException(error);
    throw error;
  } finally {
    span.end();
  }
}

async function insertDocument(collection, document) {
  const span = tracer.startSpan('mongodb.insert');
  
  try {
    span.setAttribute('db.system', 'mongodb');
    span.setAttribute('db.name', dbName);
    span.setAttribute('db.operation', 'insert');
    span.setAttribute('db.mongodb.collection', collection);
    
    await client.connect();
    const db = client.db(dbName);
    const coll = db.collection(collection);
    
    const result = await coll.insertOne(document);
    
    span.setAttribute('db.mongodb.inserted_id', result.insertedId.toString());
    return result;
  } catch (error) {
    span.recordException(error);
    throw error;
  } finally {
    span.end();
  }
}
```

#### Java Example (using MongoDB Java Driver)

```java
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class MongoDBExample {
    private final Tracer tracer = GlobalOpenTelemetry.getTracer("mongodb-instrumentation");
    private final MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
    private final MongoDatabase database = mongoClient.getDatabase("myproject");

    public List<Document> findDocuments(String collectionName, Document query) {
        Span span = tracer.spanBuilder("mongodb.query").startSpan();
        try {
            span.setAttribute("db.system", "mongodb");
            span.setAttribute("db.name", "myproject");
            span.setAttribute("db.operation", "find");
            span.setAttribute("db.mongodb.collection", collectionName);
            span.setAttribute("db.statement", query.toJson());
            
            MongoCollection<Document> collection = database.getCollection(collectionName);
            List<Document> documents = new ArrayList<>();
            
            collection.find(query).into(documents);
            
            span.setAttribute("db.result_count", documents.size());
            return documents;
        } catch (Exception e) {
            span.recordException(e);
            throw e;
        } finally {
            span.end();
        }
    }

    public void insertDocument(String collectionName, Document document) {
        Span span = tracer.spanBuilder("mongodb.insert").startSpan();
        try {
            span.setAttribute("db.system", "mongodb");
            span.setAttribute("db.name", "myproject");
            span.setAttribute("db.operation", "insert");
            span.setAttribute("db.mongodb.collection", collectionName);
            
            MongoCollection<Document> collection = database.getCollection(collectionName);
            collection.insertOne(document);
            
            span.setAttribute("db.mongodb.inserted_id", document.getObjectId("_id").toString());
        } catch (Exception e) {
            span.recordException(e);
            throw e;
        } finally {
            span.end();
        }
    }
}
```

### 3. Using OpenTelemetry Auto-Instrumentation Libraries

For easier integration, you can use auto-instrumentation libraries:

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
    'service.name': 'mongodb-service',
  },
});

// Initialize the SDK before importing MongoDB
sdk.start();

// Now it's safe to import and use MongoDB
const { MongoClient } = require('mongodb');
```

#### Java Auto-Instrumentation (using Java Agent)

1. Download the OpenTelemetry Java agent:

```bash
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

2. Run your application with the agent:

```bash
java -javaagent:path/to/opentelemetry-javaagent.jar \
     -Dotel.service.name=mongodb-service \
     -Dotel.exporter.otlp.endpoint=http://otelcol.monoscope.tech:4317 \
     -Dotel.resource.attributes=x-api-key=YOUR_API_KEY \
     -jar your-application.jar
```

```=html
<hr>
```

## Advanced MongoDB Monitoring

### Tracking Slow Queries

To track slow queries, you can enable MongoDB's profiler:

```javascript
const enableProfiling = async () => {
  const span = tracer.startSpan('mongodb.profiler.enable');
  try {
    const db = client.db(dbName);
    // Set profiling level: 0 = off, 1 = slow queries, 2 = all
    await db.command({ profile: 1, slowms: 100 });
    
    // Schedule a check for slow queries
    setInterval(checkSlowQueries, 60000);
  } catch (error) {
    span.recordException(error);
  } finally {
    span.end();
  }
};

const checkSlowQueries = async () => {
  const span = tracer.startSpan('mongodb.profiler.check');
  try {
    const db = client.db(dbName);
    const slowQueries = await db.collection('system.profile').find({}).toArray();
    
    for (const query of slowQueries) {
      const querySpan = tracer.startSpan('mongodb.slow_query');
      querySpan.setAttribute('db.mongodb.operation', query.op);
      querySpan.setAttribute('db.mongodb.collection', query.ns.split('.').pop());
      querySpan.setAttribute('db.mongodb.query', JSON.stringify(query.query || query.command));
      querySpan.setAttribute('db.mongodb.execution_time_ms', query.millis);
      querySpan.setAttribute('db.mongodb.scanned_objects', query.nscanned || 0);
      querySpan.setAttribute('db.mongodb.returned_objects', query.nreturned || 0);
      querySpan.end();
    }
  } catch (error) {
    span.recordException(error);
  } finally {
    span.end();
  }
};
```

### Monitoring MongoDB Server Stats

```javascript
const collectServerStats = async () => {
  const span = tracer.startSpan('mongodb.server_stats');
  try {
    const db = client.db('admin');
    const stats = await db.command({ serverStatus: 1 });
    
    // Record key metrics
    span.setAttribute('mongodb.connections.current', stats.connections.current);
    span.setAttribute('mongodb.connections.available', stats.connections.available);
    span.setAttribute('mongodb.opcounters.insert', stats.opcounters.insert);
    span.setAttribute('mongodb.opcounters.query', stats.opcounters.query);
    span.setAttribute('mongodb.opcounters.update', stats.opcounters.update);
    span.setAttribute('mongodb.opcounters.delete', stats.opcounters.delete);
    span.setAttribute('mongodb.memory.resident_mb', stats.mem.resident);
    span.setAttribute('mongodb.memory.virtual_mb', stats.mem.virtual);
    
    return stats;
  } catch (error) {
    span.recordException(error);
  } finally {
    span.end();
  }
};

// Collect server stats every minute
setInterval(collectServerStats, 60000);
```

## Verifying the Setup

After setting up OpenTelemetry with your MongoDB application:

1. Run your application and perform several database operations

2. Check your monoscope dashboard to see the incoming telemetry data

3. Look for metrics such as:
   - Query execution time
   - Collection operation counts
   - Error rates
   - Result set sizes

## Next Steps

- Set up alerting in monoscope for slow MongoDB queries
- Create custom dashboards for MongoDB performance monitoring
- Correlate database operations with API endpoints to identify bottlenecks