import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_PerformChecksForEnrichRecord request message
 *
 * Web API Action: msdyn_PerformChecksForEnrichRecord
 */
export class msdyn_PerformChecksForEnrichRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_PerformChecksForEnrichRecordResponse>
{
  constructor(public msdyn_Target: EntityReference) {
    super("msdyn_PerformChecksForEnrichRecord");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PerformChecksForEnrichRecord`;

    const body: Record<string, unknown> = {
      msdyn_Target: this.msdyn_Target,
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

  async parseResponse(response: Response): Promise<msdyn_PerformChecksForEnrichRecordResponse> {
    const data = await response.json();
    return msdyn_PerformChecksForEnrichRecordResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_Target: this.msdyn_Target,
    };
  }
}

/**
 * msdyn_PerformChecksForEnrichRecord response message
 */
export class msdyn_PerformChecksForEnrichRecordResponse extends OrganizationResponse {
  constructor(public result: msdyn_PerformChecksForEnrichRecordResponse) {
    super("msdyn_PerformChecksForEnrichRecord");
  }

  static fromResponse(data: unknown): msdyn_PerformChecksForEnrichRecordResponse {
    return new msdyn_PerformChecksForEnrichRecordResponse((data as any).value);
  }
}
