import Bee from 'bee-queue';
import SubscriptionMail from '../app/jobs/SubscriptionMail';
import redisConfig from '../config/redis';

// for every new job, we import and insert inside the array below
const jobs = [SubscriptionMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // accessing the methods of the class by destructuring
    jobs.forEach(({ key, handle }) => {
      // creating the queues
      this.queues[key] = {
        bee: new Bee(key, {
          // the queue itself, here called as 'bee'
          redis: redisConfig,
        }),
        handle, // the method that process the job (it receives the variables)
      };
    });
  }

  /**
   *
   * @param {*} queue queue we want to insert the jobs (for example, SubscriptionMail)
   * @param {*} job the data variables the job expects to
   */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, error) {
    // console.log(job);
    console.log(`Queue ${job.queue.name}: FAILED`, error);
  }
}

export default new Queue();
