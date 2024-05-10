const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    author: "shouko",
    role: 0,
    shortDescription: "Retrieve owner information and send a video",
    longDescription: "This command retrieves owner information and sends a video along with it.",
    category: "admin",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const ownerAndBotInfo = {
        name: '𝗥𝗼𝘀𝗲 𝗖𝗵𝗮𝘁𝗯𝗼𝘁',
        gender: '𝗙𝗲𝗺𝗮𝗹𝗲',
        age: '𝟮𝟮',
        height: '𝟱.𝟮',
        facebookLink: 'https://www.facebook.com/botanya362',
        nick: '𝗦𝗛𝗢𝗨𝗞𝗢 𝗡𝗜𝗦𝗛𝗜𝗠𝗜𝗬𝗔'
      };

      const videoUrl = 'https://i.imgur.com/hrCj7q2.mp4'; // Replace with your video URL

      const tmpFolderPath = path.join(__dirname, 'tmp');

      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

      const response = `
Owner and bot Information:
Name: ${ownerAndBotInfo.name}
Gender: ${ownerAndBotInfo.gender}
Age: ${ownerAndBotInfo.age}
Height: ${ownerAndBotInfo.height}
Facebook: ${ownerAndBotInfo.facebookLink}
Nick: ${ownerAndBotInfo.nick}
`;

      await api.sendMessage({
        body: response,
        attachment: fs.createReadStream(videoPath)
      }, event.threadID, event.messageID);

      if (event.body.toLowerCase().includes('ownerinfo')) {
        api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
      }
    } catch (error) {
      console.error('Error in ownerinfo command:', error);
      return api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  },
};
