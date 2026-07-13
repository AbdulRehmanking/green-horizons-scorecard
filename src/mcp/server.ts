import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { getWeeklyScorecard } from "../domain/services/scorecardService";
import { getAllWeekStarts } from "../lib/dateUtils";

const server = new Server(
  {
    name: "green-horizons-scorecard",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_weekly_scorecard",
        description: "Get weekly scorecard data for Green Horizons",
        inputSchema: {
          type: "object",
          properties: {
            start: {
              type: "string",
              description: "Start date in YYYY-MM-DD format (optional)",
            },
            end: {
              type: "string",
              description: "End date in YYYY-MM-DD format (optional)",
            },
          },
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === "get_weekly_scorecard") {
    const start = args?.start as string | undefined;
    const end = args?.end as string | undefined;
    
    try {
      const data = getWeeklyScorecard(start, end);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
  
  throw new Error(`Tool "${name}" not found`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Green Horizons MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});