export default function calculateCountdown(contest, contestStatus) {
    const now = new Date();
    let distance = 0;

    if(contestStatus==="Upcoming"){
        distance = contest.beginTime - now;
    }else if(contestStatus==="Running"){
        distance = contest.beginTime + contest.contestLength - now;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(days){
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    if (hours) {
        return `${hours}h ${minutes}m ${seconds}s`;
    }
    if (minutes) {
        return `${minutes}m ${seconds}s`;
    }
    if(seconds){
        return `${seconds}s`;
    }
}