import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaDeleteBotComponentCollection request message
 *
 * Web API Action: PvaDeleteBotComponentCollection
 *
 * The first argument is the id of the botcomponentcollection record to call it on.
 */
export class PvaDeleteBotComponentCollectionRequest
  extends OrganizationRequest
  implements Executable<PvaDeleteBotComponentCollectionResponse>
{
  constructor(public botcomponentcollectionId: string) {
    super("PvaDeleteBotComponentCollection");
  }

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
    // No return value (204 No Content)
    return new PvaDeleteBotComponentCollectionResponse();
  }
}

/**
 * PvaDeleteBotComponentCollection response message
 */
export class PvaDeleteBotComponentCollectionResponse extends OrganizationResponse {
  constructor() {
    super("PvaDeleteBotComponentCollection");
  }

  static fromResponse(_data: unknown): PvaDeleteBotComponentCollectionResponse {
    return new PvaDeleteBotComponentCollectionResponse();
  }
}
