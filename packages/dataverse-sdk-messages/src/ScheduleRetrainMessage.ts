import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ScheduleRetrainResponse as ScheduleRetrainResponseData } from "./types/index.js";

/**
 * ScheduleRetrain request message
 *
 * Web API Action: ScheduleRetrain
 */
export class ScheduleRetrainRequest
  extends OrganizationRequest
  implements Executable<ScheduleRetrainResponse>
{
  constructor(
    public msdyn_aimodelId: string,
    public recurrence: string,
    public version: string
  ) {
    super("ScheduleRetrain");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.ScheduleRetrain`;

    const body: Record<string, unknown> = {
      recurrence: this.recurrence,
      version: this.version,
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

  async parseResponse(response: Response): Promise<ScheduleRetrainResponse> {
    const data = await response.json();
    return ScheduleRetrainResponse.fromResponse(data);
  }
}

/**
 * ScheduleRetrain response message
 */
export class ScheduleRetrainResponse extends OrganizationResponse {
  constructor(public result: ScheduleRetrainResponseData) {
    super("ScheduleRetrain");
  }

  static fromResponse(data: unknown): ScheduleRetrainResponse {
    return new ScheduleRetrainResponse(responseObject<ScheduleRetrainResponseData>(data));
  }
}
