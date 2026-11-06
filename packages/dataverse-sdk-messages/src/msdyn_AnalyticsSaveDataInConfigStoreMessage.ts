import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AnalyticsSaveDataInConfigStore request message
 *
 * Web API Action: msdyn_AnalyticsSaveDataInConfigStore
 */
export class msdyn_AnalyticsSaveDataInConfigStoreRequest
  extends OrganizationRequest
  implements Executable<msdyn_AnalyticsSaveDataInConfigStoreResponse>
{
  constructor(
    public key: string,
    public value: string,
    public configName: string
  ) {
    super("msdyn_AnalyticsSaveDataInConfigStore");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AnalyticsSaveDataInConfigStore`;

    const body: Record<string, unknown> = {
      Key: this.key,
      Value: this.value,
      ConfigName: this.configName,
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
