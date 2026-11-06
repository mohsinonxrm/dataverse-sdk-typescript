import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AnalyticsSaveDataInConfigStore message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AnalyticsSaveDataInConfigStoreRequestParameters {
  Key: string;
  Value: string;
  ConfigName?: string;
}

/**
 * msdyn_AnalyticsSaveDataInConfigStore request message
 *
 * Web API Action: msdyn_AnalyticsSaveDataInConfigStore
 */
export class msdyn_AnalyticsSaveDataInConfigStoreRequest
  extends OrganizationRequest
  implements Executable<msdyn_AnalyticsSaveDataInConfigStoreResponse>
{
  declare readonly Parameters: Readonly<msdyn_AnalyticsSaveDataInConfigStoreRequestParameters>;

  constructor(parameters: msdyn_AnalyticsSaveDataInConfigStoreRequestParameters) {
    super("msdyn_AnalyticsSaveDataInConfigStore", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AnalyticsSaveDataInConfigStore`;

    const body = requestBody({
      Key: this.Parameters.Key,
      Value: this.Parameters.Value,
      ConfigName: this.Parameters.ConfigName,
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

  async parseResponse(response: Response): Promise<msdyn_AnalyticsSaveDataInConfigStoreResponse> {
    // No return value (204 No Content)
    return new msdyn_AnalyticsSaveDataInConfigStoreResponse();
  }
}

/**
 * msdyn_AnalyticsSaveDataInConfigStore response message
 */
export class msdyn_AnalyticsSaveDataInConfigStoreResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AnalyticsSaveDataInConfigStore");
  }

  static fromResponse(_data: unknown): msdyn_AnalyticsSaveDataInConfigStoreResponse {
    return new msdyn_AnalyticsSaveDataInConfigStoreResponse();
  }
}
