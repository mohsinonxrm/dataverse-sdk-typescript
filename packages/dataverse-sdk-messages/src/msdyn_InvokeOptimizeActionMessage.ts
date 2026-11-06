import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InvokeOptimizeActionResponse as msdyn_InvokeOptimizeActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InvokeOptimizeAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeOptimizeActionRequestParameters {
  Context?: string;
  RequestPayload: string;
  ActionType: string;
}

/**
 * msdyn_InvokeOptimizeAction request message
 *
 * Web API Action: msdyn_InvokeOptimizeAction
 */
export class msdyn_InvokeOptimizeActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeOptimizeActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeOptimizeActionRequestParameters>;

  constructor(parameters: msdyn_InvokeOptimizeActionRequestParameters) {
    super("msdyn_InvokeOptimizeAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeOptimizeAction`;

    const body = requestBody({
      Context: this.Parameters.Context,
      RequestPayload: this.Parameters.RequestPayload,
      ActionType: this.Parameters.ActionType,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeOptimizeActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_InvokeOptimizeActionResponse.fromResponse({});
    return msdyn_InvokeOptimizeActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_InvokeOptimizeAction response message
 */
export class msdyn_InvokeOptimizeActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeOptimizeActionResponseData) {
    super("msdyn_InvokeOptimizeAction");
  }

  static fromResponse(data: unknown): msdyn_InvokeOptimizeActionResponse {
    return new msdyn_InvokeOptimizeActionResponse(
      responseObject<msdyn_InvokeOptimizeActionResponseData>(data)
    );
  }
}
