import { Instance } from './Instance';
import { SerieQueue } from './Queue';

export class Serie {
  public readonly allLoaded: boolean = false;
  public timestamp: number;
  public bytes: number = 0;
  public queue: SerieQueue;

  constructor(
    public readonly serieID: string,
    public readonly instances: Instance[]
  ) {
    this.queue = new SerieQueue(serieID, instances);
    this.queue.start();

    this.timestamp = Date.now();
  }
}
