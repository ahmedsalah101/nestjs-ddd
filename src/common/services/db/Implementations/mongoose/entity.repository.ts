import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityfilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityfilterQuery, {
        _id: 0, //ignore
        __v: 0, //ignore
        ...projection, //add new projection
      })
      .exec();
  }

  async find(entityfilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(entityfilterQuery);
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityfilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<Partial<T>>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityfilterQuery,
      updateEntityData,
      { new: true },
    );
  }
  async deleteMany(entityfilterQuery: FilterQuery<T>): Promise<boolean> {
    const deltedResult = await this.entityModel.deleteMany(entityfilterQuery);
    return deltedResult.deletedCount >= 1;
  }
}
