import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { customcontroldefaultconfig } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_customcontroldefaultconfigResponse extends customcontroldefaultconfig {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.customcontroldefaultconfig)
 */
export class RetrieveUnpublished_customcontroldefaultconfigFunction implements Executable<RetrieveUnpublished_customcontroldefaultconfigResponse> {
  constructor(public readonly customcontroldefaultconfigId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/customcontroldefaultconfigs(${this.customcontroldefaultconfigId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveUnpublished_customcontroldefaultconfigResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_customcontroldefaultconfigResponse;
  }
}
