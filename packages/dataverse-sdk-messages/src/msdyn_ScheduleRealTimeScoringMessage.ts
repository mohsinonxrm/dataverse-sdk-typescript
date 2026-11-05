import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ScheduleRealTimeScoring request message
 *
 * Web API Action: msdyn_ScheduleRealTimeScoring
 */
export class msdyn_ScheduleRealTimeScoringRequest
  extends OrganizationRequest
  implements Executable<msdyn_ScheduleRealTimeScoringResponse>
{
  constructor(public inputData: string) {
    super("msdyn_ScheduleRealTimeScoring");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ScheduleRealTimeScoring`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_ScheduleRealTimeScoringResponse> {
    // No return value (204 No Content)
    return new msdyn_ScheduleRealTimeScoringResponse();
  }
}

/**
 * msdyn_ScheduleRealTimeScoring response message
 */
export class msdyn_ScheduleRealTimeScoringResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ScheduleRealTimeScoring");
  }

  static fromResponse(_data: unknown): msdyn_ScheduleRealTimeScoringResponse {
    return new msdyn_ScheduleRealTimeScoringResponse();
  }
}
