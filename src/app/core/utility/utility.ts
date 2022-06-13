export function equijoin(xs: any[], ys: any[], primary: string, foreign: string, sel: any): any[] {
       const ix = xs.reduce((ix, row) => ix.set(row[primary], row), new Map());
       return ys.map(row => sel(ix.get(row[foreign]), row));
    }

export function unique(array: any[], key: string): any[] {
       const result = [...new Map(array.map(item =>
       [item[key], item])).values()];
       return result;
    }
