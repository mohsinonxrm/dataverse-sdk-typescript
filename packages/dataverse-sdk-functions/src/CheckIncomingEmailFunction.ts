import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { email } from "./types/index.js";

/**
 * Response from the CheckIncomingEmail function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CheckIncomingEmailResponse {
  "@odata.context"?: string;
  ReasonCode: number;
  ShouldDeliver: boolean;
}

/**
 * Parameters of the CheckIncomingEmail function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CheckIncomingEmailFunctionParameters {
  MessageId: string;
  Subject?: string;
  From: string;
  To: string;
  Cc: string;
  Bcc: string;
  ExtraProperties?: email;
}

/**
 * CheckIncomingEmail function
 *
 * Unbound function
 */
export class CheckIncomingEmailFunction implements Executable<CheckIncomingEmailResponse> {
  constructor(public readonly parameters: CheckIncomingEmailFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CheckIncomingEmail`;

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
    if (this.parameters.From !== undefined) {
      aliases.push(`From=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.From, "Edm.String"));
    }
    if (this.parameters.To !== undefined) {
      aliases.push(`To=@p4`);
      params.append("@p4", formatParameterAlias(this.parameters.To, "Edm.String"));
    }
    if (this.parameters.Cc !== undefined) {
      aliases.push(`Cc=@p5`);
      params.append("@p5", formatParameterAlias(this.parameters.Cc, "Edm.String"));
    }
    if (this.parameters.Bcc !== undefined) {
      aliases.push(`Bcc=@p6`);
      params.append("@p6", formatParameterAlias(this.parameters.Bcc, "Edm.String"));
    }
    if (this.parameters.ExtraProperties !== undefined) {
      aliases.push(`ExtraProperties=@p7`);
      params.append(
        "@p7",
        formatParameterAlias(this.parameters.ExtraProperties, "mscrm.email", "EntityType")
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
    return (await response.json()) as CheckIncomingEmailResponse;
  }
}
