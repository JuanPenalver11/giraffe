
export const prettyDate = (arg) => {
    const createdAt = new Date(arg)
    const currentDate = new Date()
    const differenceInTime = currentDate.getTime() - createdAt.getTime()
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24))

    return differenceInDays
}