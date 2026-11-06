import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateNewEntityAdditionOptedStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateNewEntityAdditionOptedStatusRequestParameters {
  PredictionName: string;
  PredictionType: string;
  IsNewEntityAdditionOpted: boolean;
}

/**
 * msdyn_UpdateNewEntityAdditionOptedStatus request message
 *
 * Web API Action: msdyn_UpdateNewEntityAdditionOptedStatus
 */
export class msdyn_UpdateNewEntityAdditionOptedStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateNewEntityAdditionOptedStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateNewEntityAdditionOptedStatusRequestParameters>;

  constructor(parameters: msdyn_UpdateNewEntityAdditionOptedStatusRequestParameters) {
    super("msdyn_UpdateNewEntityAdditionOptedStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateNewEntityAdditionOptedStatus`;

    const body = requestBody({
      PredictionName: this.Parameters.PredictionName,
      PredictionType: this.Parameters.PredictionType,
      IsNewEntityAdditionOpted: this.Parameters.IsNewEntityAdditionOpted,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateNewEntityAdditionOptedStatusResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_UpdateNewEntityAdditionOptedStatusResponse());
  }
}

/**
 * msdyn_UpdateNewEntityAdditionOptedStatus response message
 */
export class msdyn_UpdateNewEntityAdditionOptedStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateNewEntityAdditionOptedStatus");
  }

  static fromResponse(_data?: unknown): msdyn_UpdateNewEntityAdditionOptedStatusResponse {
    return new msdyn_UpdateNewEntityAdditionOptedStatusResponse();
  }
}
