export class ExecutionCache<TInputs extends Array<unknown>, TOutput> {
  constructor(
    private readonly handler: (...args: TInputs) => Promise<TOutput>
  ) {}
  private cache: Map<string, Promise<TOutput>> = new Map();

  async fire(key: string, ...args: TInputs): Promise<TOutput> {
    /**
     * insert your code here
     */

    if (this.cache.has(key)) {
      return this.cache.get(key) as Promise<TOutput>;
    }

    const promise = this.handler(...args);
    this.cache.set(key, promise);
    return promise;
  }
}
