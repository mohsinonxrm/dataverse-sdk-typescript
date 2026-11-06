import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from QueryDvUnstructuredData action
 */
export interface QueryDvUnstructuredDataResponse {
  knowledgePluginResponse: string;
}

/**
 * QueryDvUnstructuredData action
 *
 * Unbound action
 */
export class QueryDvUnstructuredDataAction implements Executable<QueryDvUnstructuredDataResponse> {
  constructor(public readonly userQueryText?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryDvUnstructuredData`;

    const body: Record<string, unknown> = {
      userQueryText: this.userQueryText,
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

  async parseResponse(response: Response): Promise<QueryDvUnstructuredDataResponse> {
    const data = await response.json();
    return data as QueryDvUnstructuredDataResponse;
  }
}
