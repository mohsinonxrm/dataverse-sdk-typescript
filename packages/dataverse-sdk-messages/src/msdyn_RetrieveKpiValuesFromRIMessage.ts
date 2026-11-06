import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveKpiValuesFromRIResponse as msdyn_RetrieveKpiValuesFromRIResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveKpiValuesFromRI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKpiValuesFromRIRequestParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
  KpiType: string;
}

/**
 * msdyn_RetrieveKpiValuesFromRI request message
 *
 * Web API Action: msdyn_RetrieveKpiValuesFromRI
 */
export class msdyn_RetrieveKpiValuesFromRIRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKpiValuesFromRIResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveKpiValuesFromRIRequestParameters>;

  constructor(parameters: msdyn_RetrieveKpiValuesFromRIRequestParameters) {
    super("msdyn_RetrieveKpiValuesFromRI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKpiValuesFromRI`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
      KpiType: this.Parameters.KpiType,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKpiValuesFromRIResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RetrieveKpiValuesFromRIResponse.fromResponse({});
    return msdyn_RetrieveKpiValuesFromRIResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveKpiValuesFromRI response message
 */
export class msdyn_RetrieveKpiValuesFromRIResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKpiValuesFromRIResponseData) {
    super("msdyn_RetrieveKpiValuesFromRI");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKpiValuesFromRIResponse {
    return new msdyn_RetrieveKpiValuesFromRIResponse(
      responseObject<msdyn_RetrieveKpiValuesFromRIResponseData>(data)
    );
  }
}
