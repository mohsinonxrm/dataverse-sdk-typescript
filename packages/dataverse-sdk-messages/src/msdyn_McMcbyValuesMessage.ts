import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_McMcbyValuesResponse as msdyn_McMcbyValuesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_McMcbyValues message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_McMcbyValuesRequestParameters {
  CrmRecord?: EntityReference | AnyEntityPayload;
  KPIType?: string;
}

/**
 * msdyn_McMcbyValues request message
 *
 * Web API Action: msdyn_McMcbyValues
 */
export class msdyn_McMcbyValuesRequest
  extends OrganizationRequest
  implements Executable<msdyn_McMcbyValuesResponse>
{
  declare readonly Parameters: Readonly<msdyn_McMcbyValuesRequestParameters>;

  constructor(parameters: msdyn_McMcbyValuesRequestParameters = {}) {
    super("msdyn_McMcbyValues", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_McMcbyValues`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
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

  async parseResponse(response: Response): Promise<msdyn_McMcbyValuesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_McMcbyValuesResponse.fromResponse({});
    return msdyn_McMcbyValuesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_McMcbyValues response message
 */
export class msdyn_McMcbyValuesResponse extends OrganizationResponse {
  constructor(public result: msdyn_McMcbyValuesResponseData) {
    super("msdyn_McMcbyValues");
  }

  static fromResponse(data: unknown): msdyn_McMcbyValuesResponse {
    return new msdyn_McMcbyValuesResponse(responseObject<msdyn_McMcbyValuesResponseData>(data));
  }
}
