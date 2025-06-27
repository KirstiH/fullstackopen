import axios from 'axios'
import type { DiaryEntry } from './App';

const baseUrl = 'http://localhost:3000/api'

export const getAllEntries = async () => {
  const response = await axios
        .get<DiaryEntry[]>(
            `${baseUrl}/diaries`
        );
        console.log(response.data);
    return response.data;
}


export const createEntry = async (object: DiaryEntry) => {
  const response = await axios
        .post<DiaryEntry>(
            `${baseUrl}/diaries`, object);
    return response.data;
}