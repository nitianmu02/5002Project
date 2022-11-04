import { useState } from "react"
import ReactAudioPlayer from "react-audio-player"
import { Button, Form, Input, Select, message} from 'antd'
import {api} from '../api/api'
import './main.css'
function Main() {
    const { TextArea } = Input
    const [audio, setAudio] = useState()
    const onFinish = async (values) => {
        if (values.speaker === 'Select a Speaker'){
            message.warn('Please select a speeker!')
        }else if (values.text === undefined || values.text === '') {
            message.warn('Please input some text!')
        }else{
            const res = await api.post('/index/',values)
            setAudio(res.data)
   
        }

    }

    return (
        <div className='main'>
            <section className="main-content">
                <h2>Teyvator</h2>
                <Form
                    name="main"
                    className="main-form"
                    initialValues={{ "speaker":'Select a Speaker','speed':'1.0'}}
                    onFinish={onFinish}
                    
                >
                        <Form.Item name="text">
                            <TextArea
                                showCount
                                maxLength={100}
                                style={{
                                    height: 120,
                                    resize: 'none',
                                }}
                                placeholder="Input some text"
                                />
                        </Form.Item>
                        
                        <Form.Item 
                            name="speaker" 
                            style={{display: 'inline-flex'}}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            options={[
                                {
                                    value: 'Select a Speaker',
                                    disabled: true,
                                    label: 'Select a Speaker',
                                },
                                {
                                    value: 'Paimon',
                                    label: 'Paimon',
                                },
                                {
                                    value: 'Miko',
                                    label: 'Miko',
                                },
                                {
                                    value: 'Kazuha',
                                    label: 'Kazuha',
                                },
                                {
                                    value: 'Nahida',
                                    label: 'Nahida',
                                },
                                {
                                    value: 'Hutao',
                                    label: 'Hutao',
                                },
                                {
                                    value: 'Ayaka',
                                    label: 'Ayaka',
                                },
                                {
                                    value: 'Yoimiya',
                                    label: 'Yoimiya',
                                },
                                {
                                    value: 'Ganyu',
                                    label: 'Ganyu',
                                },
                                {
                                    value: 'Mona',
                                    label: 'Mona',
                                },
                                {
                                    value: 'Ei',
                                    label: 'Ei',
                                },
                                
                            ]}
                            />
                        </Form.Item>

                        <Form.Item style={{display: 'inline-flex',marginLeft:'15px', }}>
                            <Button type="primary" htmlType="submit" style={{width:200, borderRadius: 20}}>
                                Generate
                            </Button>
                        </Form.Item>
                        <ReactAudioPlayer
                            src={"http://10.249.76.80:8000"+audio}
                            autoPlay
                            controls
                            style={{width:'410px'}}
                        />

                        <Form.Item name='speed' style={{display:"none"}}>
                            <Input/>
                        </Form.Item>
                    </Form>
            </section> 
        </div>
    )
}

export default Main