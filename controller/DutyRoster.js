import DutyRoster from "../model/DutyRoster.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";

import {
  findAll,
  findOne,
  findAllWithParams,
  creator,
  updator,
} from "./ModelActions.js";

class DutyRosterRepo {
  createRoster = asyncHandler(async (req, res) => {
    const info = req.body;
    if (!info)
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the necessary values" });
    try {
      const userId = req.user._id;
      const created = await creator(DutyRoster, { info, userId });
      created && res.status(StatusCodes.CREATED).json(created);
    } catch (err) {
      return res.json({ status: false, msg: err });
    }
  });

  // for admin consumptions
  allDuties = asyncHandler(async (req, res) => {
    const data = await findAll(DutyRoster);
    data && res.status(StatusCodes.OK).json(data);
  });

  // a specific user duty: say for instance the current duty
  specificUserDuty = asyncHandler(async () => {
    try {
      const { id } = req.params; // duty id
      const userId = req.user._id; // user on duty id
      if (!userId)
        return res
          .status(403)
          .json({ status: false, msg: "please authenticate your self" });
      const data = await findOne(DutyRoster, {
        userId,
        _id: id,
        isDeleted: false,
      });
      data && res.status(StatusCodes.Ok).json({ status: true, data });
    } catch (err) {
      return res.json({ status: false, msg: err });
    }
  });

  // a user all duty records
  userDuties = asyncHandler(async (req, res) => {
    try {
      const userId = req.user._id;
      if (!userId) res.status(403).json({ msg: "supply the current user id" });
      const data = await findAllWithParams(DutyRoster, { userId });

      if (!data) {
        return res
          .status(404)
          .json({ status: false, msg: `No User Duties with id : ${id}` });
      }
      res.status(StatusCodes.OK).json({ status: true, data });
    } catch (err) {
      return res.json({ status: false, msg: err });
    }
  });

  updateDuty = asyncHandler(async (req, res) => {
    try {
      if (!req.body)
        return res
          .status(400)
          .json({ status: false, msg: "Please provide the necessary values" });

      const { id, shiftId, jobId } = req.params;
      checkId(id);
      const match = await findOne(DutyRoster, {
        _id: id,
        isDeleted: false,
        jobId,
        shiftId,
      });

      if (!match) {
        return res
          .status(404)
          .json({ status: false, msg: `No duty with id : ${id}` });
      }
      const updated = await updator(DutyRoster, id, req.body);
      updated && res.status(StatusCodes.OK).json(updated);
    } catch (err) {
      return res.json({ status: false, msg: err });
    }
  });
}

export default new DutyRosterRepo();
