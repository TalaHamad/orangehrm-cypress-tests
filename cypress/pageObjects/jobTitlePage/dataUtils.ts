import { getFullAdminUrl } from "@support/utils";
import { NewJobTitle } from "./types";

export default class JobTitleDataUtils {
  static createJobTitle(jobTitle: NewJobTitle) {
    return cy
      .request("POST", getFullAdminUrl("job-titles"), {
        ...jobTitle,
        specification: null,
      })
      .then((response) => {
        return response.body.data.id;
      });
  }
}
