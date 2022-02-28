import request from "request-promise";
import cheerio from "cheerio";

const URL = "https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm";

interface MovieResult {
    title: string;
    rank: number;
    imdbRating: number;
    descriptionUrl: string;
    posterUrl?: string;
}

const scrapeTitleRankAndRating = async (): Promise<MovieResult[]> => {
    const result = await request.get(URL);
    const $ = cheerio.load(result);

    const movies: MovieResult[] = $("tr").map((idx, elem) => {
        const title = $(elem).find("td.titleColumn > a").text().trim();
        let imdbRating = parseFloat($(elem).find("td.ratingColumn.imdbRating").text().trim());
        const descriptionUrl = `https://imdb.com${$(elem).find("td.titleColumn > a").attr("href")}`;
        const rank = idx;
        if(isNaN(imdbRating)) imdbRating = 0;
        return {title, imdbRating, descriptionUrl ,rank} as MovieResult
    }).get()

    movies.shift();
    return movies;
}

const scrapePosterUrl = async (movies: MovieResult[]): Promise<MovieResult[]> => {
    const moviesWithPosterUrls: MovieResult[] = await Promise.all(movies.map(async movie => {
        const html = await request.get(movie.descriptionUrl);
        const $ = cheerio.load(html);
        movie.posterUrl = `https://imdb.com${$("a.ipc-lockup-overlay.ipc-focusable").attr('href')}`;
        await sleep(100);
        return movie as MovieResult;
    }));
    return moviesWithPosterUrls;
}

const sleep = async (miliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}

const main = async () => {
    const movies = await scrapeTitleRankAndRating();
    const finalMovies = await scrapePosterUrl(movies);
    console.log(finalMovies);
}

main();
