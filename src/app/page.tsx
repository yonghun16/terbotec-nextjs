'use client' // 클라이언트 컴포넌트 선언

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function Home() {
  const [notes, setNotes] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await supabase.from('notes').select('*')
      if (data) setNotes(data)
    }
    fetchNotes()
  }, [])

  return (
    <main style={{ padding: '2rem' }}>
      <h1>📝 Supabase 데이터 목록</h1>
      {notes.length === 0 ? (
        <p>데이터를 불러오는 중이거나 데이터가 없습니다.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      )}
    </main>
  )
}
