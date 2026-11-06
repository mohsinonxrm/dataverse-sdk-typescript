import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_ForecastRecalculateAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ForecastRecalculateAsyncRequestParameters {
  ForecastInstance: EntityReference | AnyEntityPayload;
  IsRefreshHierarchy: boolean;
}

/**
 * msdyn_ForecastRecalculateAsync request message
 *
 * Web API Action: msdyn_ForecastRecalculateAsync
 */
export class msdyn_ForecastRecalculateAsyncRequest
  extends OrganizationRequest
  implements Executable<msdyn_ForecastRecalculateAsyncResponse>
{
  declare readonly Parameters: Readonly<msdyn_ForecastRecalculateAsyncRequestParameters>;

  constructor(parameters: msdyn_ForecastRecalculateAsyncRequestParameters) {
    super("msdyn_ForecastRecalculateAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastRecalculateAsync`;

    const body = requestBody({
      ForecastInstance: this.Parameters.ForecastInstance,
      IsRefreshHierarchy: this.Parameters.IsRefreshHierarchy,
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

  parseResponse(_response: Response): Promise<msdyn_ForecastRecalculateAsyncResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_ForecastRecalculateAsyncResponse());
  }
}

/**
 * msdyn_ForecastRecalculateAsync response message
 */
export class msdyn_ForecastRecalculateAsyncResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ForecastRecalculateAsync");
  }

  static fromResponse(_data?: unknown): msdyn_ForecastRecalculateAsyncResponse {
    return new msdyn_ForecastRecalculateAsyncResponse();
  }
}
