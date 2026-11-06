/**
 * Base interface for SDK message requests
 */
export interface MessageRequest {
  /** The name of the message */
  readonly messageName: string;
  /** The parameters for the message */
  readonly Parameters: Record<string, unknown>;
}

/**
 * Base interface for SDK message responses
 */
export interface MessageResponse {
  /** The name of the message that generated this response */
  readonly messageName: string;
  /** The result values from the message execution */
  readonly Results: Record<string, unknown>;
}
