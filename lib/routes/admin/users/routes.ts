// NPM Dependencies
import * as status from "http-status";
import * as express from "express";

// Internal Dependencies
import { adminUsersHelpers } from "./helpers";
import { AuthenticatedRequest } from "interfaces/authenticated-request";




export class adminUsersRoutes {
    public static get = async (
      req: AuthenticatedRequest,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const allUsers  = await adminUsersHelpers.findAll();
        res.json(allUsers);
      } catch (error) {
        next(error);
      }
    };

    public static getOne = async (
      req: AuthenticatedRequest,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const {id} = req.params;
        const allUsers  = await adminUsersHelpers.findOne(id);
        res.json(allUsers);
      } catch (error) {
        next(error);
      }
    };
  }
  