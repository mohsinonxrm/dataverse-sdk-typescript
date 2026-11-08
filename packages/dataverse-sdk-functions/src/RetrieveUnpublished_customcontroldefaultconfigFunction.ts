import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { customcontroldefaultconfig } from "./types/index.js";

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_customcontroldefaultconfigResponse =
  | (customcontroldefaultconfig & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.customcontroldefaultconfig)
 *
 * The first argument is the id of the customcontroldefaultconfig record to call it on.
 */
export class RetrieveUnpublished_customcontroldefaultconfigFunction implements Executable<RetrieveUnpublished_customcontroldefaultconfigResponse> {
  constructor(public readonly customcontroldefaultconfigId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/customcontroldefaultconfigs(${odataLiteral.guid(this.customcontroldefaultconfigId)})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as RetrieveUnpublished_customcontroldefaultconfigResponse;
  }
}
