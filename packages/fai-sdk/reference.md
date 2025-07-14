# Reference

## Analytics

<details><summary><code>client.analytics.<a href="/src/api/resources/analytics/client/Client.ts">getHistogramAnalytics</a>(domain, { ...params }) -> FernFai.HistogramAnalytics</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the usage histogram analytics for a given period

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.analytics.getHistogramAnalytics("domain", {
    start_date: "2024-01-15T09:30:00Z",
    end_date: "2024-01-15T09:30:00Z",
    groupBy: "DAY",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**domain:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `FernFai.GetHistogramAnalyticsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Analytics.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Conversations

<details><summary><code>client.conversations.<a href="/src/api/resources/conversations/client/Client.ts">getConversations</a>(domain, { ...params }) -> FernFai.Conversations</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all paginated chat conversations

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.conversations.getConversations("domain");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**domain:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `FernFai.GetConversationsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Conversations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.conversations.<a href="/src/api/resources/conversations/client/Client.ts">getConversationById</a>(conversationId) -> FernFai.Conversation</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a complete conversation by conversation id

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.conversations.getConversationById("conversation_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**conversationId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Conversations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Queries

<details><summary><code>client.queries.<a href="/src/api/resources/queries/client/Client.ts">createQuery</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Log a new query to the FAI DB

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.queries.createQuery({
    query_id: "query_id",
    conversation_id: "conversation_id",
    domain: "domain",
    text: "text",
    role: "role",
    source: "source",
    created_at: "2024-01-15T09:30:00Z",
    time_to_first_token: undefined,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `FernFai.CreateQueryRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Queries.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
