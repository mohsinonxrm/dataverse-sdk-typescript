import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SendEmailToTechniciansResponse> {
    const data = await response.json();
    return msdyn_SendEmailToTechniciansResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      input: this.input,
    };
  }
}

/**
 * msdyn_SendEmailToTechnicians response message
 */
export class msdyn_SendEmailToTechniciansResponse extends OrganizationResponse {
  constructor(public result: msdyn_SendEmailToTechniciansResponse) {
    super("msdyn_SendEmailToTechnicians");
  }

  static fromResponse(data: unknown): msdyn_SendEmailToTechniciansResponse {
    return new msdyn_SendEmailToTechniciansResponse((data as any).value);
  }
}
