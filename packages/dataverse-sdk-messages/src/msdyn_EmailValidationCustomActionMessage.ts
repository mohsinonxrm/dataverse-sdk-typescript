import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_EmailValidationCustomActionResponse as msdyn_EmailValidationCustomActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_EmailValidationCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailValidationCustomActionRequestParameters {
  EmailValidationRequest?: string;
}

/**
 * msdyn_EmailValidationCustomAction request message
 *
 * Web API Action: msdyn_EmailValidationCustomAction
 */
export class msdyn_EmailValidationCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_EmailValidationCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_EmailValidationCustomActionRequestParameters>;

  constructor(parameters: msdyn_EmailValidationCustomActionRequestParameters = {}) {
    super("msdyn_EmailValidationCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailValidationCustomAction`;

    const body = requestBody({
      EmailValidationRequest: this.Parameters.EmailValidationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_EmailValidationCustomActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_EmailValidationCustomActionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_EmailValidationCustomAction response message
 */
export class msdyn_EmailValidationCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailValidationCustomActionResponseData) {
    super("msdyn_EmailValidationCustomAction");
  }

  static fromResponse(data: unknown): msdyn_EmailValidationCustomActionResponse {
    return new msdyn_EmailValidationCustomActionResponse(
      responseObject<msdyn_EmailValidationCustomActionResponseData>(data)
    );
  }
}
