import { useState, type SetStateAction } from 'react'
import { useEffect } from 'react';
import {getAllEntries, createEntry} from './diaryService';
import Notification from './Notification';
import axios from 'axios';
import type { ValidationError, Weather, Visibility } from './types';

export interface DiaryEntry {
    id: number;
    date: string;
    weather: string;
    visibility: string;
    comment: string;
}

function App() {

  const [date, setDate] = useState('');
  const [notification, setNotification] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    try {
      getAllEntries().then((data: SetStateAction<DiaryEntry[]>) => {
      setEntries(data)
    })
    } catch (error) {
      setNotification(`Unknown error: ${error}`);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
  }, [])
    

  const setNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry = await createEntry({ id: entries.length + 1, date, weather, visibility, comment });
      setEntries(entries.concat(newEntry))
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        setNotification(`${error.response?.data} : ${date}`);
        setTimeout(() => {
          setNotification('');
        }, 5000);
      }
      if (axios.isAxiosError<ValidationError, Record<Weather, unknown>>(error)) {
        setNotification(`${error.response?.data} : ${weather}`);
        setTimeout(() => {
          setNotification('');
        }, 5000);
        setWeather('');
      }
      if (axios.isAxiosError<ValidationError, Record<Visibility, unknown>>(error)) {
        setNotification(`${error.response?.data} : ${visibility}`);
        setTimeout(() => {
          setNotification('');
        }, 5000);
        setVisibility('');
      }
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        setNotification(`${error.response?.data} : ${comment}`);
        setTimeout(() => {
          setNotification('');
        }, 5000);
      } else {
        setNotification(`Unknown error: ${error}`);
        setTimeout(() => {
          setNotification('');
        }, 5000);
      }
    }
    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  }

  return (
    <>
      <h1>Add new entry</h1>
      <Notification notification={notification} />
      <form onSubmit={setNewEntry}>
        <div>
        Date
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)} 
        />
        </div>
        <div>
        Weather:
        sunny  <input type="radio" name="weather"
          onChange={() => setWeather('sunny')} />
        rainy   <input type="radio" name="weather"
          onChange={() => setWeather('rainy')} />
        cloudy <input type="radio" name="weather"
          onChange={() => setWeather('cloudy')} />
        stormy <input type="radio" name="weather"
          onChange={() => setWeather('stormy')} />
        windy <input type="radio" name="weather"
          onChange={() => setWeather('windy')} />
        </div>
        <div>
        Visibility:
        good  <input type="radio" name="visibility"
          onChange={() => setVisibility('good')} />
        ok   <input type="radio" name="visibility"
          onChange={() => setVisibility('ok')} />
        poor <input type="radio" name="visibility"
          onChange={() => setVisibility('poor')} />
        great <input type="radio" name="visibility"
          onChange={() => setVisibility('great')} />
        </div>
        <div>
        Comment
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)} 
        />
        </div>
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
        {entries.map(entry => 
          <div key={entry.id}>
            <div><strong>{entry.date}</strong></div>
            <div>{entry.weather}</div>
            <div>{entry.visibility}</div>
            <div>{entry.comment}</div>
            <br></br>
          </div>
        )}
    </>
  )
}

export default App
