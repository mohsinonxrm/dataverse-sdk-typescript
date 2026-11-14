---
layout: home
editLink: false

hero:
  name: Dataverse SDK for TypeScript
  text: One client for Microsoft Dataverse
  tagline: A modern TypeScript SDK for Dataverse (Online), for Node.js 22+ and modern browsers. ESM-only, native fetch, typed end to end.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Packages
      link: /packages/core
    - theme: alt
      text: API reference
      link: /api/
    - theme: alt
      text: Try the explorer
      link: https://dataverse-sdk.mohsinonxrm.com

features:
  - icon: 🧭
    title: One main path
    details: Every call goes through one DataverseClient and its middleware pipeline. client.api() is the fluent Web API builder for queries and CRUD ($select, $filter, $expand, paging, ETags).
    link: /guide/getting-started
    linkText: Getting started
  - icon: ⚙️
    title: Typed actions and functions
    details: client.execute(new WinOpportunityAction({ … })). A typed class for each Web API action and function of the platform, Sales and Customer Service, plus queryFunctions for $filter.
    link: /packages/actions
    linkText: Actions package
  - icon: 🧬
    title: Generated types
    details: dataverse-gen writes interfaces for your tables, their create and update types, a typed client and classes for your custom APIs.
    link: /packages/generator
    linkText: Generator package
  - icon: 📦
    title: $batch and bulk writes
    details: $batch with change sets and Content-ID references; createMultiple() and updateMultiple() chunk records and return a result per record.
    link: /guide/mapping/bulk-vs-batch
    linkText: Bulk vs $batch
  - icon: 🌐
    title: Node.js and the browser
    details: MSAL for Node.js and the browser, or Azure Identity. The explorer site runs the SDK in your browser, in demo mode or against your own environment.
    link: /guide/browser
    linkText: In the browser
  - icon: 🛡️
    title: Resilience and telemetry
    details: Retry, throttling and concurrency middleware, with OpenTelemetry and Application Insights adapters.
    link: /packages/otel
    linkText: OpenTelemetry package
---

<!-- The content below is the root README's "Which package do I need?" section, added by
     scripts/content.mjs. -->
