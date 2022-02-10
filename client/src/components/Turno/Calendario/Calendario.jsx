import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './calendario.css'

export default function Calendario() {

    const doctores = useSelector((state) => state.doctoresByEspec);
    const [date, setDate] = useState(new Date());
    const [fecha, setFecha] = useState({
        fecha: undefined
    })
    const onChange = date => {
        setDate(date)
    }

    let diaTurno = undefined;
    let mesTurno = undefined;
    let yearTurno = undefined;
    var finalDate = undefined;


    function validateDate(value) {
        const data = value.toString('').split(' ');
        switch (data[1]) {
            case "Jan":
                mesTurno = 1
                break
            case "Feb":
                mesTurno = 2
                break
            case "Mar":
                mesTurno = 3
                break
            case "Apr":
                mesTurno = 4
                break
            case "May":
                mesTurno = 5
                break
            case "Jun":
                mesTurno = 6
                break
            case "Jul":
                mesTurno = 7
                break
            case "Aug":
                mesTurno = 8
                break
            case "Sep":
                mesTurno = 9
                break
            case "Oct":
                mesTurno = 10
                break
            case "Nov":
                mesTurno = 11
                break
            case "Dec":
                mesTurno = 12
                break
            default:
                break;
        }
        diaTurno = data[2];
        yearTurno = data[3];
        finalDate = diaTurno + '/' + mesTurno + '/' + yearTurno;
        setFecha({ fecha: finalDate })
    }
    return (
        <div>
            {fecha.fecha !== undefined ?
                <div>
                    <div className='calendarioContainer'>
                        <Calendar
                            onChange={onChange}
                            value={date}
                            onClickDay={(value, event) => validateDate(value)}
                        />
                    </div>
                    <h3>Selecciona el Horario: </h3>
                </div>
                :
                <div className='calendarioContainer'>
                    <Calendar
                        onChange={onChange}
                        value={date}
                        onClickDay={(value, event) => validateDate(value)}
                    />
                </div>
            }
        </div>
    );
}

//['Wed', 'Feb', '09', '2022', '21:21:16', 'GMT-0300', '(Argentina', 'Standard', 'Time)']