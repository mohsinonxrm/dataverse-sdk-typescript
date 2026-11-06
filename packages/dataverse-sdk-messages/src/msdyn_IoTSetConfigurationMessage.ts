import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IoTSetConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTSetConfigurationRequestParameters {
  Key: string;
  Value: string;
}

/**
 * msdyn_IoTSetConfiguration request message
 *
 * Web API Action: msdyn_IoTSetConfiguration
 */
export class msdyn_IoTSetConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTSetConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTSetConfigurationRequestParameters>;

  constructor(parameters: msdyn_IoTSetConfigurationRequestParameters) {
    super("msdyn_IoTSetConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTSetConfiguration`;

    const body = requestBody({
      Key: this.Parameters.Key,
      Value: this.Parameters.Value,
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

  parseResponse(_response: Response): Promise<msdyn_IoTSetConfigurationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_IoTSetConfigurationResponse());
  }
}

/**
 * msdyn_IoTSetConfiguration response message
 */
export class msdyn_IoTSetConfigurationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_IoTSetConfiguration");
  }

  static fromResponse(_data?: unknown): msdyn_IoTSetConfigurationResponse {
    return new msdyn_IoTSetConfigurationResponse();
  }
}
