import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CaseClassificationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CaseClassification action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CaseClassificationResult {
  "@odata.context"?: string;
  Response4: string;
  usage: string;
}

/**
 * msdyn_CaseClassification response message
 *
 * `result` is the value the msdyn_CaseClassification action returns (see {@link msdyn_CaseClassificationResult}).
 */
export class msdyn_CaseClassificationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CaseClassificationResult) {
    super("msdyn_CaseClassification");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CaseClassificationResponse {
    return new msdyn_CaseClassificationResponse(data as msdyn_CaseClassificationResult);
  }
}
