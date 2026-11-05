import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_FetchKPIValues request message
 *
 * Web API Action: msdyn_FetchKPIValues
 */
export class msdyn_FetchKPIValuesRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchKPIValuesResponse>
{
  constructor(
    public crmRecord: EntityReference,
    public kPINames: string,
    public kPIType: string
  ) {
    super("msdyn_FetchKPIValues");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchKPIValues`;

    const body: Record<string, unknown> = {
      CrmRecord: this.crmRecord,
      KPINames: this.kPINames,
      KPIType: this.kPIType,
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

  async parseResponse(response: Response): Promise<msdyn_FetchKPIValuesResponse> {
    const data = await response.json();
    return msdyn_FetchKPIValuesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CrmRecord: this.crmRecord,
      KPINames: this.kPINames,
      KPIType: this.kPIType,
    };
  }
}

/**
 * msdyn_FetchKPIValues response message
 */
export class msdyn_FetchKPIValuesResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchKPIValuesResponse) {
    super("msdyn_FetchKPIValues");
  }

  static fromResponse(data: unknown): msdyn_FetchKPIValuesResponse {
    return new msdyn_FetchKPIValuesResponse((data as any).value);
  }
}
