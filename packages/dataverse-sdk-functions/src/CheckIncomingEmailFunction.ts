import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { email } from "./types/index.js";

/**
 * Response from CheckIncomingEmail function
 */
export interface CheckIncomingEmailResponse {
  ShouldDeliver: boolean;
  ReasonCode: number;
}

/**
 * CheckIncomingEmail function
 *
 * Unbound function
 */
export class CheckIncomingEmailFunction implements Executable<CheckIncomingEmailResponse> {
  constructor(
    public readonly messageId: string,
    public readonly subject: string | undefined,
    public readonly from: string,
    public readonly to: string,
    public readonly cc: string,
    public readonly bcc: string,
    public readonly extraProperties?: email
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CheckIncomingEmail`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.messageId !== undefined) {
      aliases.push(`MessageId=@p1`);
      params.append("@p1", formatParameterAlias(this.messageId, "Edm.String"));
    }
    if (this.subject !== undefined) {
      aliases.push(`Subject=@p2`);
      params.append("@p2", formatParameterAlias(this.subject, "Edm.String"));
    }
    if (this.from !== undefined) {
      aliases.push(`From=@p3`);
      params.append("@p3", formatParameterAlias(this.from, "Edm.String"));
    }
    if (this.to !== undefined) {
      aliases.push(`To=@p4`);
      params.append("@p4", formatParameterAlias(this.to, "Edm.String"));
    }
    if (this.cc !== undefined) {
      aliases.push(`Cc=@p5`);
      params.append("@p5", formatParameterAlias(this.cc, "Edm.String"));
    }
    if (this.bcc !== undefined) {
      aliases.push(`Bcc=@p6`);
      params.append("@p6", formatParameterAlias(this.bcc, "Edm.String"));
    }
    if (this.extraProperties !== undefined) {
      aliases.push(`ExtraProperties=@p7`);
      params.append("@p7", JSON.stringify(this.extraProperties));
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
    const data = await response.json();
    return data as CheckIncomingEmailResponse;
  }
}
