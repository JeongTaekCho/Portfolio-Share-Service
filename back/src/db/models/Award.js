import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findById({ awardId }) {
    const award = await AwardModel.findById(awardId);
    console.log(awardId);
    return award;
  }

  static async findByUserId({ userId }) {
    const awards = await AwardModel.find({ userId });
    return awards;
  }

  static async update({ awardId, awardName, date }) {
    const updatedAward = await AwardModel.updateOne(
      {_id:awardId}
      ,{awardName,date}
      ,{new: true}
    );

    return updatedAward;
  }

  static async deleteById(awardId) {
    await AwardModel.findByIdAndDelete(awardId);
  }
}

export { Award };
