export class InvalidIdError extends Error {
  constructor(id: string) {
    super(`Id '${id}' is not valid`);
    this.name = InvalidIdError.name;
  }
}
