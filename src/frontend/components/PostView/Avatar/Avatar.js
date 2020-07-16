import React from 'react'
import './Avatar.css'

const Avatar = ({userName}) => {

    let firstLetter = userName.split('')[0].toUpperCase();
    const colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#f1c40f", "#f39c12", "#e74c3c", "#8e44ad", "#27ae60", "#2980b9"];
    const randomColor = () => colors[Math.floor(Math.random() * 10)];

    return (
        <div className="Avatar" style={{backgroundColor: randomColor()}}>
            <span className="first-letter">{firstLetter}</span>
        </div>
    )
}

export default Avatar
