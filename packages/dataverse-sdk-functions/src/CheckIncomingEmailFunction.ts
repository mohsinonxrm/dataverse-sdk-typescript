import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    public readonly subject: string,
    public readonly from: string,
    public readonly to: string,
    public readonly cc: string,
    public readonly bcc: string,
    public readonly extraProperties: email
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CheckIncomingEmail`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.messageId !== undefined) {
      aliases.push(`MessageId=@p1`);
      params.append(
        "@p1",
        typeof this.messageId === "string" ? `'${this.messageId}'` : String(this.messageId)
      );
    }
    if (this.subject !== undefined) {
      aliases.push(`Subject=@p2`);
      params.append(
        "@p2",
        typeof this.subject === "string" ? `'${this.subject}'` : String(this.subject)
      );
    }
    if (this.from !== undefined) {
      aliases.push(`From=@p3`);
      params.append("@p3", typeof this.from === "string" ? `'${this.from}'` : String(this.from));
    }
    if (this.to !== undefined) {
      aliases.push(`To=@p4`);
      params.append("@p4", typeof this.to === "string" ? `'${this.to}'` : String(this.to));
    }
    if (this.cc !== undefined) {
      aliases.push(`Cc=@p5`);
      params.append("@p5", typeof this.cc === "string" ? `'${this.cc}'` : String(this.cc));
    }
    if (this.bcc !== undefined) {
      aliases.push(`Bcc=@p6`);
      params.append("@p6", typeof this.bcc === "string" ? `'${this.bcc}'` : String(this.bcc));
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
