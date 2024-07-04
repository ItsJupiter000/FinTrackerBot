import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const testDiscordAPI = async () => {
  try {
    const response = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Discord API is reachable:', data);
  } catch (error) {
    console.error('Failed to reach Discord API:', error);
  }
};

testDiscordAPI();