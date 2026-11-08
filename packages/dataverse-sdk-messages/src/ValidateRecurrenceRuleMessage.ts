import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { recurrencerule } from "./types/index.js";

/**
 * Parameters of the ValidateRecurrenceRule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateRecurrenceRuleRequestParameters {
  Target: recurrencerule;
}

/**
 * ValidateRecurrenceRule request message
 *
 * Web API Function: ValidateRecurrenceRule
 */
export class ValidateRecurrenceRuleRequest
  extends OrganizationRequest
  implements Executable<ValidateRecurrenceRuleResponse>
{
  declare readonly Parameters: Readonly<ValidateRecurrenceRuleRequestParameters>;

  constructor(parameters: ValidateRecurrenceRuleRequestParameters) {
    super("ValidateRecurrenceRule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ValidateRecurrenceRule`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Target, "mscrm.recurrencerule", "EntityType")
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

  async parseResponse(response: Response): Promise<ValidateRecurrenceRuleResponse> {
    // The body is the complex value, with its @odata.context
    return ValidateRecurrenceRuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ValidateRecurrenceRule function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ValidateRecurrenceRuleResult {
  "@odata.context"?: string;
  Description: string;
}

/**
 * ValidateRecurrenceRule response message
 *
 * `result` is the value the ValidateRecurrenceRule function returns (see {@link ValidateRecurrenceRuleResult}).
 */
export class ValidateRecurrenceRuleResponse extends OrganizationResponse {
  constructor(public result: ValidateRecurrenceRuleResult) {
    super("ValidateRecurrenceRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ValidateRecurrenceRuleResponse {
    return new ValidateRecurrenceRuleResponse(data as ValidateRecurrenceRuleResult);
  }
}
