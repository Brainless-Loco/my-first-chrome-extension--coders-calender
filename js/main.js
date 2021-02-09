$(document).ready(function () {
    $('.navigation').click(function () {
        $('.sidebar').toggleClass('active-sidebar'),
            $('.navigation').toggleClass('active-icn');
    })
});
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

getImage = origin => {
    if (origin == "HackerRank") return "hacker_rank";
    if (origin == "CodeChef") return "code_chef";
    if (origin == "Codeforces") return "codeforces";
    if (origin == "Kick Start") return "kick_start";
    if (origin == "AtCoder") return "at_coder";
    if (origin == "CodeForces::Gym") return "codeforces";
    if (origin == "TopCoder") return "top_coder";
    if (origin == "CS Academy") return "cs_academy";
    if (origin == "HackerEarth") return "hacker_earth";
    if (origin == "LeetCode") return "leet_code";

}
durationInBrief = duration => {
    let hour = parseInt(duration / 3600);
    let min = parseInt(duration%3600);
    return `${hour} Hours ${min} Minutes`;
}

writeResult = origin => {
    let runningContest = document.getElementById("running-contest");
    let upcomingContest = document.getElementById("upcoming-contest");
    runningContest.innerHTML = "";
    upcomingContest.innerHTML = "";
    $.getJSON(`https://kontests.net/api/v1/${origin}`,
        function (data) {
            for (let i = 0; i < data.length; i++) {
                let nameOfContest = data[i].name;
                let linkOfContest = data[i].url;
                let status = data[i].status;
                let duration = parseInt(data[i].duration);
                let startTime = data[i].start_time;
                let endTime = data[i].end_time;

                let startYear = startTime.slice(0, 4);
                let endYear = endTime.slice(0, 4);
                let startMonth = parseInt(startTime.slice(5, 7)) - 1;
                let endMonth = parseInt(endTime.slice(5, 7)) - 1;
                let startDate = startTime.slice(8, 10);
                let endDate = endTime.slice(8, 10);
                let startHour = startTime.slice(11, 16);
                let endHour = endTime.slice(11, 16);
                let imageSrc = origin;
                if (origin == 'all') imageSrc = getImage(data[i].site);

                if (status == "CODING") {
                    let markUp = `
                    <div class="col-12 px-0 mb-3 a-contest border border-warning d-flex justify-content-between align-items-center rounded">
                        <div class="col-3 col-lg-2 border-warning text-center border-right"><a href="${linkOfContest}"><img
                                    src="images/${imageSrc}.png" class="img-fluid" alt=""></a></div>
                        <div class="col-9 px-1 text-white">
                            <h5 class="py-0 mb-0 h6"><a href="${linkOfContest}" class="text-white">${nameOfContest}</a></h5>
                            <p class="pb-0 mb-0"><small>Duration: ${durationInBrief(duration)}</small></p>
                            <p class="pt-0 mb-0 mt-0"><small>End: ${endDate} ${months[endMonth]},${endYear} ${endHour}</small></p>
                        </div>
                    </div>
                    `;
                    runningContest.innerHTML += markUp;
                }
                else {
                    let markUp = `
                    <div class="col-12 px-0 mb-3 a-contest border border-warning d-flex justify-content-between align-items-center rounded">
                        <div class="col-3 col-lg-2 border-warning text-center border-right"><a href="${linkOfContest}"><img
                                    src="images/${imageSrc}.png" class="img-fluid" alt=""></a></div>
                        <div class="col-9 px-1 text-white">
                            <h5 class="py-0 mb-0 h6"><a href="${linkOfContest}" class="text-white">${nameOfContest}</a></h5>
                            <p class="pb-0 mb-0"><small>Duration: ${durationInBrief(duration)}</small></p>
                            <p class="pt-0 mb-0 mt-0"><small>Start: ${startDate} ${months[startMonth]},${startYear} ${startHour}</small></p>
                            <p class="pt-0 mb-0 mt-0"><small>End: ${endDate} ${months[endMonth]},${endYear} ${endHour}</small></p>
                        </div>
                    </div>
                    `;
                    upcomingContest.innerHTML += markUp;
                }


            }

        }
    );
}

writeResult("all");

const apiUl = document.getElementById("api-list");
apiUl.addEventListener("click", e => {
    let origin = e.target.id;
    if (origin[0] == 'a') {
        origin = origin.slice(4);
        let activeClass = document.querySelector(".active");
        activeClass.classList.remove("active");
        activeClass = document.getElementById("api-" + origin);
        activeClass.classList.add("active");
        let contestOriginName = document.getElementById("contest-origin");
        contestOriginName.innerText = origin;
        writeResult(origin);
    }
});