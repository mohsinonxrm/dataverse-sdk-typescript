import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CheckPromoteEmail function
 */
export interface CheckPromoteEmailResponse {
  ShouldPromote: boolean;
  ReasonCode: number;
}

/**
 * CheckPromoteEmail function
 *
 * Unbound function
 */
export class CheckPromoteEmailFunction implements Executable<CheckPromoteEmailResponse> {
  constructor(
    public readonly messageId: string,
    public readonly subject: string,
    public readonly directionCode: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CheckPromoteEmail`;

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
    if (this.directionCode !== undefined) {
      aliases.push(`DirectionCode=@p3`);
      params.append(
        "@p3",
        typeof this.directionCode === "string"
          ? `'${this.directionCode}'`
          : String(this.directionCode)
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

  async parseResponse(response: Response): Promise<CheckPromoteEmailResponse> {
    const data = await response.json();
    return data as CheckPromoteEmailResponse;
  }
}
