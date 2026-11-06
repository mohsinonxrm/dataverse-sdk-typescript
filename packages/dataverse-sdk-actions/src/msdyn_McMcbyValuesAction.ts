import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_McMcbyValues action
 */
export interface msdyn_McMcbyValuesResponse {
  LastModifiedOn: string;
}

/**
 * msdyn_McMcbyValues action
 *
 * Unbound action
 */
export class msdyn_McMcbyValuesAction implements Executable<msdyn_McMcbyValuesResponse> {
  constructor(
    public readonly crmRecord?: EntityReference | AnyEntityPayload,
    public readonly kPIType?: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_McMcbyValuesResponse> {
    const data = await response.json();
    return data as msdyn_McMcbyValuesResponse;
  }
}
