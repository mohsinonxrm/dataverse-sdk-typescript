import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaCreateBotComponents request message
 *
 * Web API Action: PvaCreateBotComponents
 */
export class PvaCreateBotComponentsRequest
  extends OrganizationRequest
  implements Executable<PvaCreateBotComponentsResponse>
{
  constructor(
    public botId: string,
    public botComponents: Record<string, unknown>[]
  ) {
    super("PvaCreateBotComponents");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaCreateBotComponents`;

    const body: Record<string, unknown> = {
      BotComponents: this.botComponents,
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

  async parseResponse(response: Response): Promise<PvaCreateBotComponentsResponse> {
    // No return value (204 No Content)
    return new PvaCreateBotComponentsResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.botId,
      BotComponents: this.botComponents,
    };
  }
}

/**
 * PvaCreateBotComponents response message
 */
export class PvaCreateBotComponentsResponse extends OrganizationResponse {
  constructor() {
    super("PvaCreateBotComponents");
  }

  static fromResponse(_data: unknown): PvaCreateBotComponentsResponse {
    return new PvaCreateBotComponentsResponse();
  }
}
