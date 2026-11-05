import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CreateTechniciansResponse as msdyn_CreateTechniciansResponseData } from "./types/index.js";

/**
 * msdyn_CreateTechnicians request message
 *
 * Web API Action: msdyn_CreateTechnicians
 */
export class msdyn_CreateTechniciansRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateTechniciansResponse>
{
  constructor(public input: string) {
    super("msdyn_CreateTechnicians");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateTechnicians`;

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

  async parseResponse(response: Response): Promise<msdyn_CreateTechniciansResponse> {
    const data = await response.json();
    return msdyn_CreateTechniciansResponse.fromResponse(data);
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
