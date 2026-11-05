import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaComponentCollectionAuthorize action
 */
export interface PvaComponentCollectionAuthorizeResponse {
  // No content returned
}

/**
 * PvaComponentCollectionAuthorize action
 *
 * Bound action
 * Binding parameter: entity (mscrm.botcomponentcollection)
 */
export class PvaComponentCollectionAuthorizeAction implements Executable<PvaComponentCollectionAuthorizeResponse> {
  constructor(
    public readonly botcomponentcollectionId: string,
    public readonly users: Record<string, unknown>[],
    public readonly sharingRoleType: number,
    public readonly shareOrUnshare: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/botcomponentcollections(${this.botcomponentcollectionId})/Microsoft.Dynamics.CRM.PvaComponentCollectionAuthorize`;

    const body: Record<string, unknown> = {
      Users: this.users,
      SharingRoleType: this.sharingRoleType,
      ShareOrUnshare: this.shareOrUnshare,
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

  async parseResponse(response: Response): Promise<PvaComponentCollectionAuthorizeResponse> {
    // No return value (204 No Content)
    return {};
  }
}
