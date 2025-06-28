import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


// for voice to text
export const speech_to_text =  async (req, res) => {  
  const { base64 } = req.body; 
  const payload = {
    pipelineTasks: [
      {
        taskType: 'asr',
        config: {
          language: { sourceLanguage: 'en' },
          serviceId: '',
          audioFormat: 'webm',
          samplingRate: 16000
        }
      }
    ],
    inputData: {
      audio: [
        {
          audioContent: base64
        }
      ]
    }
  };

  try {
    const response = await axios.post(
      'https://dhruva-api.bhashini.gov.in/services/inference/pipeline',
      payload,
      {
        headers: {
          'Accept': '*/*',
          'User-Agent': 'NodeBackend',
          'Authorization': process.env.BHASHINI_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    // console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error('API Request Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to process audio' });
  }
};



