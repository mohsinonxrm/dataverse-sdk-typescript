import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_RetrieveKPIvaluesfromDCIResponse as msdyn_RetrieveKPIvaluesfromDCIResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveKPIvaluesfromDCI request message
 *
 * Web API Action: msdyn_RetrieveKPIvaluesfromDCI
 */
export class msdyn_RetrieveKPIvaluesfromDCIRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKPIvaluesfromDCIResponse>
{
  constructor(
    public crmRecord: EntityReference,
    public kPINameFilterMap: string,
    public similarEntities: string
  ) {
    super("msdyn_RetrieveKPIvaluesfromDCI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKPIvaluesfromDCI`;

    const body: Record<string, unknown> = {
      CrmRecord: this.crmRecord,
      KPINameFilterMap: this.kPINameFilterMap,
      SimilarEntities: this.similarEntities,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKPIvaluesfromDCIResponse> {
    const data = await response.json();
    return msdyn_RetrieveKPIvaluesfromDCIResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrieveKPIvaluesfromDCI response message
 */
export class msdyn_RetrieveKPIvaluesfromDCIResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKPIvaluesfromDCIResponseData) {
    super("msdyn_RetrieveKPIvaluesfromDCI");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKPIvaluesfromDCIResponse {
    return new msdyn_RetrieveKPIvaluesfromDCIResponse(
      responseObject<msdyn_RetrieveKPIvaluesfromDCIResponseData>(data)
    );
  }
}
