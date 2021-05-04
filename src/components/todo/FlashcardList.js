import React from 'react'
import Flashcard from './Flashcard'
import '../../Floatingcard.css'

export default function FlashcardList({flashcards}) {
    return (
        <div className="card-grid">
            {
               flashcards.map((q) => {
                   console.log(q)
                   return <Flashcard flashcard={q} key={q.qid}/>
               })
            }
        </div>
    )
}
