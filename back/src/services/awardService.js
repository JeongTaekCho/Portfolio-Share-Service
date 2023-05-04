import { Award } from "../db/models/Award";
import { findModelById } from "../utils/findById";

class AwardService {
  static async addAward({ awardName, date, userId }) {
    if (!awardName || !date || !userId) {
      throw new Error("모두 기입해 주세요.");
    }
    const newAward = { awardName, date, userId };
    const createdNewAward = await Award.create({ newAward });

    return createdNewAward;
  }

  static async getAward({ awardId }) {
    const award = findModelById(Award.findById({ awardId }));
    
    return award;
  }

  static async getAwards({ userId }) {
    const awards = findModelById(Award.findByUserId({ userId }));
    return awards;
  }

  static async changeAward({ awardId, awardName, date, userId }) {
    let award = await findModelById(Award.findById({ awardId }), userId);
    award = await Award.update({ awardId, awardName, date });

    return award;
  }

  static async deleteAward(awardId, userId) {;
    const award = await findModelById(Award.findById({ awardId }), userId);
    await Award.deleteById(awardId);

    return { status: "ok" };
  }
}

export { AwardService };