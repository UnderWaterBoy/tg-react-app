import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(()=>{
        const data ={
            country,
            street,
            subject,
        }
        tg.sendData(JSON.stringify(data))
    },[country, street, subject,])

    useEffect(() =>{
        tg.onEvent('mainButtonClicked',onSendData)
        return ()=>{
            tg.offEvent('mainButtonClicked',onSendData)
        }
    },[onSendData])

    useEffect(() =>{
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    },[])

    useEffect(() =>{
        if(!street || !country){
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }

    })

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }
    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input className={'input'} type='text' placeholder={'Страна'} value={country} onChange={onChangeCountry}/>
            <input className={'input'} type='text' placeholder={'Улица'} value={street} onChange={onChangeStreet}/>
            <select className={'select'} value={subject} onChange={onChangeSubject}>
                <option value={'legal'}>Физ. лицо</option>
                <option value={'physical'}>Юр. лицо</option>
            </select>
        </div>
    );
};

export default Form;