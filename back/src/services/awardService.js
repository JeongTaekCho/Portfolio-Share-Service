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

  static async setAward({ awardId, toUpdate }) {
    let award = await Award.findById({ awardId });

    if (!award) {
      const errorMessage =
        "해당 id를 가진 award 데이터는 없습니다.";
      return { errorMessage };
    }

    // 업데이트 대상의 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.awardName) {
      const fieldToUpdate = "awardName";
      const newValue = toUpdate.awardName;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    if (toUpdate.date) {
        const fieldToUpdate = "date";
        const newValue = toUpdate.date;
        award = await Award.update({ awardId, fieldToUpdate, newValue });
      }

    return award;
  }

  static async deleteAward({ awardId }) {
    const isDataDeleted = await Award.deleteById({ awardId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 award 데이터는 없습니다.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { AwardService };
