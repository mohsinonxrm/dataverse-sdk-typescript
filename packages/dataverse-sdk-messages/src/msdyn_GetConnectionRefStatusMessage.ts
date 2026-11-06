import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetConnectionRefStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetConnectionRefStatusRequestParameters {
  BotConversationId?: string;
}

/**
 * msdyn_GetConnectionRefStatus request message
 *
 * Web API Action: msdyn_GetConnectionRefStatus
 */
export class msdyn_GetConnectionRefStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetConnectionRefStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetConnectionRefStatusRequestParameters>;

  constructor(parameters: msdyn_GetConnectionRefStatusRequestParameters = {}) {
    super("msdyn_GetConnectionRefStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetConnectionRefStatus`;

    const body = requestBody({
      BotConversationId: this.Parameters.BotConversationId,
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
    return msdyn_GetConnectionRefStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetConnectionRefStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetConnectionRefStatusResult {
  "@odata.context"?: string;
  SettingsLink: string;
  connectionRefSuccessfull: boolean;
}

/**
 * msdyn_GetConnectionRefStatus response message
 *
 * `result` is the value the msdyn_GetConnectionRefStatus action returns (see {@link msdyn_GetConnectionRefStatusResult}).
 */
export class msdyn_GetConnectionRefStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetConnectionRefStatusResult) {
    super("msdyn_GetConnectionRefStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetConnectionRefStatusResponse {
    return new msdyn_GetConnectionRefStatusResponse(data as msdyn_GetConnectionRefStatusResult);
  }
}
