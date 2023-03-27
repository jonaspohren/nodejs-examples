import { PubSub } from "graphql-subscriptions";
import { Company, Job } from "./db.js";

/* eslint-disable @typescript-eslint/no-unsafe-argument */

const pubSub = new PubSub();

export const resolvers = {
  Query: {
    job: (_root, { id }) => Job.findById(id),
    company: (_root, { id }) => Company.findById(id),
    jobs: async () => Job.findAll(),
  },
  Mutation: {
    createJob: async (_root, { input }, context) => {
      const job = await Job.create(input);

      await pubSub.publish("JOB_CREATED", { jobCreated: job });

      return job;
    },
    deleteJob: (_root, { id }) => Job.delete(id),
    updateJob: (_root, { input }) => Job.update(input),
  },
  Subscription: {
    jobCreated: {
      subscribe: () => pubSub.asyncIterator(["JOB_CREATED"]),
    },
  },
};
