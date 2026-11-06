import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CaseClassificationResponse as msdyn_CaseClassificationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CaseClassification message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CaseClassificationRequestParameters {
  CSCopilotRequest4: string;
}

/**
 * msdyn_CaseClassification request message
 *
 * Web API Action: msdyn_CaseClassification
 */
export class msdyn_CaseClassificationRequest
  extends OrganizationRequest
  implements Executable<msdyn_CaseClassificationResponse>
{
  declare readonly Parameters: Readonly<msdyn_CaseClassificationRequestParameters>;

  constructor(parameters: msdyn_CaseClassificationRequestParameters) {
    super("msdyn_CaseClassification", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CaseClassification`;

    const body = requestBody({
      CSCopilotRequest4: this.Parameters.CSCopilotRequest4,
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

  async parseResponse(response: Response): Promise<msdyn_CaseClassificationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CaseClassificationResponse.fromResponse({});
    return msdyn_CaseClassificationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CaseClassification response message
 */
export class msdyn_CaseClassificationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CaseClassificationResponseData) {
    super("msdyn_CaseClassification");
  }

  static fromResponse(data: unknown): msdyn_CaseClassificationResponse {
    return new msdyn_CaseClassificationResponse(
      responseObject<msdyn_CaseClassificationResponseData>(data)
    );
  }
}
