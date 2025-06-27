import { useState, type SetStateAction } from 'react'
import { useEffect } from 'react';
import {getAllEntries, createEntry} from './diaryService';

export interface DiaryEntry {
    id: number;
    date: string;
    weather: string;
    visibility: string;
    comment: string;
}

function App() {

  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then((data: SetStateAction<DiaryEntry[]>) => {
      setEntries(data)
    })
  }, [])

  const setNewEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createEntry({ id: entries.length + 1, date, weather, visibility, comment }).then((data) => {
      setEntries(entries.concat(data))
    })
    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  }

  return (
    <>
      <h1>Add new entry</h1>
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
        Weather
        <input
          type="text"
          value={weather}
          onChange={(event) => setWeather(event.target.value)} 
        />
        </div>
        <div>
        Visibility
        <input
          type="text"
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)} 
        />
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
      <ul>
        {entries.map(entry => 
          <li key={entry.id}>
            <div><strong>{entry.date}</strong></div>
            <div>{entry.weather}</div>
            <div>{entry.visibility}</div>
            <div>{entry.comment}</div>
          </li>
        )}
      </ul>
      
    </>
  )
}

export default App
