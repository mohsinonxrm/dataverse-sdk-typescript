import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_Updatefeatureconfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdatefeatureconfigRequestParameters {
  featureType?: number;
  configuration?: string;
}

/**
 * msdyn_Updatefeatureconfig request message
 *
 * Web API Action: msdyn_Updatefeatureconfig
 */
export class msdyn_UpdatefeatureconfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdatefeatureconfigResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdatefeatureconfigRequestParameters>;

  constructor(parameters: msdyn_UpdatefeatureconfigRequestParameters = {}) {
    super("msdyn_Updatefeatureconfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_Updatefeatureconfig`;

    const body = requestBody({
      featureType: this.Parameters.featureType,
      configuration: this.Parameters.configuration,
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
