import { log } from "winston";

export class DateRange {
    static definingRange(byRange: string) {
        let statement;
        switch(byRange) {
            case '24h':
                statement = new Date();
                statement.setHours(statement.getHours() - 24);
                break;
            case 'days':
                statement = new Date();
                statement.setDate(statement.getDate() - 3);
                break;
            case 'month':
                statement = new Date();        
                statement.setMonth(statement.getMonth() - 2);
                break;
            case 'year':
                statement = new Date();
                statement.setFullYear(statement.getFullYear() - 13);
                break;
        }

        return statement;
    }
}