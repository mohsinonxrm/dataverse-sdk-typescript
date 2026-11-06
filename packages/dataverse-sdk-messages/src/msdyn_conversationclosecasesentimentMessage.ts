import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_conversationclosecasesentiment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_conversationclosecasesentimentRequestParameters {
  LiveWorkItemGuid: string;
}

/**
 * msdyn_conversationclosecasesentiment request message
 *
 * Web API Action: msdyn_conversationclosecasesentiment
 */
export class msdyn_conversationclosecasesentimentRequest
  extends OrganizationRequest
  implements Executable<msdyn_conversationclosecasesentimentResponse>
{
  declare readonly Parameters: Readonly<msdyn_conversationclosecasesentimentRequestParameters>;

  constructor(parameters: msdyn_conversationclosecasesentimentRequestParameters) {
    super("msdyn_conversationclosecasesentiment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_conversationclosecasesentiment`;

    const body = requestBody({
      LiveWorkItemGuid: this.Parameters.LiveWorkItemGuid,
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

  async parseResponse(response: Response): Promise<msdyn_conversationclosecasesentimentResponse> {
    // No return value (204 No Content)
    return new msdyn_conversationclosecasesentimentResponse();
  }
}

/**
 * msdyn_conversationclosecasesentiment response message
 */
export class msdyn_conversationclosecasesentimentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_conversationclosecasesentiment");
  }

  static fromResponse(_data: unknown): msdyn_conversationclosecasesentimentResponse {
    return new msdyn_conversationclosecasesentimentResponse();
  }
}
