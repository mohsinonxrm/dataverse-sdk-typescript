import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_FetchKPIValues action
 */
export interface msdyn_FetchKPIValuesResponse {
  LastModifiedOn: string;
  KPIValues: string;
  ErrorList: string;
}

/**
 * msdyn_FetchKPIValues action
 *
 * Unbound action
 */
export class msdyn_FetchKPIValuesAction implements Executable<msdyn_FetchKPIValuesResponse> {
  constructor(
    public readonly crmRecord: EntityReference | AnyEntityPayload,
    public readonly kPINames: string,
    public readonly kPIType?: string
  ) {}

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
    return data as msdyn_FetchKPIValuesResponse;
  }
}
