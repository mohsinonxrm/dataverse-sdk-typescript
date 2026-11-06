import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExecuteCopilotServiceJobResponse as msdyn_ExecuteCopilotServiceJobResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ExecuteCopilotServiceJob message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteCopilotServiceJobRequestParameters {
  msdyn_JobPayload?: string;
  msdyn_JobType: number;
  msdyn_AuthFlowType?: number;
}

/**
 * msdyn_ExecuteCopilotServiceJob request message
 *
 * Web API Action: msdyn_ExecuteCopilotServiceJob
 */
export class msdyn_ExecuteCopilotServiceJobRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteCopilotServiceJobResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteCopilotServiceJobRequestParameters>;

  constructor(parameters: msdyn_ExecuteCopilotServiceJobRequestParameters) {
    super("msdyn_ExecuteCopilotServiceJob", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteCopilotServiceJob`;

    const body = requestBody({
      msdyn_JobPayload: this.Parameters.msdyn_JobPayload,
      msdyn_JobType: this.Parameters.msdyn_JobType,
      msdyn_AuthFlowType: this.Parameters.msdyn_AuthFlowType,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteCopilotServiceJobResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ExecuteCopilotServiceJobResponse.fromResponse({});
    return msdyn_ExecuteCopilotServiceJobResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ExecuteCopilotServiceJob response message
 */
export class msdyn_ExecuteCopilotServiceJobResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteCopilotServiceJobResponseData) {
    super("msdyn_ExecuteCopilotServiceJob");
  }

  static fromResponse(data: unknown): msdyn_ExecuteCopilotServiceJobResponse {
    return new msdyn_ExecuteCopilotServiceJobResponse(
      responseObject<msdyn_ExecuteCopilotServiceJobResponseData>(data)
    );
  }
}
