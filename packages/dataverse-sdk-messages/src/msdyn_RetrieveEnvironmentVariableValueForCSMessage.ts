import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveEnvironmentVariableValueForCSResponse as msdyn_RetrieveEnvironmentVariableValueForCSResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveEnvironmentVariableValueForCS message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveEnvironmentVariableValueForCSRequestParameters {
  msdyn_EnvironmentVariableName: string;
}

/**
 * msdyn_RetrieveEnvironmentVariableValueForCS request message
 *
 * Web API Action: msdyn_RetrieveEnvironmentVariableValueForCS
 */
export class msdyn_RetrieveEnvironmentVariableValueForCSRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveEnvironmentVariableValueForCSResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveEnvironmentVariableValueForCSRequestParameters>;

  constructor(parameters: msdyn_RetrieveEnvironmentVariableValueForCSRequestParameters) {
    super("msdyn_RetrieveEnvironmentVariableValueForCS", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEnvironmentVariableValueForCS`;

    const body = requestBody({
      msdyn_EnvironmentVariableName: this.Parameters.msdyn_EnvironmentVariableName,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_RetrieveEnvironmentVariableValueForCSResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrieveEnvironmentVariableValueForCSResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_RetrieveEnvironmentVariableValueForCS response message
 */
export class msdyn_RetrieveEnvironmentVariableValueForCSResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveEnvironmentVariableValueForCSResponseData) {
    super("msdyn_RetrieveEnvironmentVariableValueForCS");
  }

  static fromResponse(data: unknown): msdyn_RetrieveEnvironmentVariableValueForCSResponse {
    return new msdyn_RetrieveEnvironmentVariableValueForCSResponse(
      responseObject<msdyn_RetrieveEnvironmentVariableValueForCSResponseData>(data)
    );
  }
}
