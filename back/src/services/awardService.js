import { Award } from "../db/models/Award"; 

class AwardService {
  static async addAward({ awardName, date, userId }) {
    const newAward = { awardName, date, userId };

    const createdNewAward = await Award.create({ newAward });

    return createdNewAward;
  }

  static async getAward({ awardId }) {
    console.log(awardId)
    const award = await Award.findById({ awardId });
    if (!award) {
      const errorMessage =
        "해당 id를 가진 award 데이터는 없습니다.";
      return { errorMessage };
    }

    return award;
  }

  static async getAwards({ userId }) {
    const awards = await Award.findByUserId({ userId });
    return awards;
  }

  static async setAward({ awardId, awardName, date }) {
    let award = await Award.findById({ awardId });

    if (!award) {
      const errorMessage =
        "해당 id를 가진 award 데이터는 없습니다.";
      return { errorMessage };
    }

    award = await Award.update({awardId, awardName, date})

    return award;
  }

  static async deleteAward(awardId) {
    await Award.deleteById(awardId);
    
    return { status: "ok" };
  }
}

export { AwardService };
