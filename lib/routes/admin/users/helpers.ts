// NPM Dependencies
import * as status from "http-status";
import * as StandardError from "standard-error";
import * as bcrypt from "bcrypt";
// Internal Dependencies
import { User as users } from "../../../db";


export class adminUsersHelpers {

    public static findAll = async () => {
        return await users.find();
    };

    public static findOne = async (id) => {
        return await users.findById(id);
    };

  }