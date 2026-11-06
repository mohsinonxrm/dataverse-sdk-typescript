import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from CheckPromoteEmail function
 */
export interface CheckPromoteEmailResponse {
  ShouldPromote: boolean;
  ReasonCode: number;
}

/**
 * Parameters of the CheckPromoteEmail function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CheckPromoteEmailFunctionParameters {
  MessageId: string;
  Subject?: string;
  DirectionCode?: number;
}

/**
 * CheckPromoteEmail function
 *
 * Unbound function
 */
export class CheckPromoteEmailFunction implements Executable<CheckPromoteEmailResponse> {
  constructor(public readonly parameters: CheckPromoteEmailFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CheckPromoteEmail`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.MessageId !== undefined) {
      aliases.push(`MessageId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.MessageId, "Edm.String"));
    }
    if (this.parameters.Subject !== undefined) {
      aliases.push(`Subject=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.Subject, "Edm.String"));
    }
    if (this.parameters.DirectionCode !== undefined) {
      aliases.push(`DirectionCode=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.DirectionCode, "Edm.Int32"));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CheckPromoteEmailResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CheckPromoteEmailResponse;
  }
}
