import React from 'react';

export function box(props) {
    const box = props.box;
    //give a box
    return (
    <div className = "box" style={{
        backgroundColor: Color.white
    }}>
    <span className="text">{box.text}</span>
    <span className="image">{box.image}</span>
    </div>
    );
}