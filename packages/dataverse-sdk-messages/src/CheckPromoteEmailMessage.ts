import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the CheckPromoteEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CheckPromoteEmailRequestParameters {
  MessageId: string;
  Subject?: string;
  DirectionCode?: number;
}

/**
 * CheckPromoteEmail request message
 *
 * Web API Function: CheckPromoteEmail
 */
export class CheckPromoteEmailRequest
  extends OrganizationRequest
  implements Executable<CheckPromoteEmailResponse>
{
  declare readonly Parameters: Readonly<CheckPromoteEmailRequestParameters>;

  constructor(parameters: CheckPromoteEmailRequestParameters) {
    super("CheckPromoteEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CheckPromoteEmail`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.MessageId !== undefined) {
      aliases.push(`MessageId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.MessageId, "Edm.String"));
    }
    if (this.Parameters.Subject !== undefined) {
      aliases.push(`Subject=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.Subject, "Edm.String"));
    }
    if (this.Parameters.DirectionCode !== undefined) {
      aliases.push(`DirectionCode=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.DirectionCode, "Edm.Int32"));
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
    // The body is the complex value, with its @odata.context
    return CheckPromoteEmailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CheckPromoteEmail function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CheckPromoteEmailResult {
  "@odata.context"?: string;
  ReasonCode: number;
  ShouldPromote: boolean;
}

/**
 * CheckPromoteEmail response message
 *
 * `result` is the value the CheckPromoteEmail function returns (see {@link CheckPromoteEmailResult}).
 */
export class CheckPromoteEmailResponse extends OrganizationResponse {
  constructor(public result: CheckPromoteEmailResult) {
    super("CheckPromoteEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CheckPromoteEmailResponse {
    return new CheckPromoteEmailResponse(data as CheckPromoteEmailResult);
  }
}
