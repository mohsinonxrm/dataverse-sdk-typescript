import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetConnectionRefStatusResponse as msdyn_GetConnectionRefStatusResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetConnectionRefStatusResponse.fromResponse({});
    return msdyn_GetConnectionRefStatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetConnectionRefStatus response message
 */
export class msdyn_GetConnectionRefStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetConnectionRefStatusResponseData) {
    super("msdyn_GetConnectionRefStatus");
  }

  static fromResponse(data: unknown): msdyn_GetConnectionRefStatusResponse {
    return new msdyn_GetConnectionRefStatusResponse(
      responseObject<msdyn_GetConnectionRefStatusResponseData>(data)
    );
  }
}
