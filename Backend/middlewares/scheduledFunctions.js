import cron from 'node-cron'

function initScheduledJobs(){
    const cronJobExample = cron.schedule("* * * * *", () => {
        console.log("Hellow cron")
    })

    cronJobExample.start()
}

export default initScheduledJobs