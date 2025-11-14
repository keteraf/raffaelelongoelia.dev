export const useTime = () => {
    const time = ref('')
    const rprompt = ref('')
    let t: NodeJS.Timeout | null = null

    const updateTime = () => {
        const d = new Date()
        const hh = String(d.getHours()).padStart(2, '0')
        const mm = String(d.getMinutes()).padStart(2, '0')
        time.value = `${hh}:${mm}`
        rprompt.value = `[${hh}:${mm}]`
    }

    const startTimer = () => {
        updateTime()
        t = setInterval(updateTime, 1000)
    }

    const stopTimer = () => {
        if (t) clearInterval(t)
    }

    return {
        time: readonly(time),
        rprompt: readonly(rprompt),
        startTimer,
        stopTimer,
    }
}
