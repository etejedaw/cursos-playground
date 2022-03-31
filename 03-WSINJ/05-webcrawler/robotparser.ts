import robotsParser, { Robot } from "robots-parser";
import request from "request-promise";

const robotsUrl = "https://textfiles.meulie.net/robots.txt";

const getRobotsTxt = async (robotsUrl: string): Promise<Robot> => {
    const robotTxt = await request.get(robotsUrl);
    const robots = robotsParser(robotsUrl, robotTxt);
    return robots;
}

const main = async (robotsUrl: string) => {
    const info = await getRobotsTxt(robotsUrl)
    console.log(info.getCrawlDelay());
}

main(robotsUrl);