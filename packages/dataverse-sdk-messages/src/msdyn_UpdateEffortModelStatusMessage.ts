import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdateEffortModelStatusResponse as msdyn_UpdateEffortModelStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpdateEffortModelStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateEffortModelStatusRequestParameters {
  AiConfigId: string;
  EffortModelId: string;
}

/**
 * msdyn_UpdateEffortModelStatus request message
 *
 * Web API Action: msdyn_UpdateEffortModelStatus
 */
export class msdyn_UpdateEffortModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateEffortModelStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateEffortModelStatusRequestParameters>;

  constructor(parameters: msdyn_UpdateEffortModelStatusRequestParameters) {
    super("msdyn_UpdateEffortModelStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateEffortModelStatus`;

    const body = requestBody({
      AiConfigId: this.Parameters.AiConfigId,
      EffortModelId: this.Parameters.EffortModelId,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateEffortModelStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_UpdateEffortModelStatusResponse.fromResponse({});
    return msdyn_UpdateEffortModelStatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UpdateEffortModelStatus response message
 */
export class msdyn_UpdateEffortModelStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateEffortModelStatusResponseData) {
    super("msdyn_UpdateEffortModelStatus");
  }

  static fromResponse(data: unknown): msdyn_UpdateEffortModelStatusResponse {
    return new msdyn_UpdateEffortModelStatusResponse(
      responseObject<msdyn_UpdateEffortModelStatusResponseData>(data)
    );
  }
}
