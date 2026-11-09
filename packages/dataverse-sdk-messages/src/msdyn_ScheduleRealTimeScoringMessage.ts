import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ScheduleRealTimeScoring message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ScheduleRealTimeScoringRequestParameters {
  InputData?: string;
}

/**
 * msdyn_ScheduleRealTimeScoring request message
 *
 * Web API Action: msdyn_ScheduleRealTimeScoring
 */
export class msdyn_ScheduleRealTimeScoringRequest
  extends OrganizationRequest
  implements Executable<msdyn_ScheduleRealTimeScoringResponse>
{
  declare readonly Parameters: Readonly<msdyn_ScheduleRealTimeScoringRequestParameters>;

  constructor(parameters: msdyn_ScheduleRealTimeScoringRequestParameters = {}) {
    super("msdyn_ScheduleRealTimeScoring", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ScheduleRealTimeScoring`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  parseResponse(_response: Response): Promise<msdyn_ScheduleRealTimeScoringResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_ScheduleRealTimeScoringResponse());
  }
}

/**
 * msdyn_ScheduleRealTimeScoring response message
 */
export class msdyn_ScheduleRealTimeScoringResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ScheduleRealTimeScoring");
  }

  static fromResponse(_data?: unknown): msdyn_ScheduleRealTimeScoringResponse {
    return new msdyn_ScheduleRealTimeScoringResponse();
  }
}
