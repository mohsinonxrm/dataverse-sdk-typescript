import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { email } from "./types/index.js";

/**
 * Parameters of the CheckIncomingEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CheckIncomingEmailRequestParameters {
  MessageId: string;
  Subject?: string;
  From: string;
  To: string;
  Cc: string;
  Bcc: string;
  ExtraProperties?: email;
}

/**
 * CheckIncomingEmail request message
 *
 * Web API Function: CheckIncomingEmail
 */
export class CheckIncomingEmailRequest
  extends OrganizationRequest
  implements Executable<CheckIncomingEmailResponse>
{
  declare readonly Parameters: Readonly<CheckIncomingEmailRequestParameters>;

  constructor(parameters: CheckIncomingEmailRequestParameters) {
    super("CheckIncomingEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CheckIncomingEmail`;

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
    if (this.Parameters.From !== undefined) {
      aliases.push(`From=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.From, "Edm.String"));
    }
    if (this.Parameters.To !== undefined) {
      aliases.push(`To=@p4`);
      params.append("@p4", formatParameterAlias(this.Parameters.To, "Edm.String"));
    }
    if (this.Parameters.Cc !== undefined) {
      aliases.push(`Cc=@p5`);
      params.append("@p5", formatParameterAlias(this.Parameters.Cc, "Edm.String"));
    }
    if (this.Parameters.Bcc !== undefined) {
      aliases.push(`Bcc=@p6`);
      params.append("@p6", formatParameterAlias(this.Parameters.Bcc, "Edm.String"));
    }
    if (this.Parameters.ExtraProperties !== undefined) {
      aliases.push(`ExtraProperties=@p7`);
      params.append(
        "@p7",
        formatParameterAlias(this.Parameters.ExtraProperties, "mscrm.email", "EntityType")
      );
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

  async parseResponse(response: Response): Promise<CheckIncomingEmailResponse> {
    // The body is the complex value, with its @odata.context
    return CheckIncomingEmailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CheckIncomingEmail function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CheckIncomingEmailResult {
  "@odata.context"?: string;
  ReasonCode: number;
  ShouldDeliver: boolean;
}

/**
 * CheckIncomingEmail response message
 *
 * `result` is the value the CheckIncomingEmail function returns (see {@link CheckIncomingEmailResult}).
 */
export class CheckIncomingEmailResponse extends OrganizationResponse {
  constructor(public result: CheckIncomingEmailResult) {
    super("CheckIncomingEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CheckIncomingEmailResponse {
    return new CheckIncomingEmailResponse(data as CheckIncomingEmailResult);
  }
}
