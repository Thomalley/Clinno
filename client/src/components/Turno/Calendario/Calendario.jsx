import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './calendario.css'

export default function Calendario() {

    const [value, onChange] = useState(new Date());
    return (
        <div className='calendarioContainer'>
            <Calendar 
                onChange={onChange} 
                value={value} 
                onClickDay={(value, event) => {swal(`Elegiste el dia ${value}`)}}
            />
        </div>
    );
}

