import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { type ModelName, NAVITEMS } from "~/types/types"
import { env } from "~/env"
import fetch from "node-fetch"
import https from "https"

// Create an https agent that accepts self-signed certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  keepAlive: true,
  // Increase timeout
  timeout: 10000
});

// Get searchable nav items
const searchableNavItems = NAVITEMS.filter(item =>
  item.model_type !== 'vocabulary' &&
  item.permissions !== 'IsAdmin' &&
  item.search_fields.length > 0
);

// Create enum from nav item types
const ModelNameEnum = z.enum(
  searchableNavItems.map(item => item.type) as [ModelName, ...ModelName[]]
);

// Define the search result types
interface SearchResult {
  items: unknown[];
  count: number;
}

interface SearchResponse {
  results: {
    [key: string]: SearchResult;
  };
  query: string;
  selected_types: string[];
}


export const searchRouter = createTRPCRouter({
  query: publicProcedure
    .input(z.object({
      types: z.array(ModelNameEnum),
      query: z.string().min(1)
    }))
    .mutation(async ({ input }): Promise<SearchResponse> => {

      try {
        const queryParams = new URLSearchParams({
          query: input.query,
          types: JSON.stringify(input.types)
        });

        const url = `${env.REACT_APP_API_HOST}/api/search?${queryParams}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Origin': env.REACT_APP_API_HOST,
            'X-Requested-With': 'XMLHttpRequest'
          },
          agent: httpsAgent,
          timeout: 10000
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('Search request failed:', {
            status: response.status,
            statusText: response.statusText,
            errorData
          });
          throw new Error(`Search request failed: ${response.statusText}`);
        }

        const searchResults: SearchResponse = await response.json();
        console.log('Search results:', searchResults);
        return searchResults;
      } catch (error) {
        console.error('Search error:', {
          error,
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        return {
          results: {},
          query: input.query,
          selected_types: input.types
        };
      }
    })
}); 