import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_FetchKPIValuesResponse as msdyn_FetchKPIValuesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FetchKPIValues message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchKPIValuesRequestParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
  KPINames: string;
  KPIType?: string;
}

/**
 * msdyn_FetchKPIValues request message
 *
 * Web API Action: msdyn_FetchKPIValues
 */
export class msdyn_FetchKPIValuesRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchKPIValuesResponse>
{
  declare readonly Parameters: Readonly<msdyn_FetchKPIValuesRequestParameters>;

  constructor(parameters: msdyn_FetchKPIValuesRequestParameters) {
    super("msdyn_FetchKPIValues", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchKPIValues`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
      KPINames: this.Parameters.KPINames,
      KPIType: this.Parameters.KPIType,
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

  async parseResponse(response: Response): Promise<msdyn_FetchKPIValuesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_FetchKPIValuesResponse.fromResponse({});
    return msdyn_FetchKPIValuesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_FetchKPIValues response message
 */
export class msdyn_FetchKPIValuesResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchKPIValuesResponseData) {
    super("msdyn_FetchKPIValues");
  }

  static fromResponse(data: unknown): msdyn_FetchKPIValuesResponse {
    return new msdyn_FetchKPIValuesResponse(responseObject<msdyn_FetchKPIValuesResponseData>(data));
  }
}
