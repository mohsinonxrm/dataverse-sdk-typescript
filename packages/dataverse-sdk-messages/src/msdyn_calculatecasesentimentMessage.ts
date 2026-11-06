import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_calculatecasesentimentResponse as msdyn_calculatecasesentimentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_calculatecasesentiment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_calculatecasesentimentRequestParameters {
  CaseId: string;
}

/**
 * msdyn_calculatecasesentiment request message
 *
 * Web API Action: msdyn_calculatecasesentiment
 */
export class msdyn_calculatecasesentimentRequest
  extends OrganizationRequest
  implements Executable<msdyn_calculatecasesentimentResponse>
{
  declare readonly Parameters: Readonly<msdyn_calculatecasesentimentRequestParameters>;

  constructor(parameters: msdyn_calculatecasesentimentRequestParameters) {
    super("msdyn_calculatecasesentiment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_calculatecasesentiment`;

    const body = requestBody({
      CaseId: this.Parameters.CaseId,
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

  async parseResponse(response: Response): Promise<msdyn_calculatecasesentimentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_calculatecasesentimentResponse.fromResponse({});
    return msdyn_calculatecasesentimentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_calculatecasesentiment response message
 */
export class msdyn_calculatecasesentimentResponse extends OrganizationResponse {
  constructor(public result: msdyn_calculatecasesentimentResponseData) {
    super("msdyn_calculatecasesentiment");
  }

  static fromResponse(data: unknown): msdyn_calculatecasesentimentResponse {
    return new msdyn_calculatecasesentimentResponse(
      responseObject<msdyn_calculatecasesentimentResponseData>(data)
    );
  }
}
