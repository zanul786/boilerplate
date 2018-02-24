import * as express from 'express';
import * as yahooFinance from 'yahoo-finance';
import * as moment from 'moment';

import { Security } from '../../../db';

export class SecurityRoutes {
  public static async create (req: express.Request, res: express.Response) {

  }

  public static async get (req: express.Request, res: express.Response, next) {
    try {
      const { security } = req.query;

      const existingSecurity = await Security.findOne({ 'data.ticker': security });

      const yahooResponse = await yahooFinance.quote({
        modules: [
          'summaryDetail',
          'recommendationTrend',
          'earnings',
          'calendarEvents',
          'upgradeDowngradeHistory',
          'price',
          'defaultKeyStatistics',
          'financialData'
        ],
        symbols: [security],
      });

      if (existingSecurity) {
        existingSecurity.populateFromYahooData(yahooResponse[security]);
        res.json(existingSecurity);
      } else {
        const newSecurity = new Security({ 'data.ticker': security });
        newSecurity.populateFromYahooData(yahooResponse[security]);
        await newSecurity.save();
        res.json(newSecurity);
      }
    } catch (error) {
      next(error);
    }
  }
}
