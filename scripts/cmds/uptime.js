
const formatUptime = (uptime) => {
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

module.exports = {
    config: {
        name: "uptime",
        aliases: ["upt"],
        version: "1.0",
        author: "sumu",
        role: 0,
        shortDescription: {
            en: "Displays the current ping of the bot's system, uptime status, Bangladesh date, total users, and total threads."
        },
        category: "System",
        guide: {
            en: "Use {p}ping to check the current ping of the bot's system, uptime status, Bangladesh date, total users, and total threads."
        }
    },
    onStart: async ({ api, event, args, usersData, threadsData }) => {
        try {
            const timeStart = Date.now();
            await api.sendMessage("⏳ | Please wait for checking ping", event.threadID);
            const ping = Date.now() - timeStart;
            
            let pingStatus = "🟢 | Very Good";
            if (ping > 200) {
                pingStatus = "🌸 | Good..";
            }
            if (ping > 500) {
                pingStatus = "✅ | Medium..!!";
            }
            if (ping > 800) {
                pingStatus = "⚠ | Not Good-";
            }
            if (ping > 1000) {
                pingStatus = "👀 | Net slow.....";
            }
            if (ping > 1200) {
                pingStatus = "🚫 | Oho Net Issue.";
            }
            if (ping > 1500) {
                pingStatus = "⚠ | Bad.!";
            }
            if (ping > 1800) {
                pingStatus = "❌ | Very Bad..";
            }
            if (ping > 2000) {
                pingStatus = "💀 | Fully Dead.";
            }
            
            const uptime = process.uptime();
            let uptimeStatus = "🟢 | Online";
            if (uptime > 3600) {
                uptimeStatus = "🌸 | Hourly Basis";
            }
            if (uptime > 86400) {
                uptimeStatus = "✅ | Daily Update";
            }
            if (uptime > 604800) {
                uptimeStatus = "⚠ | Weekly Upkeep";
            }
            
            const date = new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"});
            
            let totalUsers = 0;
            let totalThreads = 0;

            try {
                totalUsers = await api.getThreadList(0, 500);
                totalThreads = await api.getThreadList(1, 500);
            } catch (error) {
                console.error("Error getting thread list:", error);
            }

            const message = `𝗥𝗢𝗦𝗘 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 current ping is: ${ping} ms.\nPing Status: ${pingStatus}\nUptime: ${formatUptime(uptime)}\nUptime Status: ${uptimeStatus}\nBangladesh Date: ${date}\nTotal users: ${totalUsers.length}\nTotal threads: ${totalThreads.length}`;
            
            api.sendMessage(message, event.threadID);
        } catch (error) {
            console.error("Error in onStart function:", error);
        }
    }
};
