export async function findModelById(classFuction, currentUserId){
  const findModel = await classFuction;

  if (!findModel) {
    throw new Error("해당 id를 가진 데이터는 없습니다.")
  }
  
  if (currentUserId){
    if(findModel.userId !== currentUserId) 
      throw new Error("수정 권한이 없습니다.");
  }

  return findModel
}