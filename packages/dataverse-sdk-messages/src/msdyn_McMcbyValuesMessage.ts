import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_McMcbyValues request message
 *
 * Web API Action: msdyn_McMcbyValues
 */
export class msdyn_McMcbyValuesRequest
  extends OrganizationRequest
  implements Executable<msdyn_McMcbyValuesResponse>
{
  constructor(
    public crmRecord: EntityReference,
    public kPIType: string
  ) {
    super("msdyn_McMcbyValues");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_McMcbyValues`;

    const body: Record<string, unknown> = {
      CrmRecord: this.crmRecord,
      KPIType: this.kPIType,
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

  async parseResponse(response: Response): Promise<msdyn_McMcbyValuesResponse> {
    const data = await response.json();
    return msdyn_McMcbyValuesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CrmRecord: this.crmRecord,
      KPIType: this.kPIType,
    };
  }
}

/**
 * msdyn_McMcbyValues response message
 */
export class msdyn_McMcbyValuesResponse extends OrganizationResponse {
  constructor(public result: msdyn_McMcbyValuesResponse) {
    super("msdyn_McMcbyValues");
  }

  static fromResponse(data: unknown): msdyn_McMcbyValuesResponse {
    return new msdyn_McMcbyValuesResponse((data as any).value);
  }
}
