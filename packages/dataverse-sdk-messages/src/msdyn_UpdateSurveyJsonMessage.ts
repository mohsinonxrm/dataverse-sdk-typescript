import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateSurveyJson message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateSurveyJsonRequestParameters {
  inspectionDefinitionId: string;
  newInspectionJson: string;
}

/**
 * msdyn_UpdateSurveyJson request message
 *
 * Web API Action: msdyn_UpdateSurveyJson
 */
export class msdyn_UpdateSurveyJsonRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateSurveyJsonResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateSurveyJsonRequestParameters>;

  constructor(parameters: msdyn_UpdateSurveyJsonRequestParameters) {
    super("msdyn_UpdateSurveyJson", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSurveyJson`;

    const body = requestBody({
      inspectionDefinitionId: this.Parameters.inspectionDefinitionId,
      newInspectionJson: this.Parameters.newInspectionJson,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateSurveyJsonResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateSurveyJsonResponse();
  }
}

/**
 * msdyn_UpdateSurveyJson response message
 */
export class msdyn_UpdateSurveyJsonResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateSurveyJson");
  }

  static fromResponse(_data: unknown): msdyn_UpdateSurveyJsonResponse {
    return new msdyn_UpdateSurveyJsonResponse();
  }
}
