import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_RetrieveKPIvaluesfromDCI action
 */
export interface msdyn_RetrieveKPIvaluesfromDCIResponse {
  KPIValues: string;
  Errors: string;
}

/**
 * msdyn_RetrieveKPIvaluesfromDCI action
 *
 * Unbound action
 */
export class msdyn_RetrieveKPIvaluesfromDCIAction implements Executable<msdyn_RetrieveKPIvaluesfromDCIResponse> {
  constructor(
    public readonly crmRecord?: EntityReference | AnyEntityPayload,
    public readonly kPINameFilterMap?: string,
    public readonly similarEntities?: string
  ) {}

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
    return data as msdyn_RetrieveKPIvaluesfromDCIResponse;
  }
}
