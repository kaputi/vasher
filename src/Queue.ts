import { Instance } from './Instance';
import { Vasher } from './Vasher';

export class SerieQueue {
  public running: boolean = true;
  public activeRequests: Instance[] = [];

  constructor(
    private serieID: string,
    private instances: Instance[]
  ) {}

  public start = (): void => {
    if (this.running) return;
    this.running = true;
    this.next();
  };

  public stop = (): void => {
    if (!this.running) return;
    this.running = false;
    // TODO:
    // this.activeRequests.forEach((instance)=> instance.abort())
    this.activeRequests = [];
  };

  private next = (): void => {
    // if there is no more space for request stop
    if (this.activeRequests.length >= Vasher.options.maxRequests) return;

    // list of active instances ids
    const activeInstances = this.activeRequests.map(
      ({ instanceID }) => instanceID
    );

    // intances not loading or loaded with highest priority first
    const nextInstances = this.instances
      .filter(
        ({ instanceID, loaded }) =>
          !loaded && !activeInstances.includes(instanceID)
      )
      .sort((a, b) => b.priority - a.priority);

    // all loaded
    if (nextInstances.length === 0 && this.activeRequests.length === 0) {
      // TODO:
      // set serie loaded
      this.stop();
      return;
    }

    if (nextInstances.length === 0) return;

    // add first from next to active
    this.activeRequests.push(nextInstances[0]);

    this.loadItem(nextInstances[0]);

    this.next();
  };

  loadItem = async (item: Instance): Promise<void> => {
    // TODO: make request and set next as callback on ready
  };
}
