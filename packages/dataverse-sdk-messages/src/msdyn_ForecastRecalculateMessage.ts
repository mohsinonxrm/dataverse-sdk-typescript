import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_ForecastRecalculate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ForecastRecalculateRequestParameters {
  ForecastInstance: EntityReference | AnyEntityPayload;
  IsRefreshHierarchy: boolean;
}

/**
 * msdyn_ForecastRecalculate request message
 *
 * Web API Action: msdyn_ForecastRecalculate
 */
export class msdyn_ForecastRecalculateRequest
  extends OrganizationRequest
  implements Executable<msdyn_ForecastRecalculateResponse>
{
  declare readonly Parameters: Readonly<msdyn_ForecastRecalculateRequestParameters>;

  constructor(parameters: msdyn_ForecastRecalculateRequestParameters) {
    super("msdyn_ForecastRecalculate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastRecalculate`;

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

  parseResponse(_response: Response): Promise<msdyn_ForecastRecalculateResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_ForecastRecalculateResponse());
  }
}

/**
 * msdyn_ForecastRecalculate response message
 */
export class msdyn_ForecastRecalculateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ForecastRecalculate");
  }

  static fromResponse(_data?: unknown): msdyn_ForecastRecalculateResponse {
    return new msdyn_ForecastRecalculateResponse();
  }
}
