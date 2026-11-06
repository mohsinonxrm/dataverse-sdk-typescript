import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SendEmailToTechniciansResponse as msdyn_SendEmailToTechniciansResponseData } from "./types/index.js";

/**
 * msdyn_SendEmailToTechnicians request message
 *
 * Web API Action: msdyn_SendEmailToTechnicians
 */
export class msdyn_SendEmailToTechniciansRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendEmailToTechniciansResponse>
{
  constructor(public input: string) {
    super("msdyn_SendEmailToTechnicians");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailToTechnicians`;

    const body: Record<string, unknown> = {
      input: this.input,
    };

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
    const data = await response.json();
    return msdyn_SendEmailToTechniciansResponse.fromResponse(data);
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
