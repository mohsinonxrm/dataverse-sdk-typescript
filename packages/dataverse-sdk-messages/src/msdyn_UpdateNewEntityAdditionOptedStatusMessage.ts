import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateNewEntityAdditionOptedStatus request message
 *
 * Web API Action: msdyn_UpdateNewEntityAdditionOptedStatus
 */
export class msdyn_UpdateNewEntityAdditionOptedStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateNewEntityAdditionOptedStatusResponse>
{
  constructor(
    public predictionName: string,
    public predictionType: string,
    public isNewEntityAdditionOpted: boolean
  ) {
    super("msdyn_UpdateNewEntityAdditionOptedStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateNewEntityAdditionOptedStatus`;

    const body: Record<string, unknown> = {
      PredictionName: this.predictionName,
      PredictionType: this.predictionType,
      IsNewEntityAdditionOpted: this.isNewEntityAdditionOpted,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateNewEntityAdditionOptedStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateNewEntityAdditionOptedStatusResponse();
  }
}

/**
 * msdyn_UpdateNewEntityAdditionOptedStatus response message
 */
export class msdyn_UpdateNewEntityAdditionOptedStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateNewEntityAdditionOptedStatus");
  }

  static fromResponse(_data: unknown): msdyn_UpdateNewEntityAdditionOptedStatusResponse {
    return new msdyn_UpdateNewEntityAdditionOptedStatusResponse();
  }
}
