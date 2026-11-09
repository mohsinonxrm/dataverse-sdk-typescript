import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetConnectionRefStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetConnectionRefStatusResponse {
  "@odata.context"?: string;
  SettingsLink: string;
  connectionRefSuccessfull: boolean;
}

/**
 * Parameters of the msdyn_GetConnectionRefStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetConnectionRefStatusActionParameters {
  BotConversationId?: string;
}

/**
 * msdyn_GetConnectionRefStatus action
 *
 * Unbound action
 */
export class msdyn_GetConnectionRefStatusAction implements Executable<msdyn_GetConnectionRefStatusResponse> {
  constructor(public readonly parameters: msdyn_GetConnectionRefStatusActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetConnectionRefStatus`;

    const body = requestBody({
      BotConversationId: this.parameters.BotConversationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetConnectionRefStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetConnectionRefStatusResponse;
  }
}
