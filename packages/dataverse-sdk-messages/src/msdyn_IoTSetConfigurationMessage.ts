import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTSetConfiguration request message
 *
 * Web API Action: msdyn_IoTSetConfiguration
 */
export class msdyn_IoTSetConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTSetConfigurationResponse>
{
  constructor(
    public key: string,
    public value: string
  ) {
    super("msdyn_IoTSetConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTSetConfiguration`;

    const body: Record<string, unknown> = {
      Key: this.key,
      Value: this.value,
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

  async parseResponse(response: Response): Promise<msdyn_IoTSetConfigurationResponse> {
    // No return value (204 No Content)
    return new msdyn_IoTSetConfigurationResponse();
  }
}

/**
 * msdyn_IoTSetConfiguration response message
 */
export class msdyn_IoTSetConfigurationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_IoTSetConfiguration");
  }

  static fromResponse(_data: unknown): msdyn_IoTSetConfigurationResponse {
    return new msdyn_IoTSetConfigurationResponse();
  }
}
