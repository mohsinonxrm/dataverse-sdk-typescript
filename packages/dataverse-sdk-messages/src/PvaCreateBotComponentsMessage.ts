import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the PvaCreateBotComponents message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaCreateBotComponentsRequestParameters {
  BotComponents: Record<string, unknown>[];
}

/**
 * PvaCreateBotComponents request message
 *
 * Web API Action: PvaCreateBotComponents
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaCreateBotComponentsRequest
  extends OrganizationRequest
  implements Executable<PvaCreateBotComponentsResponse>
{
  declare readonly Parameters: Readonly<PvaCreateBotComponentsRequestParameters>;

  constructor(
    public botId: string,
    parameters: PvaCreateBotComponentsRequestParameters
  ) {
    super("PvaCreateBotComponents", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${odataLiteral.guid(this.botId)})/Microsoft.Dynamics.CRM.PvaCreateBotComponents`;

    const body = requestBody({
      BotComponents: this.Parameters.BotComponents,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  parseResponse(_response: Response): Promise<PvaCreateBotComponentsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new PvaCreateBotComponentsResponse());
  }
}

/**
 * PvaCreateBotComponents response message
 */
export class PvaCreateBotComponentsResponse extends OrganizationResponse {
  constructor() {
    super("PvaCreateBotComponents");
  }

  static fromResponse(_data?: unknown): PvaCreateBotComponentsResponse {
    return new PvaCreateBotComponentsResponse();
  }
}
