"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var _ = require("lodash");
exports.SecuritySchema = mongoose.Schema({
    data: {
        ticker: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    trailing: {
        PE: {
            type: Number
        },
        priceToSales: {
            type: Number
        },
        dividendRate: {
            type: Number
        },
        dividendYield: {
            type: Number
        },
        eps: {
            type: Number
        }
    },
    forward: {
        PE: {
            type: Number
        },
        eps: {
            type: Number
        }
    },
    earnings: {
        quarterly: [{
                date: String,
                actual: Number,
                estimate: Number
            }],
        yearly: [{
                year: Number,
                revenue: Number,
                earnings: Number
            }]
    },
    price: {
        value: Number,
        dateFetched: {
            type: Date,
            default: Date.now
        }
    },
    statistics: {
        marketCap: Number,
        enterpriseValue: Number,
        sharesOutstanding: Number,
        heldPercentInsiders: Number,
        heldPercentInstitutions: Number,
        shortRatio: Number,
        bookValue: Number,
        priceToBook: Number,
        earningsQuarterlyGrowth: Number,
        netIncomeToCommon: Number,
        pegRatio: Number,
        enterpriseToRevenue: Number,
        enterpriseToEbitda: Number,
        totalCash: Number,
        totalCashPerShare: Number,
        ebitda: Number,
        totalDebt: Number,
        quickRatio: Number,
        currentRatio: Number,
        totalRevenue: Number,
        debtToEquity: Number,
        revenuePerShare: Number,
        returnOnAssets: Number,
        returnOnEquity: Number,
        grossProfits: Number,
        freeCashflow: Number,
        operatingCashflow: Number,
        earningsGrowth: Number,
        revenueGrowth: Number,
        grossMargins: Number,
        ebitdaMargins: Number,
        operatingMargins: Number,
        profitMargins: Number
    }
}, { timestamps: true });
var YAHOO_FINANCE_PATH_MAPPER = {
    'data.ticker': 'price.symbol',
    'data.name': 'price.longName',
    'trailing.PE': 'summaryDetail.trailingPE',
    'trailing.priceToSales': 'summaryDetail.priceToSalesTrailing12Months',
    'trailing.dividendRate': 'summaryDetail.trailingAnnualDividendRate',
    'trailing.dividendYield': 'summaryDetail.trailingAnnualDividendYield',
    'trailing.eps': 'defaultKeyStatistics.trailingEps',
    'forward.PE': 'summaryDetail.forwardPE',
    'forward.eps': 'defaultKeyStatistics.forwardEps',
    'earnings.quarterly': 'earnings.earningsChart.quarterly',
    'earnings.yearly': 'earnings.financialsChart.yearly',
    'price.value': 'price.regularMarketPrice',
    'statistics.marketCap': 'price.marketCap'
};
exports.SecuritySchema.methods.populateFromYahooData = function (yahooData) {
    var _this = this;
    Object.keys(YAHOO_FINANCE_PATH_MAPPER)
        .reduce(function (accumulator, currentValue) {
        _this.set(currentValue, _.get(yahooData, YAHOO_FINANCE_PATH_MAPPER[currentValue]));
        return _this;
    }, this);
    // fill out 'statistics'
    if (yahooData.defaultKeyStatistics) {
        Object.keys(yahooData.defaultKeyStatistics)
            .reduce(function (accumulator, currentValue) {
            _this.statistics[currentValue] = yahooData.defaultKeyStatistics[currentValue];
        }, this);
    }
    if (yahooData.financialData) {
        Object.keys(yahooData.financialData)
            .reduce(function (accumulator, currentValue) {
            _this.statistics[currentValue] = yahooData.financialData[currentValue];
        }, this);
    }
    this.price.dateFetched = Date.now();
    return this;
};
//# sourceMappingURL=security.js.map