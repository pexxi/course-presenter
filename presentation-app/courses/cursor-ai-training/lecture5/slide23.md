---
title: "Advanced Workflows"
type: "content"
---

# Advanced Workflows

## Advanced MCP Server Features

### Transport Evolution (2025)

- **Streamable HTTP Transport**: Latest standard replacing stdio
- **Server-Sent Events (SSE)**: For real-time data streaming
- **WebSocket Support**: For bi-directional communication
- **HTTP+SSE**: Deprecated but still supported

### Latest MCP Capabilities

- **Resource Templates**: Dynamic resource generation
- **Progress Notifications**: Long-running operation tracking  
- **Sampling Integration**: Direct LLM sampling within servers
- **Annotation Support**: Content metadata and priority system

<!-- Speaker Notes:
The evolution of MCP from its November 2024 launch to where we are today in 2025 demonstrates how quickly foundational technologies can mature when they address real industry needs. What you're seeing here represents significant architectural improvements based on real-world usage patterns.

The transport evolution is particularly important for enterprise deployments. The original stdio transport worked well for development and simple use cases, but production environments needed more robust communication mechanisms. Streamable HTTP transport provides better error handling, monitoring capabilities, and integration with existing infrastructure.

Server-Sent Events represent a major advancement for real-time applications. When you have AI agents processing large datasets or performing long-running operations, the ability to stream progress updates and intermediate results transforms the user experience. Instead of waiting for complete responses, users get real-time feedback on operation progress.

WebSocket support enables truly interactive AI experiences. Think about collaborative editing scenarios where multiple users and AI agents are working together in real-time. The bi-directional communication capability opens up entirely new workflow possibilities that weren't feasible with request-response patterns.

Resource templates address one of the early limitations of MCP - the need to pre-define all available resources. Dynamic resource generation means AI agents can discover and access data that's created or modified during their operation. This is crucial for applications where the data landscape changes frequently.

Progress notifications solve a critical user experience problem. When AI agents perform complex operations - like analyzing large codebases or processing extensive datasets - users need visibility into operation status. The progress notification system provides standardized ways to communicate operation status, estimated completion times, and intermediate results.

The sampling integration feature represents a significant architectural advancement. Instead of AI agents making external calls for LLM operations, MCP servers can now perform sampling directly. This reduces latency, improves security by keeping sensitive data within your infrastructure, and enables more sophisticated AI workflows within enterprise boundaries.

These improvements show how rapidly this technology is maturing, but they also highlight the importance of staying current with MCP developments and planning your implementations with future capabilities in mind.
-->
