import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_Updatefeatureconfig request message
 *
 * Web API Action: msdyn_Updatefeatureconfig
 */
export class msdyn_UpdatefeatureconfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdatefeatureconfigResponse>
{
  constructor(
    public featureType: number,
    public configuration: string
  ) {
    super("msdyn_Updatefeatureconfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_Updatefeatureconfig`;

    const body: Record<string, unknown> = {
      featureType: this.featureType,
      configuration: this.configuration,
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

  async parseResponse(response: Response): Promise<msdyn_UpdatefeatureconfigResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdatefeatureconfigResponse();
  }
}

/**
 * msdyn_Updatefeatureconfig response message
 */
export class msdyn_UpdatefeatureconfigResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_Updatefeatureconfig");
  }

  static fromResponse(_data: unknown): msdyn_UpdatefeatureconfigResponse {
    return new msdyn_UpdatefeatureconfigResponse();
  }
}
