import { getFullRecruitmentUrl } from "@support/utils";
import { NewVacancy } from "./types";

export default class VacancyDataUtils {
  static createVacancy(vacancy: NewVacancy) {
    return cy
      .request("POST", getFullRecruitmentUrl("vacancies"), vacancy)
      .then((response) => {
        return response.body.data.id;
      });
  }
}
