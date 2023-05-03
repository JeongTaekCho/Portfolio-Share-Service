import is from "@sindresorhus/is";

export function validateEmptyBody(req){
  if (req.headers['content-type'] !== 'application/json') {
    throw new Error(
      "headers의 Content-Type을 application/json으로 설정해주세요"
    );
  }
  if (is.emptyObject(req.body)) {
    throw new Error(
      "Request body is empty"
    );
  }
}