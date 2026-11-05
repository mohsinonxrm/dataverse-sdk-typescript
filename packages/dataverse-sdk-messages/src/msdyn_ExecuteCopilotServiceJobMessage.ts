import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ExecuteCopilotServiceJobResponse as msdyn_ExecuteCopilotServiceJobResponseData } from "./types/index.js";

/**
 * msdyn_ExecuteCopilotServiceJob request message
 *
 * Web API Action: msdyn_ExecuteCopilotServiceJob
 */
export class msdyn_ExecuteCopilotServiceJobRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteCopilotServiceJobResponse>
{
  constructor(
    public msdyn_JobPayload: string,
    public msdyn_JobType: number,
    public msdyn_AuthFlowType: number
  ) {
    super("msdyn_ExecuteCopilotServiceJob");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteCopilotServiceJob`;

    const body: Record<string, unknown> = {
      msdyn_JobPayload: this.msdyn_JobPayload,
      msdyn_JobType: this.msdyn_JobType,
      msdyn_AuthFlowType: this.msdyn_AuthFlowType,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteCopilotServiceJobResponse> {
    const data = await response.json();
    return msdyn_ExecuteCopilotServiceJobResponse.fromResponse(data);
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
