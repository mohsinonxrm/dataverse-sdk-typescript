import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaDeleteBot request message
 *
 * Web API Action: PvaDeleteBot
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaDeleteBotRequest
  extends OrganizationRequest
  implements Executable<PvaDeleteBotResponse>
{
  constructor(public botId: string) {
    super("PvaDeleteBot");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaDeleteBot`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaDeleteBotResponse> {
    // No return value (204 No Content)
    return new PvaDeleteBotResponse();
  }
}

/**
 * PvaDeleteBot response message
 */
export class PvaDeleteBotResponse extends OrganizationResponse {
  constructor() {
    super("PvaDeleteBot");
  }

  static fromResponse(_data: unknown): PvaDeleteBotResponse {
    return new PvaDeleteBotResponse();
  }
}
