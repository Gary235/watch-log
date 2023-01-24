import DAYS from "../constants/days"

const airsToday = (itemAiringDays) => (itemAiringDays || []).includes(DAYS[new Date().getDay()])

export default airsToday
