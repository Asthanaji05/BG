import * as dotenv from 'dotenv';
import { ElevenLabsClient } from 'elevenlabs';
import { createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';

dotenv.config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

export const createAudioFileFromText = async (text: string): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const audio = await client.generate({
        voice: 'Rachel',
        model_id: 'eleven_turbo_v2_5',
        text,
      });
      const fileName = `${uuid()}.mp3`;
      const fileStream = createWriteStream(fileName);

      audio.pipe(fileStream);
      fileStream.on('finish', () => resolve(fileName)); // Resolve with the fileName
      fileStream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
};

export const createAudioStreamFromText = async (text: string): Promise<Buffer> => {
  const audioStream = await client.generate({
    voice: 'Rachel',
    model_id: 'eleven_turbo_v2_5',
    text,
  });

  const chunks: Buffer[] = [];
  for await (const chunk of audioStream) {
    chunks.push(chunk);
  }

  const content = Buffer.concat(chunks);
  return content;
};

// Main function to call the methods
async function main() {
  try {
    const audioFile = await createAudioFileFromText('जय श्री राम');
    console.log('Audio file created:', audioFile);

    const audioStream = await createAudioStreamFromText('This is James');
    console.log('Audio stream created with length:', audioStream.length);
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); // Call the main function
