import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SendEmailToTechniciansResponse as msdyn_SendEmailToTechniciansResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SendEmailToTechnicians message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendEmailToTechniciansRequestParameters {
  input: string;
}

/**
 * msdyn_SendEmailToTechnicians request message
 *
 * Web API Action: msdyn_SendEmailToTechnicians
 */
export class msdyn_SendEmailToTechniciansRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendEmailToTechniciansResponse>
{
  declare readonly Parameters: Readonly<msdyn_SendEmailToTechniciansRequestParameters>;

  constructor(parameters: msdyn_SendEmailToTechniciansRequestParameters) {
    super("msdyn_SendEmailToTechnicians", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailToTechnicians`;

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

  async parseResponse(response: Response): Promise<msdyn_SendEmailToTechniciansResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SendEmailToTechniciansResponse.fromResponse({});
    return msdyn_SendEmailToTechniciansResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SendEmailToTechnicians response message
 */
export class msdyn_SendEmailToTechniciansResponse extends OrganizationResponse {
  constructor(public result: msdyn_SendEmailToTechniciansResponseData) {
    super("msdyn_SendEmailToTechnicians");
  }

  static fromResponse(data: unknown): msdyn_SendEmailToTechniciansResponse {
    return new msdyn_SendEmailToTechniciansResponse(
      responseObject<msdyn_SendEmailToTechniciansResponseData>(data)
    );
  }
}
