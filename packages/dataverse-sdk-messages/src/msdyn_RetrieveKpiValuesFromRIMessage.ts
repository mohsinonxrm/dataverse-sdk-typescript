import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveKpiValuesFromRIResponse as msdyn_RetrieveKpiValuesFromRIResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveKpiValuesFromRI request message
 *
 * Web API Action: msdyn_RetrieveKpiValuesFromRI
 */
export class msdyn_RetrieveKpiValuesFromRIRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKpiValuesFromRIResponse>
{
  constructor(
    public crmRecord: EntityReference | AnyEntityPayload,
    public kpiType: string
  ) {
    super("msdyn_RetrieveKpiValuesFromRI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKpiValuesFromRI`;

    const body: Record<string, unknown> = {
      CrmRecord: this.crmRecord,
      KpiType: this.kpiType,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKpiValuesFromRIResponse> {
    const data = await response.json();
    return msdyn_RetrieveKpiValuesFromRIResponse.fromResponse(data);
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
