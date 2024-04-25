import React, { useState } from 'react';

export function TextBox () {
    const [text, setText] = useState();

    const handleChange = (e) =>{
        setText(e.target.value);
    };
    return (
        <div>
            <label>
                Enter username:
                <input type="text" value={text} onChange={handleChange}/>
            </label>
            <p>The username is {text}</p>
        </div>
    );
}