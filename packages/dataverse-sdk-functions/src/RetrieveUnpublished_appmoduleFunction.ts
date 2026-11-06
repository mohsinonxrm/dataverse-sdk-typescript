import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { appmodule } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_appmoduleResponse extends appmodule {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.appmodule)
 */
export class RetrieveUnpublished_appmoduleFunction implements Executable<RetrieveUnpublished_appmoduleResponse> {
  constructor(public readonly appmoduleId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/appmodules(${this.appmoduleId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_appmoduleResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_appmoduleResponse;
  }
}
