import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from PvaComponentCollectionAuthorize action
 */
export interface PvaComponentCollectionAuthorizeResponse {
  // No content returned
}

/**
 * Parameters of the PvaComponentCollectionAuthorize action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaComponentCollectionAuthorizeActionParameters {
  Users: Record<string, unknown>[];
  SharingRoleType: number;
  ShareOrUnshare: boolean;
}

/**
 * PvaComponentCollectionAuthorize action
 *
 * Bound action
 * Binding parameter: entity (mscrm.botcomponentcollection)
 *
 * The first argument is the id of the botcomponentcollection record to call it on.
 */
export class PvaComponentCollectionAuthorizeAction implements Executable<PvaComponentCollectionAuthorizeResponse> {
  constructor(
    public readonly botcomponentcollectionId: string,
    public readonly parameters: PvaComponentCollectionAuthorizeActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/botcomponentcollections(${this.botcomponentcollectionId})/Microsoft.Dynamics.CRM.PvaComponentCollectionAuthorize`;

    const body = requestBody({
      Users: this.parameters.Users,
      SharingRoleType: this.parameters.SharingRoleType,
      ShareOrUnshare: this.parameters.ShareOrUnshare,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as PvaComponentCollectionAuthorizeResponse;
  }
}
