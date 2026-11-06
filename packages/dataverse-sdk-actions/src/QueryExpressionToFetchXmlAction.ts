import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Response from QueryExpressionToFetchXml action
 */
export interface QueryExpressionToFetchXmlResponse {
  FetchXml: string;
}

/**
 * QueryExpressionToFetchXml action
 *
 * Unbound action
 */
export class QueryExpressionToFetchXmlAction implements Executable<QueryExpressionToFetchXmlResponse> {
  constructor(public readonly query?: TypedQueryBase) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryExpressionToFetchXml`;

    const body: Record<string, unknown> = {
      Query: this.query,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<QueryExpressionToFetchXmlResponse> {
    const data = await response.json();
    return data as QueryExpressionToFetchXmlResponse;
  }
}
