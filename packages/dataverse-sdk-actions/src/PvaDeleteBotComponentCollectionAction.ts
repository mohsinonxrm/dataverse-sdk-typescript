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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaDeleteBotComponentCollectionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
