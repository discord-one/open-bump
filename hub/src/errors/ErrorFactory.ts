import BaseError from "./BaseError";

export default class ErrorFactory {
  public static unauthorized() {
    return new BaseError()
      .setStatus(401)
      .setCode("unauthorized")
      .setMessage(
        "The request is missing an `Authorization` header containing an application token."
      );
  }

  public static forbidden() {
    return new BaseError()
      .setStatus(403)
      .setCode("forbidden")
      .setMessage(
        "Your application does not have sufficient permissions to access this resource."
      );
  }

  public static missingParameters(
    code = "missing_parameters",
    parameters: Array<string> = []
  ) {
    return new BaseError()
      .setStatus(400)
      .setCode(code)
      .setMessage(
        `Request body is missing the following parameter${
          parameters.length !== 1 ? "s" : ""
        }: ${parameters.map((parameter) => `\`${parameter}\``).join(", ")}`
      );
  }
}
