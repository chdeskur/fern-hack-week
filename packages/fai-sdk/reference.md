# Reference

<details><summary><code>client.<a href="/src/Client.ts">createQuery</a>({ ...params }) -> void</code></summary>
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
await client.createQuery({
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

**requestOptions:** `FernFaiClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

##
