import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaDeleteBotComponentCollection action
 */
export interface PvaDeleteBotComponentCollectionResponse {
  // No content returned
}

/**
 * PvaDeleteBotComponentCollection action
 *
 * Bound action
 * Binding parameter: entity (mscrm.botcomponentcollection)
 *
 * The first argument is the id of the botcomponentcollection record to call it on.
 */
export class PvaDeleteBotComponentCollectionAction implements Executable<PvaDeleteBotComponentCollectionResponse> {
  constructor(public readonly botcomponentcollectionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/botcomponentcollections(${this.botcomponentcollectionId})/Microsoft.Dynamics.CRM.PvaDeleteBotComponentCollection`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaDeleteBotComponentCollectionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as PvaDeleteBotComponentCollectionResponse;
  }
}
