import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveKPIvaluesfromDCIResponse> {
    const data = await response.json();
    return msdyn_RetrieveKPIvaluesfromDCIResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CrmRecord: this.crmRecord,
      KPINameFilterMap: this.kPINameFilterMap,
      SimilarEntities: this.similarEntities,
    };
  }
}

/**
 * msdyn_RetrieveKPIvaluesfromDCI response message
 */
export class msdyn_RetrieveKPIvaluesfromDCIResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKPIvaluesfromDCIResponse) {
    super("msdyn_RetrieveKPIvaluesfromDCI");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKPIvaluesfromDCIResponse {
    return new msdyn_RetrieveKPIvaluesfromDCIResponse((data as any).value);
  }
}
