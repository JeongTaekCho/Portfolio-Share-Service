import { Award } from "../db/models/Award";

class AwardService {
  static async addAward({ awardName, date, userId }) {
    const newAward = { awardName, date, userId };

    const createdNewAward = await Award.create({ newAward });

    return createdNewAward;
  }

  static async getAward({ awardId }) {
    console.log(awardId);
    const award = await Award.findById({ awardId });
    if (!award) {
      const errorMessage = "해당 id를 가진 award 데이터는 없습니다.";
      return { errorMessage };
    }

    return award;
  }

  static async getAwards({ userId }) {
    const awards = await Award.findByUserId({ userId });
    return awards;
  }

  static async changeAward({ awardId, awardName, date, userId }) {
    console.log("awardService changeAward userId : ", userId);
    let award = await Award.findById({ awardId });
    console.log("awardService changeAward award.userId : ", award.userId);

    if (award.userId !== userId) {
      throw new Error("유효하지 않는 유저입니다.");
    }

    if (!award) {
      const errorMessage = "해당 id를 가진 award 데이터는 없습니다.";
      return { errorMessage };
    }

    award = await Award.update({ awardId, awardName, date });

    return award;
  }

  static async deleteAward(awardId, userId) {
    console.log("awardService deleteAward awardId : ", awardId);
    console.log("awardService deleteAward userId : ", userId);
    const award = await Award.findById({ awardId });

    if (award.userId !== userId) {
      throw new Error("유효하지 않는 유저입니다.");
    }
    await Award.deleteById(awardId);

    return { status: "ok" };
  }
}

export { AwardService };
