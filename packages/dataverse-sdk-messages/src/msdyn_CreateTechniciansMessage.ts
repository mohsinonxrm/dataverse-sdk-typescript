import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateTechniciansResponse as msdyn_CreateTechniciansResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateTechnicians message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateTechniciansRequestParameters {
  input: string;
}

/**
 * msdyn_CreateTechnicians request message
 *
 * Web API Action: msdyn_CreateTechnicians
 */
export class msdyn_CreateTechniciansRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateTechniciansResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateTechniciansRequestParameters>;

  constructor(parameters: msdyn_CreateTechniciansRequestParameters) {
    super("msdyn_CreateTechnicians", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateTechnicians`;

    const body = requestBody({
      input: this.Parameters.input,
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

  async parseResponse(response: Response): Promise<msdyn_CreateTechniciansResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CreateTechniciansResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CreateTechnicians response message
 */
export class msdyn_CreateTechniciansResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateTechniciansResponseData) {
    super("msdyn_CreateTechnicians");
  }

  static fromResponse(data: unknown): msdyn_CreateTechniciansResponse {
    return new msdyn_CreateTechniciansResponse(
      responseObject<msdyn_CreateTechniciansResponseData>(data)
    );
  }
}
